import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js';

const Item = ({ title, date, amount, type }) => {
  const isPos = type === 'income' || amount > 0;
  
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
          {isPos ? <Zap size={18} /> : <ShoppingBag size={18} />}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="text-xs text-slate-400">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${isPos ? 'text-emerald-500' : 'text-rose-600'}`}>
          {isPos ? `+₹${Math.abs(amount).toLocaleString()}` : `-₹${Math.abs(amount).toLocaleString()}`}
        </p>
        <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">
          Completed
        </span>
      </div>
    </div>
  );
};

export default function TransectionList() {
  // Access the transactions array from Zustand
  const transactions = useFinanceStore((state) => state.transactions);

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold">Recent Transactions</h3>
        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((tx) => (
            <Item 
              key={tx.id} 
              title={tx.description} 
              date={tx.date} 
              amount={tx.amount} 
              type={tx.type} 
            />
          ))
        ) : (
          <p className="text-center text-slate-400 text-sm">No recent transactions found.</p>
        )}
      </div>
    </div>
  );
}