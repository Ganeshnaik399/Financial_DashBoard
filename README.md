# Financial Ledger Dashboard

An architectural-grade financial tracking application built with **React**, **Tailwind CSS**, and **Zustand**. This project transitions from a static UI to a robust, data-driven system with global state management and role-based access control.

## Features

- **Global State Management**: Powered by Zustand for seamless data flow across independent components (Header, Table, Filters, Modals).
- **Role-Based Access Control (RBAC)**: Integrated Admin/User toggle that dynamically enables or restricts ledger modification capabilities.
- **Advanced Filtering & Sorting**: Custom logic to sort by Date (Newest/Oldest), Amount (High/Low), and specific Categories.
- **Transaction Life-cycle**: Fully functional "Add Transaction" modal that validates inputs and updates the architectural ledger in real-time.
- **Data Export**: Logic to generate and download CSV/JSON reports based on the current transaction store.
- **Responsive Design**: Mobile-first sidebar and professional desktop navigation.

---

##  Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide-React
- **State Management**: Zustand
- **Charts**: Recharts

---
# Architecture & Design Decisions
## State Management
- Zustand chosen for simplicity and performance
- Middleware persist used for local storage
## RBAC Implementation
- Role stored globally
- UI conditionally renders actions
- Prevents unauthorized operations
## Performance Optimization
- Minimal re-renders via Zustand selectors
- Lightweight components
- Efficient array operations
## Scalability
- Modular folder structure
- Reusable components
- Easy backend integration
## Edge Cases Handled
- No transactions → Empty state UI
- Invalid form inputs → prevented submission
- Missing data → fallback logic
- Month comparison when no previous data

##  Project Structure

```text
src/
my-app/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── DashboardView.jsx
│   │   │   ├── IncomeChart.jsx
│   │   │   ├── SpendingBreakdown.jsx
│   │   │   ├── StartGrid.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── header/
│   │   │   ├── Profiledropdown.jsx
│   │   │   └── Roletoggle.jsx
│   │   ├── ledger/
│   │   │   ├── AddTransactionModal.jsx
│   │   │   ├── ExportModal.jsx
│   │   │   ├── Filterdropdown.jsx
│   │   │   ├── TransactionFilters.jsx
│   │   │   ├── TransactionHeader.jsx
│   │   │   ├── TransactionPagination.jsx
│   │   │   ├── TransactionsView.jsx
│   │   │   └── TransactionTable.jsx
│   │   ├── Header.jsx
│   │   ├── Insight.jsx
│   │   ├── Loginpage.jsx
│   │   ├── NetWorthHero.jsx
│   │   ├── Observation.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SpendingPie.jsx
│   │   └── TrendChart.jsx
│   ├── store/
│   │   └── Usefinance.js
│   ├── App.jsx
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── ReadMe.md
└── vite.config.js
---
```
# Challenges & Bug Log
## Undefined .length Crash
***Issue***: Components like TransactionHeader crashed on load when reading transactions.length.
***Cause***: The component rendered before the Zustand store finished initializing from the data file.
Solution: Implemented fallback arrays const data = storeData || [] to ensure .length always returns a number.

## State Syncing across Components
***Issue***: Adding a transaction didn't immediately update the table or header.
***Cause***: Components were using local state instead of the shared global store.
Solution: Migrated all data-dependent variables to Zustand selectors, enabling reactive UI updates.

## Role-based Logic
***Issue***: Any user could access the "Add Transaction" button.
***Solution***: Implemented a role state in the store. The UI now performs a conditional check to hide the "Add" button and block the form submission if the role is not Admin.
# Screenshots
(Tip: Add your local screenshots to a /public/screenshots folder and link them here)

# Dashboard View:
<img width="1882" height="955" alt="Screenshot 2026-04-09 161913" src="https://github.com/user-attachments/assets/bde21033-8929-4483-bfc7-1cf5e00c2627" />

# Add Transaction Modal: 
<img width="1886" height="935" alt="Screenshot 2026-04-09 161807" src="https://github.com/user-attachments/assets/f324f53b-e0e8-4fda-8657-91bb5d6ff453" />


# Insights:
<img width="1872" height="951" alt="Screenshot 2026-04-09 161719" src="https://github.com/user-attachments/assets/6b49b447-3ac3-4a71-921a-b44fccfba86c" />
# Future Enhancements
- Charts (Recharts / Chart.js)
- Filters & Search
- Pagination
- Authentication (JWT)
- Backend Integration (Node.js + MongoDB)
- PWA Support
 # Author
-Ganesh Naik
-Frontend Developer (React, UI/UX)
-Passionate about scalable web apps & clean design
