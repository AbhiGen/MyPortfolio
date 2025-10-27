import torch
import numpy as np
import pandas as pd
from typing import List, Dict, Any, Tuple
import matplotlib.pyplot as plt
import seaborn as sns
from transformers import AutoTokenizer, AutoModelForCausalLM
from lime.lime_text import LimeTextExplainer
import shap
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

class NutritionLLMExplainer:
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer
        self.lime_explainer = LimeTextExplainer(class_names=['response'])
        
        # Nutrition knowledge base for explanations
        self.nutrition_facts = {
            "protein": {
                "benefits": "Builds and repairs muscles, supports growth",
                "sources": ["chicken", "fish", "eggs", "beans", "yogurt"],
                "daily_needs": {"toddler": "13g", "preschool": "19g", "school_age": "19-34g", "teen": "46-52g"}
            },
            "calcium": {
                "benefits": "Strengthens bones and teeth, supports nerve function",
                "sources": ["milk", "cheese", "yogurt", "leafy greens"],
                "daily_needs": {"toddler": "700mg", "preschool": "1000mg", "school_age": "1000mg", "teen": "1300mg"}
            },
            "iron": {
                "benefits": "Carries oxygen in blood, prevents anemia",
                "sources": ["meat", "spinach", "beans", "fortified cereals"],
                "daily_needs": {"toddler": "7mg", "preschool": "10mg", "school_age": "10mg", "teen": "8-15mg"}
            },
            "vitamin_c": {
                "benefits": "Boosts immune system, helps wound healing",
                "sources": ["oranges", "strawberries", "bell peppers", "broccoli"],
                "daily_needs": {"toddler": "15mg", "preschool": "25mg", "school_age": "25-45mg", "teen": "65-75mg"}
            },
            "fiber": {
                "benefits": "Promotes healthy digestion, prevents constipation",
                "sources": ["whole grains", "fruits", "vegetables", "beans"],
                "daily_needs": {"toddler": "19g", "preschool": "25g", "school_age": "25-31g", "teen": "26-38g"}
            }
        }
        
        # Food categories for analysis
        self.food_categories = {
            "fruits": ["apple", "banana", "orange", "strawberries", "grapes", "watermelon"],
            "vegetables": ["broccoli", "carrots", "spinach", "sweet potato", "tomatoes", "bell peppers"],
            "proteins": ["chicken", "fish", "eggs", "beans", "yogurt", "cheese"],
            "grains": ["rice", "quinoa", "bread", "oats", "pasta"],
            "dairy": ["milk", "cheese", "yogurt"]
        }

    def predict_proba_wrapper(self, texts: List[str]) -> np.ndarray:
        """Wrapper function for LIME that returns prediction probabilities"""
        probabilities = []
        
        for text in texts:
            # Generate response
            input_text = f"Human: {text}\nNutritionist:"
            inputs = self.tokenizer.encode(input_text, return_tensors="pt")
            
            with torch.no_grad():
                outputs = self.model.generate(
                    inputs,
                    max_length=200,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    return_dict_in_generate=True,
                    output_scores=True
                )
                
                # Get the average probability of generated tokens
                scores = torch.stack(outputs.scores, dim=1)
                probs = torch.softmax(scores, dim=-1)
                avg_prob = torch.mean(probs).item()
                
                probabilities.append([1 - avg_prob, avg_prob])
        
        return np.array(probabilities)

    def explain_recommendation(self, question: str, response: str) -> Dict[str, Any]:
        """Provide a comprehensive explanation of the model's recommendation"""
        
        # Generate LIME explanation
        lime_explanation = self.lime_explainer.explain_instance(
            question, 
            self.predict_proba_wrapper, 
            num_features=10,
            num_samples=100
        )
        
        # Extract important words and their weights
        lime_weights = dict(lime_explanation.as_list())
        
        # Analyze nutritional content
        nutritional_analysis = self._analyze_nutritional_content(response)
        
        # Extract reasoning
        reasoning = self._extract_reasoning(question, response)
        
        # Generate confidence score
        confidence = self._calculate_confidence(question, response)
        
        explanation = {
            "question": question,
            "response": response,
            "confidence_score": confidence,
            "key_factors": lime_weights,
            "nutritional_analysis": nutritional_analysis,
            "reasoning": reasoning,
            "evidence_based_facts": self._get_evidence_based_facts(response),
            "age_appropriateness": self._assess_age_appropriateness(question, response),
            "safety_considerations": self._identify_safety_considerations(response)
        }
        
        return explanation

    def _analyze_nutritional_content(self, response: str) -> Dict[str, Any]:
        """Analyze the nutritional content mentioned in the response"""
        analysis = {
            "mentioned_nutrients": [],
            "food_groups_covered": [],
            "nutritional_balance": {},
            "portion_guidance": False
        }
        
        response_lower = response.lower()
        
        # Check for mentioned nutrients
        for nutrient, info in self.nutrition_facts.items():
            if nutrient.replace('_', ' ') in response_lower or any(benefit.lower() in response_lower for benefit in info["benefits"].split()):
                analysis["mentioned_nutrients"].append({
                    "nutrient": nutrient,
                    "benefits": info["benefits"],
                    "mentioned_explicitly": nutrient.replace('_', ' ') in response_lower
                })
        
        # Check for food groups
        for category, foods in self.food_categories.items():
            mentioned_foods = [food for food in foods if food in response_lower]
            if mentioned_foods:
                analysis["food_groups_covered"].append({
                    "category": category,
                    "foods_mentioned": mentioned_foods
                })
        
        # Check for portion guidance
        portion_keywords = ["cup", "slice", "oz", "serving", "portion", "amount"]
        analysis["portion_guidance"] = any(keyword in response_lower for keyword in portion_keywords)
        
        # Calculate nutritional balance score
        balance_score = len(analysis["food_groups_covered"]) / len(self.food_categories) * 100
        analysis["nutritional_balance"]["score"] = balance_score
        analysis["nutritional_balance"]["assessment"] = self._assess_balance(balance_score)
        
        return analysis

    def _extract_reasoning(self, question: str, response: str) -> Dict[str, Any]:
        """Extract the reasoning behind the recommendation"""
        reasoning = {
            "question_type": self._classify_question(question),
            "recommendation_basis": [],
            "educational_content": [],
            "practical_tips": []
        }
        
        response_sentences = response.split('.')
        
        for sentence in response_sentences:
            sentence = sentence.strip()
            if not sentence:
                continue
                
            # Identify recommendation basis
            if any(word in sentence.lower() for word in ["because", "since", "due to", "helps", "provides"]):
                reasoning["recommendation_basis"].append(sentence)
            
            # Identify educational content
            elif any(word in sentence.lower() for word in ["important", "essential", "good source", "rich in"]):
                reasoning["educational_content"].append(sentence)
            
            # Identify practical tips
            elif any(word in sentence.lower() for word in ["try", "tip", "can", "make", "prepare"]):
                reasoning["practical_tips"].append(sentence)
        
        return reasoning

    def _classify_question(self, question: str) -> str:
        """Classify the type of nutrition question"""
        question_lower = question.lower()
        
        if "what should" in question_lower and "eat" in question_lower:
            return "meal_recommendation"
        elif "is" in question_lower and "healthy" in question_lower:
            return "health_assessment"
        elif "how much" in question_lower:
            return "portion_guidance"
        elif "snack" in question_lower:
            return "snack_recommendation"
        elif "doesn't like" in question_lower or "picky" in question_lower:
            return "picky_eater_advice"
        elif "nutrient" in question_lower or "vitamin" in question_lower or "mineral" in question_lower:
            return "nutrient_guidance"
        else:
            return "general_nutrition"

    def _calculate_confidence(self, question: str, response: str) -> float:
        """Calculate confidence score based on various factors"""
        confidence_factors = []
        
        # Check if response mentions specific nutrients
        nutrient_mentions = sum(1 for nutrient in self.nutrition_facts.keys() 
                              if nutrient.replace('_', ' ') in response.lower())
        confidence_factors.append(min(nutrient_mentions / 3, 1.0) * 0.3)
        
        # Check if response provides specific foods
        food_mentions = sum(1 for foods in self.food_categories.values() 
                           for food in foods if food in response.lower())
        confidence_factors.append(min(food_mentions / 5, 1.0) * 0.3)
        
        # Check if response provides portion guidance
        portion_keywords = ["cup", "slice", "oz", "serving", "portion"]
        has_portions = any(keyword in response.lower() for keyword in portion_keywords)
        confidence_factors.append(0.2 if has_portions else 0.0)
        
        # Check if response is age-appropriate
        age_keywords = ["year", "old", "toddler", "child", "teen"]
        is_age_specific = any(keyword in response.lower() for keyword in age_keywords)
        confidence_factors.append(0.2 if is_age_specific else 0.1)
        
        return sum(confidence_factors)

    def _get_evidence_based_facts(self, response: str) -> List[Dict[str, str]]:
        """Extract evidence-based nutritional facts from the response"""
        facts = []
        response_lower = response.lower()
        
        for nutrient, info in self.nutrition_facts.items():
            if nutrient.replace('_', ' ') in response_lower:
                facts.append({
                    "nutrient": nutrient.replace('_', ' ').title(),
                    "benefit": info["benefits"],
                    "good_sources": ", ".join(info["sources"][:3]),
                    "evidence_level": "Well-established"
                })
        
        return facts

    def _assess_age_appropriateness(self, question: str, response: str) -> Dict[str, Any]:
        """Assess if the recommendation is age-appropriate"""
        age_assessment = {
            "age_mentioned": False,
            "age_group": "unknown",
            "appropriateness_score": 0.5,
            "concerns": []
        }
        
        # Extract age information
        question_lower = question.lower()
        response_lower = response.lower()
        
        age_patterns = {
            "toddler": ["toddler", "2 year", "3 year"],
            "preschool": ["preschool", "4 year", "5 year"],
            "school_age": ["6 year", "7 year", "8 year", "9 year", "10 year", "11 year"],
            "teen": ["teen", "12 year", "13 year", "14 year", "15 year", "16 year", "17 year", "18 year"]
        }
        
        for age_group, patterns in age_patterns.items():
            if any(pattern in question_lower for pattern in patterns):
                age_assessment["age_mentioned"] = True
                age_assessment["age_group"] = age_group
                break
        
        # Check for age-appropriate recommendations
        if age_assessment["age_mentioned"]:
            age_assessment["appropriateness_score"] = 0.8
            
            # Check for potential concerns
            if age_assessment["age_group"] == "toddler":
                choking_hazards = ["nuts", "grapes", "popcorn", "hard candy"]
                for hazard in choking_hazards:
                    if hazard in response_lower:
                        age_assessment["concerns"].append(f"Potential choking hazard: {hazard}")
        
        return age_assessment

    def _identify_safety_considerations(self, response: str) -> List[str]:
        """Identify any safety considerations in the recommendation"""
        safety_considerations = []
        response_lower = response.lower()
        
        # Allergy considerations
        allergens = ["peanut", "tree nut", "milk", "egg", "soy", "wheat", "fish", "shellfish"]
        for allergen in allergens:
            if allergen in response_lower:
                safety_considerations.append(f"Consider allergies to {allergen}")
        
        # Choking hazards
        choking_hazards = ["whole grapes", "nuts", "popcorn", "hard candy", "whole cherry tomatoes"]
        for hazard in choking_hazards:
            if hazard in response_lower:
                safety_considerations.append(f"Choking hazard: {hazard} - supervise young children")
        
        # Portion warnings
        if "honey" in response_lower:
            safety_considerations.append("Honey not recommended for children under 12 months")
        
        return safety_considerations

    def _assess_balance(self, score: float) -> str:
        """Assess nutritional balance based on score"""
        if score >= 80:
            return "Excellent - covers most food groups"
        elif score >= 60:
            return "Good - covers several food groups"
        elif score >= 40:
            return "Fair - could include more variety"
        else:
            return "Limited - needs more food group diversity"

    def visualize_explanation(self, explanation: Dict[str, Any]) -> Dict[str, Any]:
        """Create visualizations for the explanation"""
        visualizations = {}
        
        # 1. Key factors importance chart
        if explanation["key_factors"]:
            factors_df = pd.DataFrame(list(explanation["key_factors"].items()), 
                                    columns=['Factor', 'Importance'])
            factors_df = factors_df.sort_values('Importance', key=abs, ascending=False).head(10)
            
            fig1 = px.bar(factors_df, x='Importance', y='Factor', 
                         title='Key Factors Influencing Recommendation',
                         color='Importance', color_continuous_scale='RdYlBu')
            visualizations["key_factors"] = fig1
        
        # 2. Nutritional balance radar chart
        nutritional_analysis = explanation["nutritional_analysis"]
        if nutritional_analysis["food_groups_covered"]:
            categories = [group["category"] for group in nutritional_analysis["food_groups_covered"]]
            values = [len(group["foods_mentioned"]) for group in nutritional_analysis["food_groups_covered"]]
            
            fig2 = go.Figure(data=go.Scatterpolar(
                r=values,
                theta=categories,
                fill='toself',
                name='Food Groups Covered'
            ))
            fig2.update_layout(
                polar=dict(
                    radialaxis=dict(
                        visible=True,
                        range=[0, max(values) + 1]
                    )),
                title="Nutritional Balance - Food Groups Coverage"
            )
            visualizations["nutritional_balance"] = fig2
        
        # 3. Confidence breakdown
        confidence_components = {
            'Nutrient Specificity': 0.3,
            'Food Variety': 0.3,
            'Portion Guidance': 0.2,
            'Age Appropriateness': 0.2
        }
        
        fig3 = px.pie(values=list(confidence_components.values()), 
                     names=list(confidence_components.keys()),
                     title=f'Confidence Score Breakdown (Total: {explanation["confidence_score"]:.2f})')
        visualizations["confidence_breakdown"] = fig3
        
        return visualizations

    def generate_explanation_report(self, explanation: Dict[str, Any]) -> str:
        """Generate a comprehensive explanation report"""
        report = f"""
# Nutrition Recommendation Explanation Report

## Question: {explanation['question']}

## Recommendation: {explanation['response'][:200]}...

## Confidence Score: {explanation['confidence_score']:.2f}/1.0

## Key Analysis:

### Nutritional Content Analysis:
- **Nutrients Mentioned:** {len(explanation['nutritional_analysis']['mentioned_nutrients'])}
- **Food Groups Covered:** {len(explanation['nutritional_analysis']['food_groups_covered'])}
- **Nutritional Balance Score:** {explanation['nutritional_analysis']['nutritional_balance']['score']:.1f}%
- **Assessment:** {explanation['nutritional_analysis']['nutritional_balance']['assessment']}

### Evidence-Based Facts:
"""
        
        for fact in explanation['evidence_based_facts']:
            report += f"- **{fact['nutrient']}:** {fact['benefit']} (Sources: {fact['good_sources']})\n"
        
        report += f"""
### Age Appropriateness:
- **Age Group:** {explanation['age_appropriateness']['age_group']}
- **Appropriateness Score:** {explanation['age_appropriateness']['appropriateness_score']:.2f}
"""
        
        if explanation['age_appropriateness']['concerns']:
            report += "- **Concerns:**\n"
            for concern in explanation['age_appropriateness']['concerns']:
                report += f"  - {concern}\n"
        
        if explanation['safety_considerations']:
            report += "\n### Safety Considerations:\n"
            for consideration in explanation['safety_considerations']:
                report += f"- {consideration}\n"
        
        report += f"""
### Reasoning Breakdown:
- **Question Type:** {explanation['reasoning']['question_type']}
- **Recommendation Basis:** {len(explanation['reasoning']['recommendation_basis'])} evidence-based reasons
- **Educational Content:** {len(explanation['reasoning']['educational_content'])} educational points
- **Practical Tips:** {len(explanation['reasoning']['practical_tips'])} actionable tips

## Summary:
This recommendation is based on established nutritional science and age-appropriate guidelines. 
The confidence score reflects the specificity and comprehensiveness of the advice provided.
"""
        
        return report

