from pydantic import BaseModel
from typing import List, Optional

class TaskSchema(BaseModel):
    step: int
    title: str
    description: str
    estimatedTime: str

class GoalCreate(BaseModel):
    goal: str

class GoalBreakdownResponse(BaseModel):
    id: str
    originalGoal: str
    refinedGoal: str
    complexityScore: int
    complexityReasoning: str
    tasks: List[TaskSchema]
    createdAt: Optional[str] = None