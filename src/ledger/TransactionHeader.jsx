import React from 'react';
import Usefinance from '../store/Usefinance.js';

export default function TransactionHeader() {
  const monthlyTrends = Usefinance((state) => state.monthlyTrends);

  // 1. Get current and previous month data
  const currentMonth = monthlyTrends[monthlyTrends.length - 1] || { spending: 0 };
  const prevMonth = monthlyTrends[monthlyTrends.length - 2] || { spending: 0 };

  // 2. Calculate percentage change
  const calculateChange = () => {
    if (prevMonth.spending === 0) return 0;
    const diff = ((currentMonth.spending - prevMonth.spending) / prevMonth.spending) * 100;
    return diff.toFixed(0);
  };

  const percentChange = calculateChange();
  const isIncrease = percentChange > 0;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Ledger Management</h1>
        <p className="text-slate-500 text-sm mt-1">Verify and monitor your historical transactional flow.</p>
      </div>
      
      <div className="mt-4 md:mt-0 bg-black p-3 rounded-xl text-right">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
          Monthly Flow (Expenses)
        </p>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-800">
            ₹ {currentMonth.spending.toLocaleString('en-IN')}
          </h2>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-md mt-1 ${
            isIncrease 
              ? 'bg-rose-50 text-emerald-600' 
              : 'bg-emerald-50 text-rose-600'
          }`}>
            {isIncrease ? '+' : ''}{percentChange}%
          </span>
        </div>
      </div>
    </div>
  );
}