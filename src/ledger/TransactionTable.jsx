import React from 'react';
import useFinanceStore from '../store/Usefinance.js';

const Row = ({ tx }) => {
  const isPos = tx.type === 'income' || tx.amount > 0;
  const formattedAmount = `${isPos ? '+' : '-'}₹${Math.abs(tx.amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition group">
      <td className="py-6 px-8 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
        {tx.date} <br/> 
        <span className="font-medium text-slate-300">{tx.time}</span>
      </td>
      <td className="py-6 px-4">
        <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
          {tx.category}
        </span>
      </td>
      <td className="py-6 px-4">
        <p className="text-sm font-bold text-slate-800">{tx.description}</p>
        <p className="text-[11px] text-slate-400">{tx.status === 'PENDING' ? 'Awaiting Verification' : 'Cleared'}</p>
      </td>
      <td className={`py-6 px-4 text-sm font-bold ${isPos ? 'text-emerald-500' : 'text-rose-400'}`}>
        {formattedAmount}
      </td>
      <td className="py-6 px-8">
        <div className="flex items-center justify-end gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'PENDING' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
            {tx.status}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default function TransactionTable() {
  // 1. Pull both transactions and the active filter from Zustand
  const transactions = useFinanceStore((state) => state.transactions) || [];
  const activeFilter = useFinanceStore((state) => state.activeFilter) || 'All Categories';

  // 2. Apply filtering and sorting logic
  const getProcessedData = () => {
    let data = [...transactions];

    // Filter by Category
    if (activeFilter !== 'All Categories' && !activeFilter.includes('High') && !activeFilter.includes('First')) {
        // If it's "Income", we check the type, otherwise check the category name
        if (activeFilter === 'Income') {
            data = data.filter(t => t.type === 'income');
        } else {
            data = data.filter(t => t.category === activeFilter);
        }
    }

    // Sort the results
    switch (activeFilter) {
      case 'Ascending (Low to High)':
        return data.sort((a, b) => a.amount - b.amount);
      case 'Descending (High to Low)':
        return data.sort((a, b) => b.amount - a.amount);
      case 'Newest First':
        return data.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'Oldest First':
        return data.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return data;
    }
  };

  const filteredTransactions = getProcessedData();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <th className="py-4 px-8">Date</th>
            <th className="py-4 px-4">Category</th>
            <th className="py-4 px-4">Description</th>
            <th className="py-4 px-4">Amount</th>
            <th className="py-4 px-8 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <Row key={tx.id} tx={tx} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-20 text-center text-slate-300 text-sm italic">
                No transactions found for "{activeFilter}".
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}