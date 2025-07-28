import json
import torch
from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM, 
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import (
    LoraConfig,
    get_peft_model,
    TaskType,
    prepare_model_for_kbit_training
)
from datasets import Dataset
import pandas as pd
from typing import Dict, List
import os

class NutritionLLMTrainer:
    def __init__(self, model_name: str = "microsoft/DialoGPT-small"):
        """
        Initialize the trainer with a small, conversational model
        DialoGPT-small is lightweight and good for dialogue tasks
        """
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.peft_model = None
        
    def load_dataset(self, dataset_path: str) -> Dataset:
        """Load and prepare the nutrition dataset"""
        print(f"Loading dataset from {dataset_path}")
        
        with open(dataset_path, 'r') as f:
            data = json.load(f)
        
        # Convert to format suitable for training
        formatted_data = []
        for item in data:
            # Create a conversational format
            conversation = f"Human: {item['question']}\nNutritionist: {item['answer']}"
            formatted_data.append({
                "text": conversation,
                "age_group": item.get("age_group", "unknown"),
                "category": item.get("category", "nutrition")
            })
        
        dataset = Dataset.from_list(formatted_data)
        print(f"Loaded {len(dataset)} training examples")
        
        return dataset
    
    def setup_model_and_tokenizer(self):
        """Setup the model and tokenizer with LoRA configuration"""
        print(f"Loading model: {self.model_name}")
        
        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        
        # Add padding token if it doesn't exist
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        
        # Load model
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            trust_remote_code=True
        )
        
        # Prepare model for k-bit training (memory efficient)
        self.model = prepare_model_for_kbit_training(self.model)
        
        # Configure LoRA
        lora_config = LoraConfig(
            task_type=TaskType.CAUSAL_LM,
            inference_mode=False,
            r=16,  # LoRA rank
            lora_alpha=32,
            lora_dropout=0.1,
            target_modules=["c_attn", "c_proj"]  # For DialoGPT
        )
        
        # Apply LoRA to the model
        self.peft_model = get_peft_model(self.model, lora_config)
        
        print("Model and tokenizer setup complete")
        print(f"Trainable parameters: {self.peft_model.print_trainable_parameters()}")
    
    def tokenize_function(self, examples):
        """Tokenize the dataset"""
        # Tokenize the text
        tokenized = self.tokenizer(
            examples["text"],
            truncation=True,
            padding=True,
            max_length=512,
            return_tensors="pt"
        )
        
        # For causal language modeling, labels are the same as input_ids
        tokenized["labels"] = tokenized["input_ids"].clone()
        
        return tokenized
    
    def prepare_dataset(self, dataset: Dataset) -> Dataset:
        """Prepare the dataset for training"""
        print("Tokenizing dataset...")
        
        # Tokenize the dataset
        tokenized_dataset = dataset.map(
            self.tokenize_function,
            batched=True,
            remove_columns=dataset.column_names
        )
        
        return tokenized_dataset
    
    def train_model(self, dataset: Dataset, output_dir: str = "./nutrition_llm_model"):
        """Train the model with the nutrition dataset"""
        print("Starting training...")
        
        # Prepare dataset
        train_dataset = self.prepare_dataset(dataset)
        
        # Split dataset (90% train, 10% eval)
        train_test_split = train_dataset.train_test_split(test_size=0.1)
        train_dataset = train_test_split["train"]
        eval_dataset = train_test_split["test"]
        
        # Training arguments
        training_args = TrainingArguments(
            output_dir=output_dir,
            overwrite_output_dir=True,
            num_train_epochs=3,
            per_device_train_batch_size=4,
            per_device_eval_batch_size=4,
            gradient_accumulation_steps=2,
            warmup_steps=100,
            learning_rate=5e-4,
            logging_steps=50,
            eval_steps=200,
            save_steps=500,
            evaluation_strategy="steps",
            save_strategy="steps",
            load_best_model_at_end=True,
            metric_for_best_model="eval_loss",
            greater_is_better=False,
            report_to=None,  # Disable wandb
            remove_unused_columns=False,
            dataloader_pin_memory=False,
        )
        
        # Data collator
        data_collator = DataCollatorForLanguageModeling(
            tokenizer=self.tokenizer,
            mlm=False,  # Causal LM, not masked LM
        )
        
        # Initialize trainer
        trainer = Trainer(
            model=self.peft_model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=eval_dataset,
            data_collator=data_collator,
            tokenizer=self.tokenizer,
        )
        
        # Train the model
        trainer.train()
        
        # Save the model
        trainer.save_model()
        self.tokenizer.save_pretrained(output_dir)
        
        print(f"Training complete! Model saved to {output_dir}")
        
        return trainer
    
    def generate_response(self, question: str, max_length: int = 300) -> str:
        """Generate a response to a nutrition question"""
        if self.peft_model is None or self.tokenizer is None:
            raise ValueError("Model not loaded. Please train or load a model first.")
        
        # Format the input
        input_text = f"Human: {question}\nNutritionist:"
        
        # Tokenize
        inputs = self.tokenizer.encode(input_text, return_tensors="pt")
        
        # Generate response
        with torch.no_grad():
            outputs = self.peft_model.generate(
                inputs,
                max_length=max_length,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id,
                eos_token_id=self.tokenizer.eos_token_id,
            )
        
        # Decode the response
        full_response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract just the assistant's response
        if "Nutritionist:" in full_response:
            response = full_response.split("Nutritionist:")[-1].strip()
        else:
            response = full_response.strip()
        
        return response
    
    def save_model(self, path: str):
        """Save the trained model"""
        if self.peft_model is None:
            raise ValueError("No model to save. Please train a model first.")
        
        self.peft_model.save_pretrained(path)
        self.tokenizer.save_pretrained(path)
        print(f"Model saved to {path}")
    
    def load_model(self, path: str):
        """Load a previously trained model"""
        print(f"Loading model from {path}")
        
        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(path)
        
        # Load base model
        base_model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
        )
        
        # Load the LoRA adapter
        from peft import PeftModel
        self.peft_model = PeftModel.from_pretrained(base_model, path)
        
        print("Model loaded successfully")

def main():
    """Main training function"""
    # Initialize trainer
    trainer = NutritionLLMTrainer()
    
    # Setup model and tokenizer
    trainer.setup_model_and_tokenizer()
    
    # Load dataset
    dataset = trainer.load_dataset("../data/kids_nutrition_dataset.json")
    
    # Train the model
    trainer.train_model(dataset, output_dir="../models/nutrition_llm")
    
    # Test the model with some sample questions
    print("\n" + "="*50)
    print("Testing the trained model:")
    print("="*50)
    
    test_questions = [
        "What should a 5 year old eat for breakfast?",
        "Is broccoli healthy for my 8 year old?",
        "What are some good snacks for a toddler?",
        "How can I get my picky 6 year old to eat vegetables?"
    ]
    
    for question in test_questions:
        print(f"\nQ: {question}")
        response = trainer.generate_response(question)
        print(f"A: {response}")
        print("-" * 30)

if __name__ == "__main__":
    main()