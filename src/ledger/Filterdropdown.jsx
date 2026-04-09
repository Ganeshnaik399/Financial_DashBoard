import React from 'react';
import { ArrowUpNarrowWide, ArrowDownWideNarrow, Tag, CalendarDays } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js';

export default function Filterdropdown({ onSelect, onClose }) {
  const categories = useFinanceStore((state) => state.categories) || [];

  const SectionLabel = ({ children }) => (
    <label className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-widest block">
      {children}
    </label>
  );

  const FilterButton = ({ icon: Icon, label, onClick }) => (
    <button 
      onClick={() => onClick(label)}
      className="flex w-full items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition text-left"
    >
      <Icon size={14} /> {label}
    </button>
  );

  return (
    <>
      {/* Invisible backdrop to close on click-outside */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-100 shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 cursor-pointer">
        
        <SectionLabel>Sort by Amount</SectionLabel>
        <FilterButton icon={ArrowUpNarrowWide} label="Ascending (Low to High)" onClick={onSelect} />
        <FilterButton icon={ArrowDownWideNarrow} label="Descending (High to Low)" onClick={onSelect} />

        <div className="my-2 border-t border-slate-50" />

        <SectionLabel>Sort by Date</SectionLabel>
        <FilterButton icon={CalendarDays} label="Newest First" onClick={onSelect} />
        <FilterButton icon={CalendarDays} label="Oldest First" onClick={onSelect} />

        <div className="my-2 border-t border-slate-50" />

        <SectionLabel>Filter Categories</SectionLabel>
        <FilterButton icon={Tag} label="All Categories" onClick={onSelect} />
        {categories.map((cat, i) => (
          <FilterButton key={i} icon={Tag} label={cat.name} onClick={onSelect} />
        ))}
        <FilterButton icon={Tag} label="Income" onClick={onSelect} />

      </div>
    </>
  );
}