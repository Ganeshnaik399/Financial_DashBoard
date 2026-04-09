import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Utensils, Home, Tv, LayoutGrid } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js';

// Helper to map icons to category names
const getIcon = (name) => {
  switch (name) {
    case 'Food & Dining': return <Utensils size={16} />;
    case 'Housing': return <Home size={16} />;
    case 'Entertainment': return <Tv size={16} />;
    default: return <LayoutGrid size={16} />;
  }
};

export default function SpendingBreakdown() {
  // Pull categories from Zustand
  const categories = useFinanceStore((state) => state.categories);

  // Calculate totals for the center display
  const totalSpending = categories.reduce((acc, curr) => acc + curr.value, 0);
  const highestSpending = categories.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current, categories[0]
  );

  const percentage = totalSpending > 0 
    ? Math.round((highestSpending.value / totalSpending) * 100) 
    : 0;

  return (
    <div className="bg-white p-8 rounded-2rem border border-slate-100 shadow-sm">
      <h3 className="font-bold mb-6">Highest Spending</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Gauge Chart Section */}
        <div className="relative h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Dynamic Center Text */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">
              {highestSpending.name}
            </p>
            <p className="text-2xl font-bold text-slate-800">
              ₹{highestSpending.value.toLocaleString()}
            </p>
            <p className="text-[10px] font-bold text-indigo-500">
              {percentage}% of total
            </p>
          </div>
        </div>

        {/* Categories List Section */}
        <div className="space-y-5">
          {categories.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-500">
                  {getIcon(item.name)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ background: item.color }} 
                    />
                    <span className="text-[10px] text-slate-400 font-medium">Monthly</span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-800">
                ₹{item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}