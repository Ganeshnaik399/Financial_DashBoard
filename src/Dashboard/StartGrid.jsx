import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js';

const Card = ({ title, value, change, icon, dark = false }) => (
  <div className={`${dark ? 'bg-[#1E1E2D] text-white' : 'bg-white text-slate-800'} p-6 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]`}>
    <div className="flex justify-between items-start">
      <p className="text-[10px] uppercase font-bold opacity-60 tracking-widest">{title}</p>
      {!dark && <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>}
    </div>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
    <p className={`text-[10px] font-medium mt-1 ${dark ? 'text-emerald-400' : 'text-slate-400'}`}>{change}</p>
  </div>
);

export default function StatGrid() {
  const { monthlyTrends, transactions } = useFinanceStore();

  // 1. Get current month data (last item in the array)
  const currentMonthData = monthlyTrends[monthlyTrends.length - 1] || { income: 0, spending: 0, netWorth: 0 };
  
  // 2. Calculations
  const totalBalance = currentMonthData.netWorth;
  const monthlyIncome = currentMonthData.income;
  const monthlyExpense = currentMonthData.spending;
  const netSavings = monthlyIncome - monthlyExpense;

  // 3. Dynamic formatting
  const formatCurrency = (val) => `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card 
        title="Total Balance" 
        value={formatCurrency(totalBalance)} 
        change="+2.4% this month" 
        icon={<Wallet className="text-blue-500" size={20} />} 
      />
      <Card 
        title="Monthly Income" 
        value={formatCurrency(monthlyIncome)} 
        change="Current Month" 
        icon={<ArrowUpRight className="text-emerald-500" size={20} />} 
      />
      <Card 
        title="Monthly Expense" 
        value={formatCurrency(monthlyExpense)} 
        change={`Based on ${transactions.length} transactions`} 
        icon={<ArrowDownRight className="text-rose-500" size={20} />} 
      />
      <Card 
        title="Net Savings" 
        value={formatCurrency(netSavings)} 
        change={`${((netSavings / monthlyIncome) * 100).toFixed(1)}% of income`} 
        dark 
      />
    </div>
  );
}