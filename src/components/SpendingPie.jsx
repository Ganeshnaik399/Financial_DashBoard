import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useFinanceStore from '../store/Usefinance.js' ;

export default function SpendingPie() {
  // Pull categories from Zustand store
  const categories = useFinanceStore((state) => state.categories);

  // Calculate the total sum of all spending categories
  const totalSpent = categories.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
      <h3 className="font-bold text-center mb-6">Spending Breakdown</h3>
      
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={categories} 
              innerRadius={60} 
              outerRadius={80} 
              paddingAngle={8} 
              dataKey="value"
              stroke="none"
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Dynamic Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-800">
            ₹{totalSpent.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-bold">Total Spent</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {categories.map((item) => {
          // Calculate percentage dynamically based on the total
          const percentage = totalSpent > 0 
            ? ((item.value / totalSpent) * 100).toFixed(0) 
            : 0;

          return (
            <div key={item.name} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ background: item.color }} 
                />
                <span className="text-slate-500 font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-700">{percentage}%</span>
                <p className="text-[10px] text-slate-400">
                  ₹{item.value.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}