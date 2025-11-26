import google.generativeai as genai
import json
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def break_down_goal(self, vague_goal: str) -> Dict[str, Any]:
        prompt = f"""
        Analyze this goal and break it down into exactly 5 actionable steps. Return ONLY valid JSON.

        Goal: "{vague_goal}"

        Required JSON structure:
        {{
            "refinedGoal": "A concrete, professional version",
            "complexityScore": 7,
            "complexityReasoning": "Brief explanation",
            "tasks": [
                {{
                    "step": 1,
                    "title": "Actionable step title",
                    "description": "Detailed description",
                    "estimatedTime": "e.g., 1-2 weeks"
                }}
            ]
        }}

        Rules:
        - complexityScore: 1-10 integer
        - Exactly 5 tasks, sequentially numbered
        - Tasks must be specific and actionable
        - estimatedTime should be realistic
        """

        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean response
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            result = json.loads(response_text)
            
            # Validate structure
            required_fields = ["refinedGoal", "complexityScore", "complexityReasoning", "tasks"]
            for field in required_fields:
                if field not in result:
                    raise ValueError(f"Missing field: {field}")
            
            if len(result["tasks"]) != 5:
                raise ValueError(f"Expected 5 tasks, got {len(result['tasks'])}")
            
            return result
            
        except Exception as e:
            raise Exception(f"AI processing failed: {str(e)}")