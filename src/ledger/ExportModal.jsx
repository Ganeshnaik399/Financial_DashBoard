import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import useFinanceStore from '../store/Usefinance.js'; // Import your store

export default function ExportModal({ onClose }) {
  const [format, setFormat] = useState('CSV');
  const [range, setRange] = useState('Last 90 days');
  
  // 1. Get transactions from the store
  const transactions = useFinanceStore((state) => state.transactions) || [];

  const pillClass = (active) => `flex-1 py-2 text-[11px] font-bold rounded-lg transition-all ${active ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`;
  const rangeClass = (active) => `px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${active ? 'bg-[#0A1128] text-white border-[#0A1128]' : 'bg-white text-slate-500 border-slate-200'}`;

  // 2. Download Logic
  const handleDownload = () => {
    let fileData = "";
    let fileType = "";
    let fileName = `transactions_export_${new Date().toISOString().split('T')[0]}`;

    if (format === 'CSV') {
      // Create CSV Header
      const headers = ["Date", "Category", "Description", "Amount", "Type"];
      const rows = transactions.map(t => [t.date, t.category, t.description, t.amount, t.type].join(","));
      fileData = [headers.join(","), ...rows].join("\n");
      fileType = "text/csv;charset=utf-8;";
      fileName += ".csv";
    } else {
      // Default to JSON for "Excel/PDF" placeholders (Simple demo)
      fileData = JSON.stringify(transactions, null, 2);
      fileType = "application/json";
      fileName += ".json";
    }

    // 3. Create Blob and Trigger Download
    const blob = new Blob([fileData], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onClose(); // Close modal after download
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-10 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 hover:text-red-600 transition-transform duration-400 hover:scale-125 hover:rotate-180 "><X size={20} /></button>

        <h2 className="text-xl font-bold text-slate-800">Export Transactions</h2>
        <p className="text-sm text-slate-400 mt-1">Choose format to export your {transactions.length} records.</p>

        <div className="mt-8 space-y-8">
          {/* Format Selector */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-3">Select Format</label>
            <div className="flex bg-indigo-50/50 p-1 rounded-xl">
              <button onClick={() => setFormat('CSV')} className={pillClass(format === 'CSV')}>CSV</button>
              <button onClick={() => setFormat('JSON')} className={pillClass(format === 'JSON')}>JSON</button>
            </div>
          </div>

          {/* Date Range Selector */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-3">Date Range</label>
            <div className="flex gap-2">
              {['Last 30 days', 'Last 90 days', 'Custom'].map((r) => (
                <button key={r} onClick={() => setRange(r)} className={rangeClass(range === r)}>{r}</button>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-6 pt-4 border-t border-slate-50">
            <button onClick={onClose} className="text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#0A1128] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition active:scale-95"
            >
              <Download size={16} /> Download {format}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}