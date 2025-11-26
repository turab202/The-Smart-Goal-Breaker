"use client";

import React, { useState, useEffect } from 'react';
import { GoalInput } from './components/GoalInput';
import { GoalResult } from './components/GoalResult';
import { ApiClient } from './lib/api-client';
import { GoalBreakdown, LoadingState } from './types';
import { Terminal, Github, Database, Server, Layers, Command } from 'lucide-react';
import { Button } from './components/ui/button';

export default function Home() {
  const [goals, setGoals] = useState<GoalBreakdown[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiClient.getGoals().then(setGoals);
  }, []);

  const handleCreateGoal = async (vagueGoal: string) => {
    setLoadingState(LoadingState.GENERATING);
    setError(null);
    try {
      const savedGoal = await ApiClient.createGoal(vagueGoal);
      setGoals(prev => [savedGoal, ...prev]);
      setLoadingState(LoadingState.SUCCESS);
      setTimeout(() => setLoadingState(LoadingState.IDLE), 1000);
    } catch (err) {
      console.error(err);
      setError("System Error: Could not generate plan. Please try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleDelete = async (id: string) => {
    await ApiClient.deleteGoal(id);
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#FAFAFA] selection:bg-orange-100 selection:text-orange-900">
      {/* Your existing JSX from App.tsx goes here */}
      {/* I've shortened this for brevity - use your existing JSX structure */}
      
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
        {/* Header content from your original App.tsx */}
      </header>

      <main className="flex-1 w-full">
        {/* Main content from your original App.tsx */}
      </main>

      <footer>
        {/* Footer content from your original App.tsx */}
      </footer>
    </div>
  );
}