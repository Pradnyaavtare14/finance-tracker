"use client";
import { CATEGORIES } from "@/lib/models/Transaction";

type Transaction = {
  amount: number;
  category: string;
  date: string;
  description: string;
};

type CategoryBudget = {
  [key: string]: number;
};

type Props = {
  transactions: Transaction[];
  budgets: CategoryBudget;
};

export default function SpendingInsights({ transactions, budgets }: Props) {
  // Calculate insights
  const expenses = transactions.filter(t => t.amount < 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
  
  // Category spending
  const categorySpending: { [key: string]: number } = {};
  expenses.forEach(t => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + Math.abs(t.amount);
  });

  // Top spending categories
  const topCategories = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Budget performance
  const budgetPerformance = Object.entries(budgets).map(([category, budget]) => {
    const spent = categorySpending[category] || 0;
    const remaining = budget - spent;
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    return { category, budget, spent, remaining, percentage };
  });

  const overBudgetCategories = budgetPerformance.filter(item => item.remaining < 0);
  const underBudgetCategories = budgetPerformance.filter(item => item.remaining > 0 && item.budget > 0);

  // Recent spending trend (last 7 days)
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const recentExpenses = expenses.filter(t => new Date(t.date) >= last7Days);
  const recentTotal = recentExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const avgDailySpending = recentTotal / 7;

  // Insights
  const insights = [];

  if (topCategories.length > 0) {
    insights.push({
      type: 'info',
      icon: '💰',
      title: 'Top Spending Category',
      message: `${topCategories[0][0]} is your highest spending category at $${topCategories[0][1].toFixed(2)}`
    });
  }

  if (overBudgetCategories.length > 0) {
    insights.push({
      type: 'warning',
      icon: '⚠️',
      title: 'Over Budget Alert',
      message: `${overBudgetCategories.length} category${overBudgetCategories.length > 1 ? 'ies are' : ' is'} over budget`
    });
  }

  if (underBudgetCategories.length > 0) {
    insights.push({
      type: 'success',
      icon: '✅',
      title: 'Good Progress',
      message: `${underBudgetCategories.length} category${underBudgetCategories.length > 1 ? 'ies are' : ' is'} under budget`
    });
  }

  if (totalBudget > 0) {
    const budgetUsage = (totalExpenses / totalBudget) * 100;
    if (budgetUsage > 80) {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Budget Usage',
        message: `You've used ${budgetUsage.toFixed(1)}% of your total budget`
      });
    }
  }

  if (avgDailySpending > 0) {
    insights.push({
      type: 'info',
      icon: '📅',
      title: 'Daily Average',
      message: `Your average daily spending is $${avgDailySpending.toFixed(2)}`
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Spending Insights</h3>
        <p className="text-sm text-gray-600">Smart insights about your spending patterns</p>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No insights yet</h3>
          <p className="text-gray-500">Add more transactions to get personalized insights.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                insight.type === 'warning'
                  ? 'bg-red-50 border-red-200'
                  : insight.type === 'success'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{insight.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    insight.type === 'warning'
                      ? 'text-red-800'
                      : insight.type === 'success'
                      ? 'text-green-800'
                      : 'text-blue-800'
                  }`}>
                    {insight.title}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    insight.type === 'warning'
                      ? 'text-red-700'
                      : insight.type === 'success'
                      ? 'text-green-700'
                      : 'text-blue-700'
                  }`}>
                    {insight.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">${totalBudget.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Total Budget</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{expenses.length}</p>
            <p className="text-xs text-gray-500">Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {totalBudget > 0 ? ((totalExpenses / totalBudget) * 100).toFixed(1) : '0'}%
            </p>
            <p className="text-xs text-gray-500">Budget Used</p>
          </div>
        </div>
      </div>
    </div>
  );
} 