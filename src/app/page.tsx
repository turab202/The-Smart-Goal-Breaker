"use client";

import React, { useState, useEffect } from "react";
import { GoalInput } from "./components/GoalInput";
import { GoalResult } from "./components/GoalResult";
import { ApiClient } from "./lib/api-client";
import { GoalBreakdown, LoadingState } from "./types";
import {
  Terminal,
  Github,
  Database,
  Server,
  Layers,
  Command,
} from "lucide-react";
import { Button } from "./components/ui/button";

export default function Home() {
  const [goals, setGoals] = useState<GoalBreakdown[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.IDLE
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiClient.getGoals().then(setGoals);
  }, []);

  const handleCreateGoal = async (vagueGoal: string) => {
    setLoadingState(LoadingState.GENERATING);
    setError(null);

    try {
      const savedGoal = await ApiClient.createGoal(vagueGoal);
      setGoals((prev) => [savedGoal, ...prev]);
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
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#FAFAFA] selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
              <Command className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Goal<span className="text-orange-600">Breaker</span>
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              System Operational
            </div>

            <Button size="sm" variant="ghost" className="text-slate-600 hover:text-orange-600">
              <Github className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 w-full">
        {/* Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-100/40 blur-[120px] rounded-full mix-blend-multiply opacity-70"></div>
          <div className="absolute top-[20%] right-[10%] w-[600px] h-[400px] bg-blue-100/30 blur-[100px] rounded-full mix-blend-multiply opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 pt-16 pb-24 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-1.5 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur-sm hover:bg-orange-100 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Powered by Gemini 2.5 Flash
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Turn Ambition Into <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
                Actionable Plans.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              A sovereign AI agent that deconstructs complex goals into
              <span className="text-slate-900 font-semibold"> 5 high-impact execution steps</span>.
            </p>
          </div>

          {/* Input */}
          <div className="relative z-20 mb-24">
            <GoalInput
              onSubmit={handleCreateGoal}
              isLoading={loadingState === LoadingState.GENERATING}
            />
          </div>

          {/* Architecture */}
          <div className="mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-slate-200"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Architecture
              </span>
              <div className="h-px w-12 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Next.js Frontend</h3>
                <p className="text-sm text-slate-500">
                  React Server Components with Tailwind styling for optimal performance.
                </p>
              </div>

              {/* Backend */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Server className="h-24 w-24" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Python FastAPI</h3>
                <p className="text-sm text-slate-500">
                  Async backend architecture ready for high-concurrency requests.
                </p>
              </div>

              {/* DB */}
              <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">PostgreSQL</h3>
                <p className="text-sm text-slate-500">
                  Relational data persistence for structured goal tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-8">
            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Your Roadmap
                </h2>
                <p className="text-slate-500 mt-1">Generated execution plans</p>
              </div>

              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {goals.length}
              </span>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-100 text-sm font-medium flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}

            {goals.length === 0 ? (
              <div className="py-24 text-center">
                <div className="inline-flex h-16 w-16 rounded-2xl bg-slate-50 items-center justify-center mb-6">
                  <Layers className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Workspace Empty</h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-2">
                  Enter a vague goal above to trigger the AI agent and generate your first plan.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 animate-fade-in">
                {goals.map((goal) => (
                  <GoalResult key={goal.id} goal={goal} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <p className="text-sm font-medium text-slate-500 mb-6">
            Engineered for <span className="text-slate-900">Peak Performance</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Gemini 2.5 Flash</span>
            <span>Next.js 14</span>
            <span>Tailwind CSS</span>
            <span>FastAPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
