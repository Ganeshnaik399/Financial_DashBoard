import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TransactionPagination() {
  const pageBtnClass = "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all";
  const activeClass = "bg-[#1E1E2D] text-white shadow-md";
  const inactiveClass = "text-slate-400 hover:bg-slate-100 hover:text-slate-600";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 bg-white border-t border-slate-50">
      
      {/* Results Count */}
      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-4 sm:mb-0">
        Showing <span className="text-slate-800">1-4</span> of 128 transactions
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        <button className={`${pageBtnClass} ${inactiveClass} mr-2`}>
          <ChevronLeft size={16} />
        </button>

        <button className={`${pageBtnClass} ${activeClass}`}>1</button>
        <button className={`${pageBtnClass} ${inactiveClass}`}>2</button>
        <button className={`${pageBtnClass} ${inactiveClass}`}>3</button>
        
        <span className="px-2 text-slate-300">...</span>
        
        <button className={`${pageBtnClass} ${inactiveClass}`}>12</button>

        <button className={`${pageBtnClass} ${inactiveClass} ml-2`}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}