def main():
    """Demo function to show explainability features"""
    print("Nutrition LLM Explainability Demo")
    print("=" * 50)
    
    # This would normally load your trained model
    # For demo purposes, we'll create a mock explanation
    
    sample_question = "What should a 5 year old eat for breakfast?"
    sample_response = """For a breakfast, I recommend:

• Apple: 1/2 cup
  Why it's good: Fiber: helps your tummy feel good and digest food properly; Vitamin C: helps your body fight off germs and keeps you healthy

• Broccoli: 1/2 cup
  Why it's good: Vitamin C: helps your body fight off germs and keeps you healthy; Protein: helps your muscles grow big and strong

• Eggs: 1.5 oz
  Why it's good: Protein: helps your muscles grow big and strong; Choline: helps your brain work really well

• Oats: 1 slice
  Why it's good: Fiber: helps your tummy feel good and digest food properly; Protein: helps your muscles grow big and strong

🌟 Fun preparation tips:
• Make colorful rainbow plates with different colored foods
• Create food art by arranging foods into pictures or patterns
• Use fun plates and utensils to make eating more exciting

This combination provides a good balance of nutrients to help your child grow strong and healthy!"""
    
    # Create a mock explainer (in real use, you'd pass your trained model)
    explainer = NutritionLLMExplainer(None, None)
    
    # Generate explanation (simplified for demo)
    explanation = {
        "question": sample_question,
        "response": sample_response,
        "confidence_score": 0.85,
        "key_factors": {"breakfast": 0.3, "5 year old": 0.25, "healthy": 0.2},
        "nutritional_analysis": {
            "mentioned_nutrients": [
                {"nutrient": "fiber", "benefits": "helps digestion", "mentioned_explicitly": True},
                {"nutrient": "protein", "benefits": "builds muscles", "mentioned_explicitly": True}
            ],
            "food_groups_covered": [
                {"category": "fruits", "foods_mentioned": ["apple"]},
                {"category": "vegetables", "foods_mentioned": ["broccoli"]},
                {"category": "proteins", "foods_mentioned": ["eggs"]},
                {"category": "grains", "foods_mentioned": ["oats"]}
            ],
            "nutritional_balance": {"score": 80.0, "assessment": "Excellent - covers most food groups"},
            "portion_guidance": True
        },
        "reasoning": {
            "question_type": "meal_recommendation",
            "recommendation_basis": ["provides good balance of nutrients"],
            "educational_content": ["helps your muscles grow big and strong"],
            "practical_tips": ["Make colorful rainbow plates"]
        },
        "evidence_based_facts": [
            {"nutrient": "Fiber", "benefit": "helps digestion", "good_sources": "oats, apple", "evidence_level": "Well-established"}
        ],
        "age_appropriateness": {
            "age_mentioned": True,
            "age_group": "preschool",
            "appropriateness_score": 0.8,
            "concerns": []
        },
        "safety_considerations": []
    }
    
    # Generate report
    report = explainer.generate_explanation_report(explanation)
    print(report)

if __name__ == "__main__":
    main()