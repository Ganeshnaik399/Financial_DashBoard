import React from 'react';
import StartGrid from './StartGrid.jsx';
import IncomeChart from './IncomeChart.jsx';
import SpendingBreakdown from './SpendingBreakdown.jsx';
import TransactionList from './TransectionList.jsx';
export default function DashboardView() {
  return (
    <div className="space-y-8 ">
      {/* Top Row: 4 Stat Cards */}
      <StartGrid />

      {/* Middle Row: Big Stacked Bar Chart */}
      <IncomeChart />

      {/* Bottom Row: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingBreakdown />
        <TransactionList />
      </div>
    </div>
  );
}