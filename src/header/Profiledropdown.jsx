import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, User, LogOut } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js'; 

export default function Profiledropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const role = useFinanceStore((state) => state.role);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 transition"
      >
        <img 
          src="https://ui-avatars.com/api/?name=Ganesh+Naik&background=0A1128&color=fff" 
          alt="User" 
          className="h-10 w-10 rounded-xl object-cover shadow-sm"
        />
        <div className="hidden text-left lg:block">
          <p className="text-xs font-black text-slate-800 leading-none">Ganesh Naik</p>
          {/* Dynamic Label based on Zustand state */}
          <p className="text-[10px] font-bold text-indigo-600 uppercase mt-1">
            {role.toLowerCase()} logged
          </p>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-slate-100 shadow-2xl p-2 z-50">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 transition">
            <ShieldCheck size={18} /> Profile
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 transition">
            <User size={18} /> Contacts
          </button>
          <div className="my-1 border-t border-slate-50" />
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}