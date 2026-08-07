#!/usr/bin/env python3
"""
Kids Nutrition LLM Setup and Training Pipeline
This script sets up the environment, generates the dataset, trains the model, and deploys the application.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

def run_command(command, description=""):
    """Run a shell command and handle errors"""
    print(f"\n{'='*50}")
    print(f"Running: {description}")
    print(f"Command: {command}")
    print(f"{'='*50}")
    
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        if result.stdout:
            print("Output:", result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        if e.stderr:
            print(f"Error output: {e.stderr}")
        return False

def install_dependencies():
    """Install required Python packages"""
    print("Installing dependencies...")
    
    # Upgrade pip first
    run_command("pip install --upgrade pip", "Upgrading pip")
    
    # Install requirements
    if os.path.exists("requirements.txt"):
        success = run_command("pip install -r requirements.txt", "Installing requirements")
        if not success:
            print("Failed to install some requirements. Trying individual packages...")
            
            # Core packages that are essential
            essential_packages = [
                "torch>=2.0.0",
                "transformers>=4.30.0",
                "datasets>=2.12.0",
                "gradio>=3.35.0",
                "pandas>=1.5.0",
                "numpy>=1.24.0",
                "matplotlib>=3.7.0",
                "plotly>=5.14.0"
            ]
            
            for package in essential_packages:
                run_command(f"pip install '{package}'", f"Installing {package}")
    else:
        print("requirements.txt not found. Installing essential packages...")
        essential_packages = [
            "torch", "transformers", "datasets", "gradio", 
            "pandas", "numpy", "matplotlib", "plotly", "peft", "accelerate"
        ]
        
        for package in essential_packages:
            run_command(f"pip install {package}", f"Installing {package}")

def setup_directories():
    """Create necessary directories"""
    directories = [
        "data",
        "models",
        "src", 
        "deployment",
        "notebooks",
        "tests",
        "logs"
    ]
    
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
        print(f"Created directory: {directory}")

def generate_dataset():
    """Generate the nutrition dataset"""
    print("\nGenerating nutrition dataset...")
    
    if os.path.exists("data/create_nutrition_dataset.py"):
        os.chdir("data")
        success = run_command("python create_nutrition_dataset.py", "Generating dataset")
        os.chdir("..")
        
        if success and os.path.exists("data/kids_nutrition_dataset.json"):
            print("✅ Dataset generated successfully!")
            return True
        else:
            print("❌ Dataset generation failed!")
            return False
    else:
        print("❌ Dataset generation script not found!")
        return False

def train_model():
    """Train the nutrition LLM model"""
    print("\nTraining the nutrition LLM model...")
    
    if os.path.exists("src/fine_tune_model.py"):
        os.chdir("src")
        success = run_command("python fine_tune_model.py", "Training model")
        os.chdir("..")
        
        if success:
            print("✅ Model training completed!")
            return True
        else:
            print("❌ Model training failed!")
            return False
    else:
        print("❌ Training script not found!")
        return False

def test_model():
    """Test the trained model"""
    print("\nTesting the trained model...")
    
    if os.path.exists("models/nutrition_llm"):
        # Create a simple test script
        test_script = """
import sys
sys.path.append('../src')
from fine_tune_model import NutritionLLMTrainer

def test_model():
    try:
        trainer = NutritionLLMTrainer()
        trainer.load_model('../models/nutrition_llm')
        
        test_questions = [
            "What should a 5 year old eat for breakfast?",
            "Is broccoli healthy for children?"
        ]
        
        print("Testing model responses:")
        for question in test_questions:
            response = trainer.generate_response(question)
            print(f"Q: {question}")
            print(f"A: {response[:100]}...")
            print("-" * 30)
        
        print("✅ Model test successful!")
        return True
    except Exception as e:
        print(f"❌ Model test failed: {e}")
        return False

if __name__ == "__main__":
    test_model()
