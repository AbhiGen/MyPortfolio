# 🥗 Kids Nutrition AI Assistant

An explainable and interpretable Large Language Model (LLM) designed specifically for children's nutrition guidance. This AI assistant provides evidence-based nutritional recommendations, meal planning, and educational content tailored for different age groups.

## 🌟 Features

### 🤖 AI-Powered Nutrition Guidance
- **Conversational Interface**: Ask questions in natural language
- **Age-Appropriate Recommendations**: Tailored advice for toddlers, preschoolers, school-age children, and teens
- **Meal Planning**: Generate balanced daily meal plans
- **Snack Suggestions**: Healthy snack recommendations
- **Picky Eater Support**: Strategies for encouraging healthy eating

### 🔍 Explainable AI
- **Transparent Recommendations**: Understand why certain foods are recommended
- **Confidence Scoring**: See how confident the AI is in its recommendations
- **Evidence-Based Facts**: Nutritional information backed by science
- **Safety Considerations**: Automatic checks for age-appropriateness and allergens
- **LIME Integration**: Local interpretable model-agnostic explanations

### 🎯 Safety & Accuracy
- **Age-Appropriate Portions**: Recommendations based on developmental stages
- **Allergen Awareness**: Built-in safety checks for common allergens
- **Choking Hazard Detection**: Warnings for age-inappropriate foods
- **Evidence-Based**: Built on established nutritional guidelines

## 🚀 Quick Start

### Option 1: One-Command Setup (Recommended)
```bash
python setup.py --mode demo
```

This will:
1. Install all dependencies
2. Set up the project structure
3. Create a demo version of the app
4. Launch the web interface

### Option 2: Full Training Pipeline
```bash
python setup.py --mode full
```

This will:
1. Install dependencies
2. Generate a custom nutrition dataset (2000+ Q&A pairs)
3. Fine-tune a conversational AI model
4. Deploy the complete application with explainability features

### Option 3: Manual Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Generate Dataset**
   ```bash
   cd data
   python create_nutrition_dataset.py
   cd ..
   ```

3. **Train Model** (Optional - can use demo mode)
   ```bash
   cd src
   python fine_tune_model.py
   cd ..
   ```

4. **Launch Application**
   ```bash
   cd deployment
   python gradio_app.py
   ```

## 📋 Requirements

### System Requirements
- Python 3.8+
- 8GB+ RAM (16GB recommended for training)
- GPU optional (but recommended for faster training)

### Python Dependencies
- `torch>=2.0.0` - Deep learning framework
- `transformers>=4.30.0` - Hugging Face transformers
- `gradio>=3.35.0` - Web interface
- `datasets>=2.12.0` - Dataset handling
- `peft>=0.4.0` - Parameter-efficient fine-tuning
- `pandas`, `numpy` - Data manipulation
- `plotly`, `matplotlib` - Visualizations
- `lime`, `shap` - Explainability

## 🏗️ Project Structure

```
kids_nutrition_llm/
├── data/                          # Dataset and data processing
│   ├── create_nutrition_dataset.py   # Dataset generation script
│   ├── kids_nutrition_dataset.json   # Generated Q&A dataset
│   └── kids_nutrition_dataset.csv    # Dataset in CSV format
├── src/                           # Source code
│   ├── fine_tune_model.py            # Model training script
│   └── explainability.py            # Explainability features
├── deployment/                    # Deployment files
│   └── gradio_app.py                 # Web application
├── models/                        # Trained models
│   └── nutrition_llm/                # Fine-tuned model directory
├── notebooks/                     # Jupyter notebooks (for experimentation)
├── tests/                         # Test files
├── requirements.txt               # Python dependencies
├── setup.py                       # Setup and installation script
├── run_demo.py                    # Quick demo launcher
└── README.md                      # This file
```

## 🎮 Usage Examples

### Basic Chat Interface
```
User: "What should a 5-year-old eat for breakfast?"

AI: "For a healthy breakfast, I recommend:
• Whole grain oats (1/2 cup): Rich in fiber for healthy digestion
• Greek yogurt (1/4 cup): Provides protein and calcium
• Fresh berries (1/4 cup): High in vitamin C
• Banana slices: Natural energy and potassium

🌟 Fun tip: Let your child arrange the berries in colorful patterns!"
```

### Meal Planning
```
User: Select age group "Preschool" and generate meal plan

AI: Generates a complete daily meal plan with:
- Breakfast suggestions
- Lunch options
- Dinner recommendations
- Healthy snacks
- Hydration reminders
```

### Nutrition Facts Lookup
```
User: Look up "apple"

AI: "Nutrition Facts: Apple
Calories: 52 per 100g
Key Nutrients: Fiber (2.4g), Vitamin C (4.6mg), Potassium (107mg)
Health Benefits: Supports digestive health, boosts immune system
Kid-Friendly Tips: Great for snacks, naturally sweet, easy to eat"
```

## 🧠 Model Architecture

### Base Model
- **Foundation**: Microsoft DialoGPT-small (lightweight conversational model)
- **Fine-tuning**: LoRA (Low-Rank Adaptation) for parameter-efficient training
- **Dataset**: 2000+ custom nutrition Q&A pairs
- **Training**: 3 epochs with gradient accumulation

