"use client";

import React, { useState } from 'react';
import { Send, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  isLoading: boolean;
}

export const GoalInput: React.FC<GoalInputProps> = ({ onSubmit, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="p-2 shadow-2xl shadow-orange-500/10 border-white/40 bg-white/60 backdrop-blur-xl rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg bg-orange-50 text-orange-500 transition-colors group-focus-within:bg-orange-100 group-focus-within:text-orange-600">
               <Sparkles className="h-4 w-4" />
            </div>
            <Input
              className="pl-14 h-16 text-lg bg-transparent border-transparent shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 text-gray-800 font-medium"
              placeholder="e.g. Launch a SaaS MVP in 30 days..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            disabled={!value.trim() || isLoading}
            isLoading={isLoading}
            className="h-16 px-8 text-base font-bold tracking-wide rounded-xl shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {!isLoading && (
              <span className="flex items-center gap-2">
                Break It Down <ArrowRight className="h-5 w-5 opacity-80" />
              </span>
            )}
          </Button>
        </form>
      </Card>
      
      {/* Helper text below input */}
      <div className="mt-4 flex justify-center gap-6 text-xs font-medium text-muted-foreground/60">
        <span className="flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            AI Analysis
        </span>
        <span className="flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            Complexity Scoring
        </span>
        <span className="flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            Actionable Steps
        </span>
      </div>
    </div>
  );
};