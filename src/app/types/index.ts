export enum LoadingState {
  IDLE = "idle",
  GENERATING = "generating",
  SUCCESS = "success",
  ERROR = "error",
}

export interface Task {
  step: number;
  title: string;
  description: string;
  estimatedTime: string;
}

export interface GoalBreakdown {
  id: string;
  originalGoal: string;
  refinedGoal: string;
  complexityScore: number;
  complexityReasoning: string;
  tasks: Task[];
  createdAt: string;
}