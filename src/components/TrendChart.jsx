import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useFinanceStore from '../store/Usefinance.js'; // Import the store

const TrendChart = () => {
  // Pull data from Zustand instead of a local const
  const monthlyTrends = useFinanceStore((state) => state.monthlyTrends);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlyTrends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="netWorth" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;