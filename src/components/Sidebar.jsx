import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart,ChartNoAxesCombined, TableProperties } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/transactions', icon: <TableProperties size={20} />, label: 'Transactions' },
    { path: '/insight', icon: <LineChart size={20} />, label: 'Insight' },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 border-r bg-white p-6 lg:block z-20">
      <div className="mb-10 px-4 flex">
        <img className='w-30 h-20' src="public/animatedlogo.webp" alt="" />
        <h1 className="text-xl font-black text-indigo-600 tracking-tight">Financial DashBoard</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm ring-1 ring-indigo-100' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}