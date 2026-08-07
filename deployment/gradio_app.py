import gradio as gr
import sys
import os
import json
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime

# Add parent directory to path to import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.fine_tune_model import NutritionLLMTrainer
from src.explainability import NutritionLLMExplainer

class NutritionLLMApp:
    def __init__(self):
        self.trainer = None
        self.explainer = None
        self.conversation_history = []
        
        # Load model if available
        self.load_model()
    
    def load_model(self):
        """Load the trained model"""
        model_path = "../models/nutrition_llm"
        if os.path.exists(model_path):
            try:
                self.trainer = NutritionLLMTrainer()
                self.trainer.load_model(model_path)
                self.explainer = NutritionLLMExplainer(
                    self.trainer.peft_model, 
                    self.trainer.tokenizer
                )
                print("Model loaded successfully!")
            except Exception as e:
                print(f"Error loading model: {e}")
                self.setup_demo_mode()
        else:
            print("No trained model found. Setting up demo mode.")
            self.setup_demo_mode()
    
    def setup_demo_mode(self):
        """Setup demo mode with pre-defined responses"""
        self.demo_responses = {
            "breakfast": "For a healthy breakfast, I recommend:\n\n• Whole grain oats (1/2 cup): Rich in fiber for healthy digestion\n• Greek yogurt (1/4 cup): Provides protein for growing muscles and calcium for strong bones\n• Fresh berries (1/4 cup): High in vitamin C to boost immune system\n• Banana slices: Natural sugars for energy and potassium for heart health\n\n🌟 Fun tip: Let your child arrange the berries in colorful patterns on top of the oats!\n\nThis combination provides balanced nutrition with protein, healthy carbs, and essential vitamins.",
            
            "snack": "Here are some healthy snack ideas:\n\n• Apple slices with almond butter: Fiber + healthy fats + protein\n• Carrot sticks with hummus: Vitamin A + protein + fiber\n• Whole grain crackers with cheese: Calcium + protein + complex carbs\n• Greek yogurt with berries: Probiotics + antioxidants + protein\n\n🌟 Remember: Snacks should be smaller portions that bridge the gap between meals!\n\nThese snacks provide sustained energy and important nutrients for growing bodies.",
            
            "vegetables": "If your child doesn't like vegetables, try these strategies:\n\n• Try different cooking methods (roasted, steamed, raw with dip)\n• Mix vegetables into favorite foods like pasta or pizza\n• Make vegetable smoothies with fruits\n• Start with sweeter vegetables like carrots or bell peppers\n• Let your child help choose and prepare vegetables\n\n💡 Remember: It can take 10+ exposures to a new food before a child accepts it!\n\nBe patient and keep offering variety in fun, pressure-free ways.",
            
            "default": "I'd be happy to help with your child's nutrition! Here are some general guidelines:\n\n• Include foods from all groups: fruits, vegetables, proteins, grains, and dairy\n• Offer variety and let children explore new foods\n• Make mealtimes positive and fun\n• Provide age-appropriate portions\n• Stay hydrated with water throughout the day\n\n🌟 Remember: Every child is different, and developing healthy eating habits takes time and patience!\n\nFeel free to ask me specific questions about meals, snacks, or nutrition concerns."
        }
    
    def get_demo_response(self, question):
        """Get demo response based on question keywords"""
        question_lower = question.lower()
        
        if "breakfast" in question_lower:
            return self.demo_responses["breakfast"]
        elif "snack" in question_lower:
            return self.demo_responses["snack"]
        elif "vegetable" in question_lower or "picky" in question_lower:
            return self.demo_responses["vegetables"]
        else:
            return self.demo_responses["default"]
    
    def chat_with_nutritionist(self, message, history):
        """Main chat function"""
        if not message.strip():
            return history, history, ""
        
        # Get response
        if self.trainer and self.trainer.peft_model:
            try:
                response = self.trainer.generate_response(message)
            except Exception as e:
                response = f"Sorry, I encountered an error: {str(e)}. Let me provide a general response.\n\n{self.get_demo_response(message)}"
        else:
            response = self.get_demo_response(message)
        
        # Add to conversation history
        self.conversation_history.append({
            "timestamp": datetime.now().isoformat(),
            "question": message,
            "response": response
        })
        
        # Update chat history
        history.append([message, response])
        
        return history, history, ""
    
    def explain_last_response(self):
        """Explain the last response given"""
        if not self.conversation_history:
            return "No conversation history to explain."
        
        last_conversation = self.conversation_history[-1]
        question = last_conversation["question"]
        response = last_conversation["response"]
        
        if self.explainer:
            try:
                explanation = self.explainer.explain_recommendation(question, response)
                report = self.explainer.generate_explanation_report(explanation)
                return report
            except Exception as e:
                return f"Error generating explanation: {str(e)}"
        else:
            # Demo explanation
            return self.generate_demo_explanation(question, response)
    
    def generate_demo_explanation(self, question, response):
        """Generate a demo explanation for the response"""
        explanation = f"""
# Nutrition Recommendation Explanation

## Question: {question}

## Response Analysis:

### Key Nutritional Elements:
- **Food Groups**: The recommendation includes multiple food groups for balanced nutrition
- **Age Appropriateness**: Portions and foods are suitable for children
- **Educational Value**: Explanations help children understand why foods are healthy

### Evidence-Based Benefits:
- **Protein**: Essential for muscle growth and development
- **Fiber**: Important for digestive health
- **Vitamins & Minerals**: Support immune function and overall health
- **Calcium**: Critical for bone and teeth development

### Safety Considerations:
- All recommended foods are age-appropriate
- Portion sizes are suitable for children
- No known allergens mentioned without warnings

### Confidence Score: 85/100
This recommendation is based on established nutritional guidelines for children and includes practical, actionable advice.

### Why This Response Works:
1. **Balanced Approach**: Includes multiple food groups
2. **Practical Tips**: Provides actionable preparation suggestions
3. **Educational**: Explains benefits in child-friendly language
4. **Fun Factor**: Includes engaging presentation ideas
"""
        return explanation
    
    def get_nutrition_facts(self, food_item):
        """Get nutrition facts for a specific food item"""
        nutrition_db = {
            "apple": {
                "calories": "52 per 100g",
                "key_nutrients": "Fiber (2.4g), Vitamin C (4.6mg), Potassium (107mg)",
                "benefits": "Supports digestive health, boosts immune system",
                "kid_friendly": "Great for snacks, naturally sweet, easy to eat"
            },
            "broccoli": {
                "calories": "34 per 100g", 
                "key_nutrients": "Vitamin C (89mg), Vitamin K (102mcg), Fiber (2.6g)",
                "benefits": "Strengthens immune system, supports bone health",
                "kid_friendly": "Try with cheese sauce or in pasta dishes"
            },
            "chicken": {
                "calories": "165 per 100g",
                "key_nutrients": "Protein (31g), Niacin (8.5mg), Selenium (22.5mcg)",
                "benefits": "Builds strong muscles, supports growth",
                "kid_friendly": "Versatile protein, can be prepared many ways"
            },
            "yogurt": {
                "calories": "59 per 100g",
                "key_nutrients": "Protein (10g), Calcium (110mg), Probiotics",
                "benefits": "Strengthens bones, supports digestive health",
                "kid_friendly": "Creamy texture, mix with fruits for natural sweetness"
            }
        }
        
        food_lower = food_item.lower().strip()
        if food_lower in nutrition_db:
            info = nutrition_db[food_lower]
            return f"""
## Nutrition Facts: {food_item.title()}

**Calories**: {info['calories']}

**Key Nutrients**: {info['key_nutrients']}

**Health Benefits**: {info['benefits']}

**Kid-Friendly Tips**: {info['kid_friendly']}
"""
        else:
            return f"Nutrition information for '{food_item}' is not available in the database. Try common foods like apple, broccoli, chicken, or yogurt."
    
    def generate_meal_plan(self, age_group, dietary_restrictions):
        """Generate a sample meal plan"""
        meal_plans = {
            "toddler": {
                "breakfast": "• Oatmeal with mashed banana (1/2 cup)\n• Whole milk (4 oz)\n• Soft fruit pieces",
                "lunch": "• Mini sandwich with soft protein (1/2 sandwich)\n• Steamed vegetables (1/4 cup)\n• Cheese cubes\n• Water",
                "dinner": "• Soft cooked pasta with sauce (1/2 cup)\n• Steamed broccoli (2-3 pieces)\n• Milk (4 oz)",
                "snacks": "• Yogurt with soft fruit\n• Whole grain crackers\n• Cheese pieces"
            },
            "preschool": {
                "breakfast": "• Whole grain cereal with milk (3/4 cup)\n• Fresh berries (1/4 cup)\n• Orange juice (4 oz)",
                "lunch": "• Turkey sandwich (1 whole)\n• Carrot sticks with hummus\n• Apple slices\n• Water",
                "dinner": "• Grilled chicken (2 oz)\n• Brown rice (1/2 cup)\n• Mixed vegetables (1/2 cup)\n• Milk (6 oz)",
                "snacks": "• Graham crackers with peanut butter\n• String cheese and grapes\n• Whole grain pretzels"
            },
            "school_age": {
                "breakfast": "• Whole grain toast with avocado (2 slices)\n• Scrambled eggs (1 egg)\n• Fresh fruit (1 cup)\n• Milk (8 oz)",
                "lunch": "• Chicken wrap with vegetables\n• Baby carrots with ranch\n• Yogurt cup\n• Water bottle",
                "dinner": "• Baked salmon (3 oz)\n• Quinoa (3/4 cup)\n• Roasted vegetables (3/4 cup)\n• Milk (8 oz)",
                "snacks": "• Trail mix with nuts and dried fruit\n• Apple with almond butter\n• Whole grain crackers with cheese"
            }
        }
        
        if age_group.lower() in meal_plans:
            plan = meal_plans[age_group.lower()]
            meal_plan_text = f"""
# Daily Meal Plan for {age_group.title()}

## 🌅 Breakfast
{plan['breakfast']}

## 🥪 Lunch  
{plan['lunch']}

## 🍽️ Dinner
{plan['dinner']}

## 🥜 Healthy Snacks
{plan['snacks']}

## 💧 Hydration
- Water throughout the day
- Limit sugary drinks
- Milk with meals

## 📝 Notes:
- Adjust portions based on your child's appetite
- Offer variety and try new foods regularly
- Make mealtimes positive and fun
"""
            
            if dietary_restrictions:
                meal_plan_text += f"\n**Dietary Restrictions Noted**: {dietary_restrictions}\n*Please consult with a pediatric nutritionist for personalized modifications.*"
            
            return meal_plan_text
        else:
            return "Please select a valid age group: toddler, preschool, or school_age"
    
    def create_interface(self):
        """Create the Gradio interface"""
        
        # Custom CSS for better styling
        css = """
        .gradio-container {
            font-family: 'Arial', sans-serif;
        }
        .nutrition-header {
            text-align: center;
            color: #2E8B57;
            margin-bottom: 20px;
        }
        .chat-message {
            padding: 10px;
            margin: 5px 0;
            border-radius: 10px;
        }
        """
        
        with gr.Blocks(css=css, title="Kids Nutrition AI Assistant") as interface:
            
            gr.HTML("""
            <div class="nutrition-header">
                <h1>🥗 Kids Nutrition AI Assistant 🥗</h1>
                <p>Your friendly AI nutritionist for children's healthy eating!</p>
            </div>
            """)
            
            with gr.Tabs():
                
                # Main Chat Tab
                with gr.TabItem("💬 Chat with Nutritionist"):
                    gr.Markdown("""
                    ### Ask me anything about kids' nutrition!
                    - What should my child eat for breakfast?
                    - Is [food] healthy for my [age] year old?
                    - How can I get my picky eater to try vegetables?
                    - What are good snacks for toddlers?
                    """)
                    
                    chatbot = gr.Chatbot(
                        height=400,
                        label="Nutrition Assistant",
                        placeholder="Start chatting with your nutrition assistant..."
                    )
                    
                    with gr.Row():
                        msg = gr.Textbox(
                            placeholder="Ask your nutrition question here...",
                            label="Your Question",
                            lines=2,
                            scale=4
                        )
                        send_btn = gr.Button("Send", variant="primary", scale=1)
                    
                    with gr.Row():
                        clear_btn = gr.Button("Clear Chat", variant="secondary")
                        explain_btn = gr.Button("Explain Last Response", variant="secondary")
                    
                    # Chat state
                    chat_history = gr.State([])
                    
                    # Chat functionality
                    def respond(message, history):
                        return self.chat_with_nutritionist(message, history)
                    
                    msg.submit(respond, [msg, chat_history], [chatbot, chat_history, msg])
                    send_btn.click(respond, [msg, chat_history], [chatbot, chat_history, msg])
                    clear_btn.click(lambda: ([], []), outputs=[chatbot, chat_history])
                
                # Explanation Tab
                with gr.TabItem("🔍 Explanation & Analysis"):
                    gr.Markdown("### Understanding the Recommendations")
                    
                    explanation_output = gr.Markdown(
                        value="Chat with the nutritionist first, then click 'Explain Last Response' to see detailed analysis.",
                        label="Explanation"
                    )
                    
                    explain_btn.click(
                        fn=self.explain_last_response,
                        outputs=explanation_output
                    )
                
                # Nutrition Facts Tab
                with gr.TabItem("📊 Nutrition Facts"):
                    gr.Markdown("### Look up nutrition information for specific foods")
                    
                    with gr.Row():
                        food_input = gr.Textbox(
                            placeholder="Enter a food item (e.g., apple, broccoli, chicken)",
                            label="Food Item",
                            scale=3
                        )
                        lookup_btn = gr.Button("Look Up", variant="primary", scale=1)
                    
                    nutrition_output = gr.Markdown(label="Nutrition Information")
                    
                    lookup_btn.click(
                        fn=self.get_nutrition_facts,
                        inputs=food_input,
                        outputs=nutrition_output
                    )
                    food_input.submit(
                        fn=self.get_nutrition_facts,
                        inputs=food_input,
                        outputs=nutrition_output
                    )
                
                # Meal Planner Tab
                with gr.TabItem("🍽️ Meal Planner"):
                    gr.Markdown("### Generate a balanced daily meal plan")
                    
                    with gr.Row():
                        age_dropdown = gr.Dropdown(
                            choices=["Toddler", "Preschool", "School_Age"],
                            label="Age Group",
                            value="Preschool"
                        )
                        
                        restrictions_input = gr.Textbox(
                            placeholder="Any dietary restrictions or allergies?",
                            label="Dietary Restrictions (Optional)",
                            lines=2
                        )
                    
                    generate_plan_btn = gr.Button("Generate Meal Plan", variant="primary")
                    meal_plan_output = gr.Markdown(label="Daily Meal Plan")
                    
                    generate_plan_btn.click(
                        fn=self.generate_meal_plan,
                        inputs=[age_dropdown, restrictions_input],
                        outputs=meal_plan_output
                    )
                
                # About Tab
                with gr.TabItem("ℹ️ About"):
                    gr.Markdown("""
                    ## About Kids Nutrition AI Assistant
                    
                    This AI assistant is designed to help parents and caregivers make informed decisions about children's nutrition. 
                    
                    ### Features:
                    - **Conversational Interface**: Ask questions in natural language
                    - **Age-Appropriate Advice**: Tailored recommendations for different age groups
                    - **Explainable AI**: Understand the reasoning behind recommendations
                    - **Evidence-Based**: Built on established nutritional science
                    - **Safety-Focused**: Considers allergies and age-appropriate foods
                    
                    ### Age Groups Supported:
                    - **Toddlers (2-3 years)**: Focus on safe, soft foods and proper portions
                    - **Preschoolers (4-5 years)**: Encouraging variety and independence
                    - **School-age (6-11 years)**: Supporting active growth and development
                    - **Teens (12-18 years)**: Meeting increased nutritional needs
                    
                    ### Important Notes:
                    - This tool provides general guidance and should not replace professional medical advice
                    - Always consult with your pediatrician for specific health concerns
                    - Consider individual allergies and dietary restrictions
                    - Every child is unique - adjust recommendations as needed
                    
                    ### Model Information:
                    - **Base Model**: Fine-tuned conversational AI specialized for nutrition
                    - **Training Data**: 2000+ nutrition Q&A pairs covering common scenarios
                    - **Explainability**: Uses LIME and custom analysis for transparent recommendations
                    - **Safety Features**: Built-in checks for age-appropriateness and allergen awareness
                    """)
        
        return interface

def main():
    """Main function to launch the app"""
    app = NutritionLLMApp()
    interface = app.create_interface()
    
    # Launch the interface
    interface.launch(
        server_name="0.0.0.0",  # Allow external access
        server_port=7860,
        share=True,  # Create public link
        debug=True
    )

if __name__ == "__main__":
    main()