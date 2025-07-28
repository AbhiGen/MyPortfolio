import pandas as pd
import json
import random
from typing import List, Dict, Any

class NutritionDatasetGenerator:
    def __init__(self):
        # Food categories with nutritional information
        self.food_categories = {
            "fruits": {
                "apple": {"calories": 52, "carbs": 14, "fiber": 2.4, "vitamin_c": 4.6, "sugar": 10},
                "banana": {"calories": 89, "carbs": 23, "fiber": 2.6, "potassium": 358, "sugar": 12},
                "orange": {"calories": 47, "carbs": 12, "fiber": 2.4, "vitamin_c": 53, "sugar": 9},
                "strawberries": {"calories": 32, "carbs": 8, "fiber": 2, "vitamin_c": 59, "sugar": 4.9},
                "grapes": {"calories": 62, "carbs": 16, "fiber": 0.9, "vitamin_c": 3.2, "sugar": 16},
                "watermelon": {"calories": 30, "carbs": 8, "fiber": 0.4, "vitamin_c": 8.1, "sugar": 6},
            },
            "vegetables": {
                "broccoli": {"calories": 34, "carbs": 7, "fiber": 2.6, "vitamin_c": 89, "protein": 3},
                "carrots": {"calories": 41, "carbs": 10, "fiber": 2.8, "vitamin_a": 835, "sugar": 5},
                "spinach": {"calories": 23, "carbs": 4, "fiber": 2.2, "iron": 2.7, "protein": 3},
                "sweet_potato": {"calories": 86, "carbs": 20, "fiber": 3, "vitamin_a": 709, "sugar": 4},
                "tomatoes": {"calories": 18, "carbs": 4, "fiber": 1.2, "vitamin_c": 14, "lycopene": 2.6},
                "bell_peppers": {"calories": 31, "carbs": 7, "fiber": 2.5, "vitamin_c": 190, "sugar": 4},
            },
            "proteins": {
                "chicken_breast": {"calories": 165, "protein": 31, "fat": 3.6, "iron": 0.7},
                "salmon": {"calories": 208, "protein": 20, "fat": 13, "omega_3": 1.8},
                "eggs": {"calories": 155, "protein": 13, "fat": 11, "choline": 147},
                "tofu": {"calories": 76, "protein": 8, "fat": 4.8, "calcium": 350},
                "beans": {"calories": 127, "protein": 8, "carbs": 23, "fiber": 6},
                "greek_yogurt": {"calories": 59, "protein": 10, "carbs": 4, "calcium": 110},
            },
            "grains": {
                "brown_rice": {"calories": 111, "carbs": 23, "fiber": 1.8, "protein": 3},
                "quinoa": {"calories": 120, "carbs": 22, "fiber": 2.8, "protein": 4.4},
                "whole_wheat_bread": {"calories": 69, "carbs": 12, "fiber": 2, "protein": 3.6},
                "oats": {"calories": 68, "carbs": 12, "fiber": 1.7, "protein": 2.4},
                "pasta": {"calories": 131, "carbs": 25, "fiber": 1.8, "protein": 5},
            },
            "dairy": {
                "milk": {"calories": 42, "protein": 3.4, "carbs": 5, "calcium": 113},
                "cheese": {"calories": 113, "protein": 7, "fat": 9, "calcium": 202},
                "yogurt": {"calories": 59, "protein": 10, "carbs": 4, "calcium": 110},
            }
        }
        
        # Age groups and their nutritional needs
        self.age_groups = {
            "toddler": {"age_range": "2-3", "calories": 1000-1400, "protein": 13, "calcium": 700},
            "preschool": {"age_range": "4-5", "calories": 1200-2000, "protein": 19, "calcium": 1000},
            "school_age": {"age_range": "6-11", "calories": 1400-2200, "protein": 19-34, "calcium": 1000},
            "teen": {"age_range": "12-18", "calories": 1800-3200, "protein": 46-52, "calcium": 1300},
        }
        
        # Common nutrition questions and scenarios
        self.question_templates = [
            "What should a {age} year old eat for {meal}?",
            "Is {food} healthy for my {age} year old child?",
            "How can I make sure my {age} year old gets enough {nutrient}?",
            "What are some healthy snacks for a {age} year old?",
            "My child doesn't like {food_category}, what alternatives can I give?",
            "How much {food} should a {age} year old eat per day?",
            "What's a balanced meal plan for a {age} year old?",
            "Is it okay if my {age} year old skips {meal}?",
            "How can I encourage my picky {age} year old to eat vegetables?",
            "What nutrients are most important for a {age} year old's growth?",
        ]

    def generate_meal_recommendation(self, age_group: str, meal_type: str) -> Dict[str, Any]:
        """Generate a balanced meal recommendation"""
        age_info = self.age_groups[age_group]
        
        # Select foods from different categories
        fruit = random.choice(list(self.food_categories["fruits"].keys()))
        vegetable = random.choice(list(self.food_categories["vegetables"].keys()))
        protein = random.choice(list(self.food_categories["proteins"].keys()))
        grain = random.choice(list(self.food_categories["grains"].keys()))
        
        meal = {
            "meal_type": meal_type,
            "age_group": age_group,
            "foods": [fruit, vegetable, protein, grain],
            "portion_sizes": self._calculate_portions(age_group, [fruit, vegetable, protein, grain]),
            "nutritional_benefits": self._explain_benefits([fruit, vegetable, protein, grain]),
            "preparation_tips": self._generate_prep_tips([fruit, vegetable, protein, grain]),
        }
        
        return meal

    def _calculate_portions(self, age_group: str, foods: List[str]) -> Dict[str, str]:
        """Calculate appropriate portion sizes based on age"""
        portion_guides = {
            "toddler": {"fruit": "1/2 cup", "vegetable": "1/4 cup", "protein": "1 oz", "grain": "1/2 slice"},
            "preschool": {"fruit": "1/2 cup", "vegetable": "1/2 cup", "protein": "1.5 oz", "grain": "1 slice"},
            "school_age": {"fruit": "1 cup", "vegetable": "3/4 cup", "protein": "2-3 oz", "grain": "1-2 slices"},
            "teen": {"fruit": "1-1.5 cups", "vegetable": "1 cup", "protein": "3-4 oz", "grain": "2-3 slices"},
        }
        
        portions = {}
        for food in foods:
            for category, items in self.food_categories.items():
                if food in items:
                    if category == "fruits":
                        portions[food] = portion_guides[age_group]["fruit"]
                    elif category == "vegetables":
                        portions[food] = portion_guides[age_group]["vegetable"]
                    elif category == "proteins":
                        portions[food] = portion_guides[age_group]["protein"]
                    elif category == "grains":
                        portions[food] = portion_guides[age_group]["grain"]
                    break
        
        return portions

    def _explain_benefits(self, foods: List[str]) -> Dict[str, str]:
        """Explain nutritional benefits in kid-friendly language"""
        benefits = {}
        benefit_explanations = {
            "vitamin_c": "helps your body fight off germs and keeps you healthy",
            "fiber": "helps your tummy feel good and digest food properly",
            "protein": "helps your muscles grow big and strong",
            "calcium": "makes your bones and teeth super strong",
            "iron": "helps carry oxygen around your body to give you energy",
            "omega_3": "helps your brain work really well",
            "vitamin_a": "helps you see better, especially in the dark",
            "potassium": "helps your heart beat strong and steady",
        }
        
        for food in foods:
            for category, items in self.food_categories.items():
                if food in items:
                    food_nutrients = items[food]
                    food_benefits = []
                    for nutrient, value in food_nutrients.items():
                        if nutrient in benefit_explanations and value > 0:
                            food_benefits.append(f"{nutrient.replace('_', ' ').title()}: {benefit_explanations[nutrient]}")
                    benefits[food] = "; ".join(food_benefits[:2])  # Limit to top 2 benefits
                    break
        
        return benefits

    def _generate_prep_tips(self, foods: List[str]) -> List[str]:
        """Generate kid-friendly preparation tips"""
        tips = [
            "Cut fruits and vegetables into fun shapes using cookie cutters",
            "Let your child help wash the fruits and vegetables",
            "Make colorful rainbow plates with different colored foods",
            "Try dipping vegetables in hummus or yogurt for extra flavor",
            "Make smoothies with fruits and vegetables for a tasty drink",
            "Create food art by arranging foods into pictures or patterns",
            "Use fun plates and utensils to make eating more exciting",
        ]
        return random.sample(tips, 3)

    def generate_qa_pairs(self, num_pairs: int = 1000) -> List[Dict[str, str]]:
        """Generate question-answer pairs for training"""
        qa_pairs = []
        
        for _ in range(num_pairs):
            # Random selections
            age_group = random.choice(list(self.age_groups.keys()))
            age_range = self.age_groups[age_group]["age_range"]
            age = random.choice(age_range.split("-"))
            meal_type = random.choice(["breakfast", "lunch", "dinner", "snack"])
            food_category = random.choice(list(self.food_categories.keys()))
            nutrient = random.choice(["protein", "calcium", "iron", "vitamin C", "fiber"])
            
            # Select question template
            template = random.choice(self.question_templates)
            
            # Generate question
            question = template.format(
                age=age,
                meal=meal_type,
                food=random.choice([item for items in self.food_categories.values() for item in items.keys()]),
                nutrient=nutrient,
                food_category=food_category
            )
            
            # Generate answer based on question type
            if "what should" in question.lower() and "eat for" in question.lower():
                meal_rec = self.generate_meal_recommendation(age_group, meal_type)
                answer = self._create_meal_answer(meal_rec)
            elif "is" in question.lower() and "healthy" in question.lower():
                answer = self._create_health_assessment_answer(question)
            elif "how can i make sure" in question.lower():
                answer = self._create_nutrient_guidance_answer(nutrient, age_group)
            elif "snacks" in question.lower():
                answer = self._create_snack_recommendations(age_group)
            elif "doesn't like" in question.lower():
                answer = self._create_alternative_suggestions(food_category)
            elif "how much" in question.lower():
                answer = self._create_portion_guidance(question, age_group)
            elif "balanced meal plan" in question.lower():
                answer = self._create_meal_plan_answer(age_group)
            elif "skip" in question.lower():
                answer = self._create_meal_importance_answer(meal_type)
            elif "picky" in question.lower():
                answer = self._create_picky_eater_advice()
            elif "nutrients" in question.lower() and "important" in question.lower():
                answer = self._create_essential_nutrients_answer(age_group)
            else:
                answer = self._create_general_nutrition_answer()
            
            qa_pairs.append({
                "question": question,
                "answer": answer,
                "age_group": age_group,
                "category": "nutrition_guidance"
            })
        
        return qa_pairs

    def _create_meal_answer(self, meal_rec: Dict[str, Any]) -> str:
        """Create a detailed meal recommendation answer"""
        foods = meal_rec["foods"]
        portions = meal_rec["portion_sizes"]
        benefits = meal_rec["nutritional_benefits"]
        tips = meal_rec["preparation_tips"]
        
        answer = f"For a {meal_rec['meal_type']}, I recommend:\n\n"
        
        for food in foods:
            answer += f"• {food.replace('_', ' ').title()}: {portions.get(food, '1 serving')}\n"
            if food in benefits:
                answer += f"  Why it's good: {benefits[food]}\n"
        
        answer += f"\n🌟 Fun preparation tips:\n"
        for tip in tips:
            answer += f"• {tip}\n"
        
        answer += "\nThis combination provides a good balance of nutrients to help your child grow strong and healthy!"
        
        return answer

    def _create_health_assessment_answer(self, question: str) -> str:
        """Create health assessment for specific foods"""
        # Extract food from question (simplified)
        foods = [item for items in self.food_categories.values() for item in items.keys()]
        mentioned_food = None
        for food in foods:
            if food.replace('_', ' ') in question.lower():
                mentioned_food = food
                break
        
        if mentioned_food:
            # Find the food's category and benefits
            for category, items in self.food_categories.items():
                if mentioned_food in items:
                    nutrients = items[mentioned_food]
                    answer = f"Yes, {mentioned_food.replace('_', ' ')} is very healthy for children! "
                    answer += f"It's a great source of "
                    
                    nutrient_benefits = []
                    if "vitamin_c" in nutrients:
                        nutrient_benefits.append("vitamin C (boosts immune system)")
                    if "protein" in nutrients:
                        nutrient_benefits.append("protein (builds strong muscles)")
                    if "fiber" in nutrients:
                        nutrient_benefits.append("fiber (helps digestion)")
                    if "calcium" in nutrients:
                        nutrient_benefits.append("calcium (strengthens bones)")
                    
                    if nutrient_benefits:
                        answer += ", ".join(nutrient_benefits) + ". "
                    
                    answer += f"You can serve it as part of a balanced meal or healthy snack!"
                    return answer
        
        return "Most whole foods like fruits, vegetables, lean proteins, and whole grains are healthy choices for children when served in appropriate portions!"

    def _create_nutrient_guidance_answer(self, nutrient: str, age_group: str) -> str:
        """Create guidance for specific nutrients"""
        guidance = {
            "protein": {
                "sources": ["chicken", "fish", "eggs", "beans", "yogurt", "cheese"],
                "importance": "building strong muscles and growing properly",
                "tips": "Include a protein source at each meal"
            },
            "calcium": {
                "sources": ["milk", "cheese", "yogurt", "leafy greens", "fortified foods"],
                "importance": "building strong bones and teeth",
                "tips": "Aim for 2-3 dairy servings per day"
            },
            "iron": {
                "sources": ["lean meat", "spinach", "beans", "fortified cereals"],
                "importance": "carrying oxygen in the blood and preventing tiredness",
                "tips": "Pair iron-rich foods with vitamin C foods like oranges"
            },
            "vitamin C": {
                "sources": ["oranges", "strawberries", "bell peppers", "broccoli"],
                "importance": "fighting infections and healing cuts",
                "tips": "Include colorful fruits and vegetables daily"
            },
            "fiber": {
                "sources": ["whole grains", "fruits", "vegetables", "beans"],
                "importance": "healthy digestion and feeling full",
                "tips": "Choose whole grain options when possible"
            }
        }
        
        if nutrient.lower() in guidance:
            info = guidance[nutrient.lower()]
            answer = f"To ensure your child gets enough {nutrient}, focus on these foods: "
            answer += ", ".join(info["sources"]) + ". "
            answer += f"{nutrient.title()} is important for {info['importance']}. "
            answer += f"💡 Tip: {info['tips']}"
            return answer
        
        return f"A balanced diet with variety from all food groups will help ensure your child gets enough {nutrient}."

    def _create_snack_recommendations(self, age_group: str) -> str:
        """Create healthy snack recommendations"""
        snacks = [
            "Apple slices with peanut butter",
            "Carrot sticks with hummus",
            "Greek yogurt with berries",
            "Whole grain crackers with cheese",
            "Banana with a small handful of nuts",
            "Homemade trail mix with dried fruit",
            "Cucumber slices with yogurt dip",
            "Whole grain toast with avocado"
        ]
        
        selected_snacks = random.sample(snacks, 4)
        answer = "Here are some healthy snack ideas:\n\n"
        for snack in selected_snacks:
            answer += f"• {snack}\n"
        
        answer += "\n🌟 Remember: Snacks should be smaller portions that bridge the gap between meals!"
        return answer

    def _create_alternative_suggestions(self, food_category: str) -> str:
        """Create alternatives for disliked food categories"""
        alternatives = {
            "vegetables": [
                "Try different cooking methods (roasted, steamed, raw with dip)",
                "Mix vegetables into favorite foods like pasta or pizza",
                "Make vegetable smoothies with fruits",
                "Start with sweeter vegetables like carrots or bell peppers",
                "Let your child help choose and prepare vegetables"
            ],
            "fruits": [
                "Try different textures (frozen, dried, fresh)",
                "Make fruit kabobs or fun shapes",
                "Blend into smoothies",
                "Start with naturally sweeter fruits",
                "Pair with yogurt or nut butter"
            ]
        }
        
        if food_category in alternatives:
            suggestions = alternatives[food_category]
            answer = f"If your child doesn't like {food_category}, try these strategies:\n\n"
            for suggestion in suggestions:
                answer += f"• {suggestion}\n"
            answer += "\n💡 Remember: It can take 10+ exposures to a new food before a child accepts it!"
        else:
            answer = "Try different preparations, involve your child in cooking, and be patient - it takes time for children to accept new foods!"
        
        return answer

    def _create_portion_guidance(self, question: str, age_group: str) -> str:
        """Create portion size guidance"""
        portion_guides = {
            "toddler": "Toddlers (2-3 years) need smaller portions - about 1/4 to 1/2 of adult portions",
            "preschool": "Preschoolers (4-5 years) need about 1/2 to 3/4 of adult portions",
            "school_age": "School-age children (6-11 years) need about 3/4 to full adult portions",
            "teen": "Teens (12-18 years) often need full adult portions or more due to growth spurts"
        }
        
        answer = portion_guides[age_group] + ". "
        answer += "Remember, children's appetites vary day to day, and that's normal! "
        answer += "Offer appropriate portions but let your child's hunger cues guide how much they eat."
        
        return answer

    def _create_meal_plan_answer(self, age_group: str) -> str:
        """Create a balanced meal plan"""
        answer = f"A balanced daily meal plan for a {age_group} should include:\n\n"
        answer += "🌅 Breakfast: Whole grain + protein + fruit\n"
        answer += "🥪 Lunch: Protein + vegetable + grain + fruit\n"
        answer += "🍽️ Dinner: Protein + 2 vegetables + grain\n"
        answer += "🥜 Snacks: 2 healthy snacks combining different food groups\n\n"
        answer += "💧 Don't forget: Plenty of water throughout the day!\n"
        answer += "🎯 Goal: Include all food groups daily for complete nutrition."
        
        return answer

    def _create_meal_importance_answer(self, meal_type: str) -> str:
        """Explain the importance of not skipping meals"""
        meal_importance = {
            "breakfast": "Breakfast gives your child energy to start the day and helps with concentration at school",
            "lunch": "Lunch provides midday energy and nutrients needed for afternoon activities",
            "dinner": "Dinner helps restore energy after a busy day and provides nutrients for overnight growth"
        }
        
        answer = f"It's best not to skip {meal_type}. "
        if meal_type in meal_importance:
            answer += meal_importance[meal_type] + ". "
        
        answer += "If your child isn't hungry, try offering smaller portions or ask if they're feeling okay. "
        answer += "Regular meal times help establish healthy eating patterns!"
        
        return answer

    def _create_picky_eater_advice(self) -> str:
        """Create advice for picky eaters"""
        tips = [
            "Keep offering new foods - it takes multiple exposures",
            "Let your child help with grocery shopping and cooking",
            "Make mealtimes positive and pressure-free",
            "Serve new foods alongside familiar favorites",
            "Be a good role model by eating variety yourself",
            "Try different preparations of the same food",
            "Make food fun with colors, shapes, and presentations"
        ]
        
        answer = "Dealing with picky eating is common! Here are some strategies:\n\n"
        for tip in tips:
            answer += f"• {tip}\n"
        
        answer += "\n💡 Remember: Your job is to offer variety, your child's job is to decide how much to eat!"
        
        return answer

    def _create_essential_nutrients_answer(self, age_group: str) -> str:
        """Create information about essential nutrients for growth"""
        nutrients = {
            "Protein": "for growing muscles and tissues",
            "Calcium": "for strong bones and teeth",
            "Iron": "for healthy blood and energy",
            "Vitamin D": "for bone health and immune system",
            "Vitamin C": "for immune system and healing",
            "Healthy fats": "for brain development",
            "Fiber": "for healthy digestion"
        }
        
        answer = f"The most important nutrients for a {age_group}'s growth include:\n\n"
        for nutrient, purpose in nutrients.items():
            answer += f"• {nutrient}: {purpose}\n"
        
        answer += "\n🌟 A varied diet with foods from all groups usually provides these nutrients naturally!"
        
        return answer

    def _create_general_nutrition_answer(self) -> str:
        """Create a general nutrition answer"""
        return ("Focus on offering a variety of foods from all food groups: fruits, vegetables, "
                "whole grains, lean proteins, and dairy. Make mealtimes positive, involve your "
                "child in food preparation, and remember that developing healthy eating habits "
                "takes time and patience!")

    def save_dataset(self, qa_pairs: List[Dict[str, str]], filename: str = "kids_nutrition_dataset.json"):
        """Save the dataset to a JSON file"""
        with open(filename, 'w') as f:
            json.dump(qa_pairs, f, indent=2)
        
        # Also create a CSV version for easier viewing
        df = pd.DataFrame(qa_pairs)
        df.to_csv(filename.replace('.json', '.csv'), index=False)
        
        print(f"Dataset saved to {filename} and {filename.replace('.json', '.csv')}")
        print(f"Total Q&A pairs: {len(qa_pairs)}")

if __name__ == "__main__":
    generator = NutritionDatasetGenerator()
    
    # Generate dataset
    print("Generating nutrition dataset for kids...")
    qa_pairs = generator.generate_qa_pairs(num_pairs=2000)
    
    # Save dataset
    generator.save_dataset(qa_pairs, "kids_nutrition_dataset.json")
    
    # Print some examples
    print("\nSample Q&A pairs:")
    for i, pair in enumerate(qa_pairs[:3]):
        print(f"\n--- Example {i+1} ---")
        print(f"Q: {pair['question']}")
        print(f"A: {pair['answer'][:200]}...")