### Explainability Components
- **LIME Integration**: Local interpretable explanations
- **Custom Analysis**: Nutritional content analysis
- **Confidence Scoring**: Multi-factor confidence assessment
- **Safety Checks**: Age-appropriateness and allergen detection

## 📊 Dataset Details

### Custom Nutrition Dataset
- **Size**: 2000+ question-answer pairs
- **Coverage**: 4 age groups × 10 question types × multiple scenarios
- **Content Areas**:
  - Meal recommendations
  - Snack suggestions
  - Nutritional guidance
  - Picky eater advice
  - Portion guidance
  - Health assessments

### Age Groups
1. **Toddlers (2-3 years)**: 1000-1400 calories/day
2. **Preschoolers (4-5 years)**: 1200-2000 calories/day
3. **School-age (6-11 years)**: 1400-2200 calories/day
4. **Teens (12-18 years)**: 1800-3200 calories/day

## 🔧 Configuration Options

### Training Parameters
```python
# In src/fine_tune_model.py
training_args = TrainingArguments(
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=5e-4,
    # ... other parameters
)
```

### LoRA Configuration
```python
lora_config = LoraConfig(
    r=16,  # LoRA rank
    lora_alpha=32,
    lora_dropout=0.1,
    target_modules=["c_attn", "c_proj"]
)
```

## 🌐 Web Interface Features

### Multiple Tabs
1. **💬 Chat**: Main conversational interface
2. **🔍 Explanation**: Detailed analysis of recommendations
3. **📊 Nutrition Facts**: Food information lookup
4. **🍽️ Meal Planner**: Automated meal plan generation
5. **ℹ️ About**: Project information and guidelines

### Interactive Elements
- Real-time chat with nutrition AI
- Explanation on demand
- Meal plan customization
- Nutrition database search
- Conversation history

## 🛡️ Safety Features

### Built-in Safety Checks
- **Age Appropriateness**: Automatic portion and food safety checks
- **Allergen Awareness**: Warnings for common allergens
- **Choking Hazards**: Detection of inappropriate foods for young children
- **Professional Disclaimer**: Clear guidance to consult healthcare providers

### Example Safety Outputs
```
⚠️ Safety Considerations:
- Consider allergies to peanut
- Choking hazard: whole grapes - supervise young children
- Honey not recommended for children under 12 months
```

## 📈 Performance & Metrics

### Model Performance
- **Training Loss**: Monitored during fine-tuning
- **Evaluation Loss**: Validation on held-out data
- **Response Quality**: Manual evaluation of nutritional accuracy
- **Safety Compliance**: Automated safety check validation

### Explainability Metrics
- **Confidence Score**: 0.0-1.0 based on multiple factors
- **Nutritional Balance**: Percentage of food groups covered
- **Evidence Level**: Scientific backing of recommendations

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Test thoroughly
5. Submit a pull request

### Areas for Contribution
- Additional nutrition datasets
- More explainability features
- UI/UX improvements
- Additional safety checks
- Multi-language support
- Mobile app development

## 📚 Educational Value

### For Parents
- Evidence-based nutrition guidance
- Age-appropriate recommendations
- Practical meal planning
- Understanding nutritional needs

### For Children
- Fun food presentations
- Learning about nutrition
- Developing healthy habits
- Understanding food benefits

## ⚠️ Important Disclaimers

### Medical Disclaimer
- This tool provides general nutritional guidance
- Not a substitute for professional medical advice
- Consult pediatricians for specific health concerns
- Individual needs may vary

### AI Limitations
- Responses based on training data
- May not cover all edge cases
- Continuous learning and improvement needed
- Human oversight recommended

## 🔮 Future Enhancements

### Planned Features
- **Multi-language Support**: Nutrition guidance in multiple languages
- **Recipe Integration**: Specific recipes with nutritional analysis
- **Growth Tracking**: Integration with growth charts
- **Allergy Management**: Comprehensive allergen tracking
- **Mobile App**: Native mobile application
- **Voice Interface**: Voice-activated nutrition assistant

### Research Directions
- **Personalization**: Individual dietary preference learning
- **Cultural Adaptation**: Culture-specific nutrition guidance
- **Real-time Updates**: Integration with latest nutrition research
- **Clinical Integration**: Healthcare provider collaboration tools

## 📞 Support & Contact

### Getting Help
- Create an issue on GitHub for bugs or feature requests
- Check the documentation for common questions
- Review the code comments for implementation details

### Community
- Share your experiences and improvements
- Contribute to the nutrition knowledge base
- Help others with setup and usage questions

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for more details.

## 🙏 Acknowledgments

- **Hugging Face**: For the transformers library and model hosting
- **Gradio**: For the easy-to-use web interface framework
- **Nutrition Research**: Based on established dietary guidelines
- **Open Source Community**: For the foundational tools and libraries

---

**Made with ❤️ for healthier kids and families**

*Start your journey to better child nutrition today with our AI-powered assistant!*
