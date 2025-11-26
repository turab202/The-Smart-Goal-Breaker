"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ComplexityChartProps {
  score: number;
}

export const ComplexityChart: React.FC<ComplexityChartProps> = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 10 - score },
  ];

  const getColor = (s: number) => {
    if (s <= 4) return '#f97316';
    if (s <= 7) return '#ea580c';
    return '#c2410c';
  };

  const activeColor = getColor(score);

  return (
    <div className="relative h-20 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={28}
            outerRadius={38}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell key="score" fill={activeColor} />
            <Cell key="rest" fill="#fed7aa" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-lg font-bold text-orange-950">{score}</span>
        <span className="text-[8px] font-bold text-orange-600/60 uppercase">Diff</span>
      </div>
    </div>
  );
};