"""
        
        with open("test_model.py", "w") as f:
            f.write(test_script)
        
        success = run_command("python test_model.py", "Testing model")
        os.remove("test_model.py")
        
        return success
    else:
        print("❌ Trained model not found!")
        return False

def deploy_app():
    """Deploy the Gradio application"""
    print("\nDeploying the Gradio application...")
    
    if os.path.exists("deployment/gradio_app.py"):
        print("🚀 Starting Gradio application...")
        print("The app will be available at: http://localhost:7860")
        print("Press Ctrl+C to stop the application")
        
        os.chdir("deployment")
        # This will run in the foreground
        run_command("python gradio_app.py", "Launching Gradio app")
        os.chdir("..")
    else:
        print("❌ Gradio app script not found!")

def create_demo_mode():
    """Create a demo version that works without training"""
    print("\nSetting up demo mode...")
    
    demo_script = """
import gradio as gr
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from deployment.gradio_app import NutritionLLMApp
    
    def main():
        print("Starting Kids Nutrition AI Assistant in Demo Mode")
        app = NutritionLLMApp()
        interface = app.create_interface()
        interface.launch(
            server_name="0.0.0.0",
            server_port=7860,
            share=True,
            debug=True
        )
    
    if __name__ == "__main__":
        main()
        
except ImportError as e:
    print(f"Import error: {e}")
    print("Running basic demo...")
    
    def chat_demo(message, history):
        responses = {
            "breakfast": "For breakfast, I recommend oatmeal with fruits, yogurt, and milk for balanced nutrition!",
            "snack": "Healthy snacks include apple slices, carrot sticks, or yogurt with berries!",
            "vegetables": "Try making vegetables fun with dips, colorful presentations, or involving kids in cooking!"
        }
        
        message_lower = message.lower()
        if "breakfast" in message_lower:
            response = responses["breakfast"]
        elif "snack" in message_lower:
            response = responses["snack"]
        elif "vegetable" in message_lower or "picky" in message_lower:
            response = responses["vegetables"]
        else:
            response = "I'm here to help with kids' nutrition! Ask me about meals, snacks, or healthy eating tips."
        
        history.append([message, response])
        return history, history, ""
    
    with gr.Blocks(title="Kids Nutrition AI Demo") as demo:
        gr.HTML("<h1>🥗 Kids Nutrition AI Assistant (Demo) 🥗</h1>")
        
        chatbot = gr.Chatbot(height=400)
        msg = gr.Textbox(placeholder="Ask about kids nutrition...", label="Your Question")
        clear = gr.Button("Clear")
        
        chat_history = gr.State([])
        
        msg.submit(chat_demo, [msg, chat_history], [chatbot, chat_history, msg])
        clear.click(lambda: ([], []), outputs=[chatbot, chat_history])
    
    demo.launch(server_name="0.0.0.0", server_port=7860, share=True)
"""
    
    with open("run_demo.py", "w") as f:
        f.write(demo_script)
    
    print("✅ Demo script created: run_demo.py")

def main():
    """Main setup function"""
    parser = argparse.ArgumentParser(description="Kids Nutrition LLM Setup")
    parser.add_argument("--mode", choices=["full", "demo", "train-only", "deploy-only"], 
                       default="full", help="Setup mode")
    parser.add_argument("--skip-training", action="store_true", 
                       help="Skip model training (useful for testing)")
    
    args = parser.parse_args()
    
    print("🥗 Kids Nutrition LLM Setup Starting...")
    print(f"Mode: {args.mode}")
    
    # Setup directories
    setup_directories()
    
    if args.mode in ["full", "train-only"]:
        # Install dependencies
        install_dependencies()
        
        # Generate dataset
        if not generate_dataset():
            print("⚠️  Dataset generation failed, but continuing...")
        
        # Train model (unless skipped)
        if not args.skip_training:
            if not train_model():
                print("⚠️  Model training failed, setting up demo mode...")
                create_demo_mode()
            else:
                # Test model
                test_model()
    
    if args.mode in ["full", "demo", "deploy-only"]:
        # Create demo mode
        create_demo_mode()
        
        # Deploy application
        if args.mode != "train-only":
            print("\n🎉 Setup completed!")
            print("\nTo run the application:")
            print("1. Full app: python deployment/gradio_app.py")
            print("2. Demo mode: python run_demo.py")
            print("\nThe app will be available at http://localhost:7860")
            
            # Ask user if they want to start the app now
            if input("\nStart the demo app now? (y/n): ").lower().startswith('y'):
                run_command("python run_demo.py", "Starting demo app")

if __name__ == "__main__":
    main()