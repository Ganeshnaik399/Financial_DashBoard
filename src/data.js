export const dummyData = {
  profile: { 
    name: "Ganesh Naik", 
    role: "Admin", // Change this to "User" or "Admin" to set the default
    currency: "INR" 
  },
  // For TrendChart and NetWorthHero
  monthlyTrends: [
    { name: 'Jan', income: 45000, spending: 32000, netWorth: 100000 },
    { name: 'Feb', income: 52000, spending: 34000, netWorth: 118000 },
    { name: 'Mar', income: 48000, spending: 41000, netWorth: 125000 },
    { name: 'Apr', income: 61000, spending: 38000, netWorth: 148000 },
    {  name:'May', income: 73090, spending: 32223, netWorth: 156000 }
  ],

  // For SpendingPie and SpendingBreakdown
  categories: [
    { name: 'Rent', value: 15000, color: '#8884d8' },
    { name: 'Food', value: 8000, color: '#82ca9d' },
    { name: "Investment", value: 10000, color: "#ffc658" },
    { name: "Entertainment", value: 5000, color: "#ff8042" }
  ],

  // For TransactionList and TransactionTable
  transactions: [
    { id: 1, date: '2026-04-08', time:"14:33 PM", description: 'Grocery Store', category: 'Food', amount: -2500, type: 'expense', status:'sucess' },
    { id: 2, date: '2026-04-08', time:"02:22 PM", description: 'Freelance Project', category: 'Income', amount: 15000, type: 'income' ,status:'sucess'},
    { id: 3, date: '2026-04-07', time:"08:45 AM", description: 'Monthly Rent', category: 'Rent', amount: -15000, type: 'expense',status:'PENDING' },
    { id: 4, date: '2026-04-07', time:"11:15 AM", description: 'Electricity Bill', category: 'Utilities', amount: -1800, type: 'expense', status:'sucess' },
/* { id: 5, date: '2026-04-06', time:"09:30 PM", description: 'Restaurant Dinner', category: 'Food', amount: -1200, type: 'expense', status:'sucess' },
    { id: 6, date: '2026-04-06', time:"04:10 PM", description: 'Stock Dividend', category: 'Investment', amount: 3500, type: 'income', status:'sucess' },
    { id: 7, date: '2026-04-06', time:"01:05 PM", description: 'Internet Bill', category: 'Utilities', amount: -999, type: 'expense', status:'PENDING' },
    { id: 8, date: '2026-04-05', time:"10:20 AM", description: 'Salary Bonus', category: 'Income', amount: 8000, type: 'income', status:'sucess' }
  */]
};