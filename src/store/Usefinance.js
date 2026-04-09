import { create } from 'zustand';
import { dummyData } from '../data';

const useFinanceStore = create((set) => ({
  // --- State ---
  monthlyTrends: dummyData.monthlyTrends || [],
  categories: dummyData.categories || [],
  transactions: dummyData.transactions || [],
  user: dummyData.profile,
  role: dummyData.profile?.role || 'User',
  activeFilter: 'All Categories',
  // --- Actions ---
  
  // Updates the user role (Admin/User)
  setRole: (newRole) => set({ role: newRole }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  // Adds a new transaction to the top of the list
  addTransaction: (newTx) => set((state) => ({
    transactions: [newTx, ...state.transactions]
  })),
  
  // Updates the monthly trend charts
  updateTrends: (newData) => set({ monthlyTrends: newData }),
}));

export default useFinanceStore;