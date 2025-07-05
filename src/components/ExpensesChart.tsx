"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";

type Transaction = {
  amount: number;
  date: string;
};

function getMonthlyData(transactions: Transaction[]) {
  const map: { [month: string]: number } = {};
  transactions.forEach(t => {
    const month = t.date.slice(0, 7); // YYYY-MM
    map[month] = (map[month] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([month, total]) => ({ 
      month: new Date(month + '-01').toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }), 
      total 
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

function getDailyData(transactions: Transaction[]) {
  const map: { [date: string]: number } = {};
  transactions.forEach(t => {
    const date = t.date.slice(0, 10); // YYYY-MM-DD
    map[date] = (map[date] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([date, total]) => ({ 
      date: new Date(date).toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric'
      }), 
      total 
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30); // Show last 30 days
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-lg font-bold text-blue-600">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensesChart({ transactions }: { transactions: Transaction[] }) {
  const [viewMode, setViewMode] = useState<'monthly' | 'daily'>('monthly');
  const monthlyData = getMonthlyData(transactions);
  const dailyData = getDailyData(transactions);
  const data = viewMode === 'monthly' ? monthlyData : dailyData;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
            <p className="text-gray-600 mt-1">
              {viewMode === 'monthly' ? 'Monthly spending patterns' : 'Daily spending patterns (last 30 days)'}
            </p>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'daily'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Daily
            </button>
          </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data to display</h3>
          <p className="text-gray-500">Add some transactions to see your spending patterns.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4">
          <ResponsiveContainer width="100%" height={300}>
            {viewMode === 'monthly' ? (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="total" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  className="hover:fill-blue-600"
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone"
                  dataKey="total" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}  