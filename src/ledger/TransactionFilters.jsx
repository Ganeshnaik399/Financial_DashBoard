import React, { useState } from 'react';
import { Search, Calendar, Filter, ChevronDown, Download, Plus } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js'; 
import AddTransactionModal from './AddTransactionModal';
import ExportModal from './ExportModal';
import FilterDropdown from './Filterdropdown';

export default function TransactionFilters() {
  // --- Global State ---
  const role = useFinanceStore((state) => state.role);
const { activeFilter, setActiveFilter } = useFinanceStore();
  // --- Local UI State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  

  // --- Handlers ---
  const handleDownloadComplete = () => {
    setIsExportOpen(false);
    setShowSuccess(true);
    // Hide success toast after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filterClass = "flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm";

  return (
    <div className="space-y-4 relative">
      
      {/* 1. Success Notification Toast */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 bg-[#0A1128] text-white px-6 py-3 rounded-2xl shadow-2xl font-bold border border-indigo-400 animate-in fade-in slide-in-from-top-4">
          <span className="text-emerald-400 mr-2">✓</span> Data Exported Successfully
        </div>
      )}

      {/* 2. Top Bar: Search & Action Button */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-transparent border-b border-slate-200 py-3 pl-12 pr-4 text-sm outline-none focus:border-indigo-500 transition-colors" 
          />
        </div>
        
        {/* Admin Guard: Only show "Add" button if user is Admin */}
        {role === 'Admin' ? (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 bg-[#0A1128] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition transform active:scale-95 whitespace-nowrap cursor-pointer "
          >
            <Plus size={18} /> Add Transaction
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-100 text-slate-400 px-5 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-wider cursor-not-allowed border border-slate-200">
            Read Only Access
          </div>
        )}
      </div>

      {/* 3. Bottom Bar: Sorting & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Static Date Display */}
        <button className={filterClass}>
          <Calendar size={14} className="text-indigo-500" /> Mar 1 - Mar 31, 2026
        </button>
        
        {/* Dynamic Filter/Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            className={`${filterClass} ${isFilterOpen ? 'border-indigo-200 bg-indigo-50/30' : ''}`}
          >
            <Filter size={14} className="text-indigo-500 " /> 
            <span className="min-w-[100px] text-left">{activeFilter}</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}/>
          </button>
          
          {isFilterOpen && (
            <FilterDropdown 
              onSelect={(val) => {
                setActiveFilter(val);
                setIsFilterOpen(false);
              }} 
              onClose={() => setIsFilterOpen(false)}
            />
          )}
        </div>
        
        {/* Export Action */}
        <button 
          onClick={() => setIsExportOpen(true)}
          className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition bg-white border border-slate-100 rounded-xl px-4 py-2 shadow-sm cursor-pointer "
        >
          <Download size={14} className="text-rose-500  "/> Export
        </button>
      </div>

      {/* 4. Modals Layer */}
      {isModalOpen && (
        <AddTransactionModal onClose={() => setIsModalOpen(false)} />
      )}
      
      {isExportOpen && (
        <ExportModal 
          onClose={() => setIsExportOpen(false)} 
          onDownload={handleDownloadComplete} 
        />
      )}
    </div>
  );
}