"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { CATEGORIES } from "@/lib/models/Transaction";

type Transaction = {
  amount: number;
  category: string;
};

type CategoryBudget = {
  [key: string]: number;
};

type Props = {
  transactions: Transaction[];
  budgets: CategoryBudget;
};

function calculateBudgetData(transactions: Transaction[], budgets: CategoryBudget) {
  // Calculate actual spending by category
  const actualSpending: { [key: string]: number } = {};
  
  transactions
    .filter(t => t.amount < 0) // Only expenses
    .forEach(t => {
      actualSpending[t.category] = (actualSpending[t.category] || 0) + Math.abs(t.amount);
    });

  // Create comparison data
  return CATEGORIES.filter(cat => cat.value !== 'income').map(category => {
    const budget = budgets[category.value] || 0;
    const actual = actualSpending[category.value] || 0;
    const remaining = budget - actual;
    const percentage = budget > 0 ? (actual / budget) * 100 : 0;

    return {
      category: category.label,
      icon: category.icon,
      color: category.color,
      budget,
      actual,
      remaining,
      percentage: Math.min(percentage, 100)
    };
  }).filter(item => item.budget > 0 || item.actual > 0); // Only show categories with budget or spending
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <div className="flex items-center mb-2">
          <span className="mr-2">{data.icon}</span>
          <p className="text-sm font-medium text-gray-900">{label}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-gray-600">Budget:</span>
            <span className="ml-2 font-semibold text-green-600">${data.budget.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Actual:</span>
            <span className="ml-2 font-semibold text-blue-600">${data.actual.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Remaining:</span>
            <span className={`ml-2 font-semibold ${data.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${data.remaining.toFixed(2)}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Used:</span>
            <span className="ml-2 font-semibold text-purple-600">{data.percentage.toFixed(1)}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function BudgetComparisonChart({ transactions, budgets }: Props) {
  const data = calculateBudgetData(transactions, budgets);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Budget vs Actual Spending</h3>
        <p className="text-sm text-gray-600">Compare your budget limits with actual spending by category</p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No budget data</h3>
          <p className="text-gray-500">Set category budgets to see budget vs actual comparisons.</p>
        </div>
      ) : (
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="category" 
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
              <Legend />
              <Bar 
                dataKey="budget" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                name="Budget"
              />
              <Bar 
                dataKey="actual" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                name="Actual"
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Budget Status Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Under Budget</p>
                  <p className="text-lg font-bold text-green-900">
                    {data.filter(item => item.remaining > 0).length} categories
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">Over Budget</p>
                  <p className="text-lg font-bold text-red-900">
                    {data.filter(item => item.remaining < 0).length} categories
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Total Budget</p>
                  <p className="text-lg font-bold text-blue-900">
                    ${data.reduce((sum, item) => sum + item.budget, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 