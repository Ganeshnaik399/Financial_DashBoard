import React, { useState } from 'react';
import { Bell, Settings, Menu, X, Gauge, ArrowRightLeft, ChartNoAxesCombined } from 'lucide-react';
import RoleToggle from '../header/Roletoggle.jsx';
import ProfileDropdown from '../header/Profiledropdown.jsx';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [MenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md md:px-8">
        
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)} className="rounded-xl p-2 bg-slate-50 lg:hidden"><Menu size={24} /></button>
          <nav className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest md:flex">
            <span className="text-slate-300">Financial</span>
            <span className="text-indigo-600">Ledger</span>
          </nav>
        </div>

        {/* Component 1: The Toggle */}
        <RoleToggle />

        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 border-r border-slate-100 pr-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600"><Bell size={20} /></button>
            <button className="hidden sm:block p-2 text-slate-400 hover:text-indigo-600"><Settings size={20} /></button>
          </div>

          {/* Component 2: The Profile */}
          <ProfileDropdown />
        </div>
      </header>

      {/* Mobile Sidebar Logic stays here or can be its own component too */}
      {MenuOpen && (
        <MobileSidebar onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
}

// Separated Mobile Sidebar for better readability
function MobileSidebar({ onClose }) {
  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="mb-10 ml-50 p-2 bg-slate-50 rounded-lg transition-transform duration-500 ease-in-out hover:text-red-600 hover:rotate-90 hover:scale-130 "><X size={20} /></button>
        <div className="mb-10 px-4 flex">
        <img className='w-30 h-20' src="public/animatedlogo.webp" alt="" />
        <h1 className="text-xl font-black text-indigo-600 tracking-tight">Financial DashBoard</h1>
      </div>
        <nav className="space-y-2">
           <MobileNavLink to="/dashboard" label="Dashboard" icon={<Gauge size={18}/>} onClick={onClose} />
           <MobileNavLink to="/transactions" label="Transactions" icon={<ArrowRightLeft size={18}/>} onClick={onClose} />
           <MobileNavLink to="/Insight" label="Insights" icon={<ChartNoAxesCombined size={18}/>} onClick={onClose} />
        </nav>
      </div>
    </div>
  );
}

function MobileNavLink({ to, label, icon, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => `flex items-center gap-4 px-4 py-4 rounded-2xl font-bold ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'}`}>
      {icon} {label}
    </NavLink>
  );
}