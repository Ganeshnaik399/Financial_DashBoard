import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js'; 

export default function AddTransactionModal({ onClose }) {
  const role = useFinanceStore((state) => state.role);
  // 1. Pull categories and addTransaction from Zustand
  const categories = useFinanceStore((state) => state.categories) || [];
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  // 2. State following your dummyData fields
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: categories.length > 0 ? categories[0].name : 'Food',
    amount: '',
    description: ''
  });
  const inputBg = "bg-[#DBE9FE] border-none rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition-all";
  const labelClass = "text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return alert("Please fill all fields");

    // Helper to get current time in "HH:MM AM/PM" format to match dummyData
    const currentTime = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    }).toUpperCase();

    // 3. Construct the object to match dummyData exactly
    const newEntry = {
      id: Date.now(),
      date: formData.date,
      time: currentTime,
      description: formData.description,
      category: formData.category,
      amount: formData.category === 'Income' ? parseFloat(formData.amount) : -parseFloat(formData.amount),
      type: formData.category === 'Income' ? 'income' : 'expense',
      status: 'success' // Defaulting to success as per your schema
    };
  if (role !== 'Admin') {
      alert("Unauthorized: Only Admins can modify the ledger.");
      onClose();
      return;
    }
    addTransaction(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 hover:text-red-600 transition-transform duration-400 hover:scale-125 hover:rotate-180 ">
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1E1E2D]">New Entry</h2>
          <p className="text-sm text-slate-400 mt-1">Record a movement in your INR ledger.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className={`${inputBg} w-full pr-10`} 
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`${inputBg} w-full appearance-none pr-10`}
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.name}>{cat.name}</option>
                  ))}
                  {/* Manually add Income if it's not in your categories list */}
                  <option value="Income">Income</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Amount (INR)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
              <input 
                type="number" 
                placeholder="0.00" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className={`${inputBg} w-full pl-8`} 
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea 
              rows="2" 
              placeholder="e.g. Grocery Store" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={`${inputBg} w-full resize-none`}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-200 transition">
              Discard
            </button>
            <button type="submit" className="flex-1 bg-[#0A1128] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}