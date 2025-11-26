import { GoalBreakdown } from "../types";

// Use your Render backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://the-smart-goal-breaker.onrender.com";

export const ApiClient = {
  createGoal: async (vagueGoal: string): Promise<GoalBreakdown> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/goals/generate`, {  // Fixed URL
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal: vagueGoal })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Backend failed: ${error}`);
    }
    
    return await response.json();
  },

  getGoals: async (): Promise<GoalBreakdown[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/goals`, {  // Fixed URL
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch goals');
    }
    
    return await response.json();
  },

  deleteGoal: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/goals/${id}`, {  // Fixed URL
      method: 'DELETE' 
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }
  }
};