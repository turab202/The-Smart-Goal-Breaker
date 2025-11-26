from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os

from .database import get_db, engine
from . import models
from .schemas import GoalCreate, GoalBreakdownResponse
from .services.gemini_service import GeminiService

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Goal Breaker API",
    description="AI-powered goal breakdown service",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now, you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
gemini_service = GeminiService()

@app.get("/")
async def root():
    return {"message": "Smart Goal Breaker API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/v1/goals", response_model=List[GoalBreakdownResponse])
async def get_goals(db: Session = Depends(get_db)):
    try:
        goals = db.query(models.GoalBreakdown).order_by(models.GoalBreakdown.created_at.desc()).all()
        return [goal.to_dict() for goal in goals]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
@app.post("/api/v1/goals/generate", response_model=GoalBreakdownResponse)
async def create_goal(goal_data: GoalCreate, db: Session = Depends(get_db)):
    try:
        # Generate breakdown using Gemini
        ai_result = gemini_service.break_down_goal(goal_data.goal)
        
        # Create database record
        db_goal = models.GoalBreakdown(
            original_goal=goal_data.goal,
            refined_goal=ai_result["refinedGoal"],
            complexity_score=ai_result["complexityScore"],
            complexity_reasoning=ai_result["complexityReasoning"],
            tasks=ai_result["tasks"]  # This now matches the schema
        )
        
        db.add(db_goal)
        db.commit()
        db.refresh(db_goal)
        
        return db_goal.to_dict()
        
    except Exception as e:
        db.rollback()
        # Provide more specific error messages
        if "AI processing failed" in str(e):
            raise HTTPException(status_code=422, detail=f"Goal analysis failed: {str(e)}")
        elif "GEMINI_API_KEY" in str(e):
            raise HTTPException(status_code=500, detail="AI service configuration error")
        else:
            raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
            
@app.post("/api/v1/goals/generate", response_model=GoalBreakdownResponse)
async def create_goal(goal_data: GoalCreate, db: Session = Depends(get_db)):
    try:
        # Generate breakdown using Gemini
        ai_result = gemini_service.break_down_goal(goal_data.goal)
        
        # Create database record
        db_goal = models.GoalBreakdown(
            original_goal=goal_data.goal,
            refined_goal=ai_result["refinedGoal"],
            complexity_score=ai_result["complexityScore"],
            complexity_reasoning=ai_result["complexityReasoning"],
            tasks=ai_result["tasks"]  # This should match TaskSchema directly
        )
        
        db.add(db_goal)
        db.commit()
        db.refresh(db_goal)
        
        return db_goal.to_dict()
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/v1/goals/{goal_id}")
async def delete_goal(goal_id: str, db: Session = Depends(get_db)):
    try:
        goal = db.query(models.GoalBreakdown).filter(models.GoalBreakdown.id == goal_id).first()
        
        if not goal:
            raise HTTPException(status_code=404, detail="Goal not found")
        
        db.delete(goal)
        db.commit()
        
        return {"message": "Goal deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)