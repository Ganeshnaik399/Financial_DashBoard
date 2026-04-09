
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import DashboardView from './Dashboard/DashboardView.jsx';
import InsightsView from './components/Insight.jsx';
import TransactionsView from './ledger/TransactionsView.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64">
        <Header />
        
        <div className="p-4 md:p-8 w-full max-w-none">
          <Routes>
            {/* Redirect / to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/transactions" element={<TransactionsView />} />
            <Route path="/insight" element={<InsightsView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}