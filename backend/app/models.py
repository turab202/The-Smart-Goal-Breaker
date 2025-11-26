from sqlalchemy import Column, String, Integer, DateTime, JSON, Text
from sqlalchemy.sql import func
from .database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class GoalBreakdown(Base):
    __tablename__ = "goal_breakdowns"

    id = Column(String, primary_key=True, default=generate_uuid)
    original_goal = Column(Text, nullable=False)
    refined_goal = Column(Text, nullable=False)
    complexity_score = Column(Integer, nullable=False)
    complexity_reasoning = Column(Text, nullable=False)
    tasks = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "originalGoal": self.original_goal,
            "refinedGoal": self.refined_goal,
            "complexityScore": self.complexity_score,
            "complexityReasoning": self.complexity_reasoning,
            "tasks": self.tasks,  # This now matches TaskSchema
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }