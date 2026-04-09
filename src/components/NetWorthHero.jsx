import React from 'react';
import { Download, Share2 } from 'lucide-react';
import Finance from '../store/Usefinance.js';

export default function NetWorthHero() {
  const monthlyTrends = Finance((state) => state.monthlyTrends);

  //  Get the current (latest) and starting (first) net worth from the trend data
  const latestData = monthlyTrends[monthlyTrends.length - 1] || { netWorth: 0 };
  const startingData = monthlyTrends[0] || { netWorth: 0 };

  // 2. Calculate growth percentage
  const calculateGrowth = () => {
    if (startingData.netWorth === 0) return 0;
    const growth = ((latestData.netWorth - startingData.netWorth) / startingData.netWorth) * 100;
    return growth.toFixed(1);
  };

  const ytdGrowth = calculateGrowth();
  const isPositive = ytdGrowth >= 0;

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Total Net Worth
        </span>
        <div className="flex items-baseline gap-3 mt-1">
          <h2 className="text-4xl font-bold text-slate-800">
            ₹{latestData.netWorth.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <span className={`text-sm font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? '+' : ''}{ytdGrowth}% this period
          </span>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6 md:mt-0 c">
        <button className="flex items-center gap-2 bg-[#2D2D39] text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition cursor-pointer ">
          <Download size={18} /> Download Report
        </button>
        <button className="p-2.5 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}