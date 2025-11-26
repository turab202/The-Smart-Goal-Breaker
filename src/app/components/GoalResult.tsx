"use client";

import React from 'react';
import { GoalBreakdown } from '../types';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { ComplexityChart } from './ComplexityChart';
import { Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface GoalResultProps {
  goal: GoalBreakdown;
  onDelete: (id: string) => void;
}

export const GoalResult: React.FC<GoalResultProps> = ({ goal, onDelete }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      <Card className="relative overflow-hidden border-border/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        
        <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-orange-100/50 bg-gradient-to-b from-orange-50/50 to-transparent p-6 sm:p-8">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700 uppercase tracking-wide">
                  Goal Analysis
                </span>
                <div className="h-1 w-1 rounded-full bg-orange-300"></div>
                <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px] sm:max-w-md">
                  Original: "{goal.originalGoal}"
                </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {goal.refinedGoal}
            </h3>
            
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {goal.complexityReasoning}
            </p>
          </div>
          
          <div className="flex items-center gap-6 self-start lg:self-center bg-white/50 p-4 rounded-2xl border border-orange-100/50 shadow-sm">
              <div className="text-center pr-6 border-r border-orange-200/50">
                  <ComplexityChart score={goal.complexityScore} />
              </div>
              <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(goal.id)}
                  className="text-muted-foreground hover:text-red-600 hover:bg-red-50 h-10 w-10 rounded-full"
                  title="Delete Plan"
              >
                  <Trash2 className="h-5 w-5" />
              </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-8">
          <div className="relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-orange-300 via-orange-100 to-transparent hidden sm:block"></div>

            <div className="space-y-8">
              {goal.tasks.map((task, index) => (
                <div key={index} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 z-10">
                    
                    <div className="flex-none flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                      <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border-[3px] shadow-sm transition-all duration-300 z-10",
                          index === 0 
                            ? "bg-orange-600 border-orange-100 text-white shadow-orange-200" 
                            : "bg-white border-orange-100 text-orange-600"
                      )}>
                          <span className="font-bold text-sm">{task.step}</span>
                      </div>
                      <div className="sm:hidden h-px flex-1 bg-orange-100"></div>
                    </div>

                    <div className="flex-1 group/card">
                        <div className={cn(
                          "rounded-xl border p-5 transition-all duration-200",
                          index === 0 
                            ? "bg-gradient-to-br from-orange-50 to-white border-orange-200 shadow-sm" 
                            : "bg-white border-slate-100 hover:border-orange-100 hover:shadow-md"
                        )}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                <h4 className={cn(
                                  "text-lg font-bold flex items-center gap-2",
                                  index === 0 ? "text-orange-900" : "text-gray-800"
                                )}>
                                    {task.title}
                                    {index === 0 && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-200 text-orange-800 uppercase tracking-wider">
                                        Priority
                                      </span>
                                    )}
                                </h4>
                                <div className="flex items-center text-xs font-semibold text-muted-foreground bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-fit">
                                    <Clock className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
                                    {task.estimatedTime}
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {task.description}
                            </p>
                        </div>
                    </div>
                </div>
              ))}
            </div>

            <div className="relative flex items-center gap-6 pt-8 mt-2">
                <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 border-[3px] border-emerald-100 shadow-sm z-10">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 rounded-xl bg-emerald-50/50 border border-emerald-100/50 p-4 flex items-center gap-3">
                    <div className="sm:hidden h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-emerald-800">Mission Complete</span>
                      <span className="text-xs text-emerald-600/80">Execute these steps to achieve your goal.</span>
                    </div>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};