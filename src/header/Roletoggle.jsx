import React from 'react';
import useFinanceStore from '../store/Usefinance.js';

export default function Roletoggle() {
  const { role, setRole } = useFinanceStore();

  const baseClass = "font-bold px-5 py-1 transition-all duration-300 rounded-full text-sm";
  
  return (
    <div className='flex rounded-full bg-slate-100 p-1 w-fit border border-slate-200'>
      <button 
        onClick={() => setRole('Admin')}
        className={`${baseClass} ${role === 'Admin' ? 'bg-black text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
      >
        Admin
      </button>
      <button 
        onClick={() => setRole('User')}
        className={`${baseClass} ${role === 'User' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
      >
        User
      </button>
    </div>
  );
}