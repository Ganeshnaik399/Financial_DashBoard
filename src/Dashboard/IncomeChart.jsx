import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import useFinanceStore from '../store/Usefinance.js';

export default function IncomeChart() {
  // Pulling the monthlyTrends from our Zustand store
  const monthlyTrends = useFinanceStore((state) => state.monthlyTrends);

  return (
    <div className="bg-white p-8 rounded-2rem border border-slate-100 shadow-sm">
      <div className="mb-8">
        <h3 className="font-bold text-lg">Income vs. Expenses</h3>
        <p className="text-xs text-slate-400 font-medium">
          {monthlyTrends.length}-month trend analysis
        </p>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyTrends}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            {/* Note: Using 'spending' to match the store. 
               If you prefer 'expense', rename the key in data.js 
            */}
            <Bar 
              dataKey="income" 
              stackId="a" 
              fill="#0f0f0f" // emerald-500 for a more modern look
              barSize={35} 
            />
            <Bar 
              dataKey="spending" 
              stackId="a" 
              fill="#ed1556" // red-400
              radius={[10, 10, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Optional: Simple Legend */}
      <div className="flex gap-4 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Expenses</span>
        </div>
      </div>
    </div>
  );
}