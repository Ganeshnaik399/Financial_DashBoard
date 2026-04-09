import React from 'react';
import TransactionHeader from './TransactionHeader.jsx';
import TransactionFilters from './TransactionFilters.jsx';
import TransactionTable from './TransactionTable.jsx';
import TransactionPagination from './TransactionPagination.jsx';
export default function TransactionsView() {
  return (
    <div className=" space-y-6  ">
      {/* Page Title and Balance Info */}
      <TransactionHeader />

      {/* Search and Filters Row */}
      <TransactionFilters />

      {/* Main Data Table */}
      <div className="bg-white rounded-2rem border border-slate-100 shadow-sm overflow-hidden">
        <TransactionTable />
        <TransactionPagination />
      </div>
      
      {/* Bottom Floating Action (Optional) */}
      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 bg-[#2D2D39] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg">
          <span className="opacity-70">🔒</span> READ-ONLY ACCESS
        </button>
      </div>
    </div>
  );
}