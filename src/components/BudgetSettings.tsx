"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/models/Transaction";

type CategoryBudget = {
  [key: string]: number;
};

type Props = {
  budgets: CategoryBudget;
  onUpdateBudgets: (budgets: CategoryBudget) => void;
};

export default function BudgetSettings({ budgets, onUpdateBudgets }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [localBudgets, setLocalBudgets] = useState<CategoryBudget>(budgets);

  const handleSave = () => {
    onUpdateBudgets(localBudgets);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalBudgets(budgets);
    setIsEditing(false);
  };

  const updateBudget = (category: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalBudgets(prev => ({
      ...prev,
      [category]: numValue
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Category Budgets</h3>
          <p className="text-sm text-gray-600">Set monthly spending limits for each category</p>
        </div>
        {!isEditing && (
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 shadow-sm transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Budgets
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.filter(cat => cat.value !== 'income').map((category) => (
              <div key={category.value} className="space-y-2">
                <Label htmlFor={`budget-${category.value}`} className="text-sm font-medium text-gray-700 flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id={`budget-${category.value}`}
                    type="number"
                    value={localBudgets[category.value] || 0}
                    onChange={(e) => updateBudget(category.value, e.target.value)}
                    min={0}
                    step={0.01}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
              Save Budgets
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.filter(cat => cat.value !== 'income').map((category) => (
            <div key={category.value} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">{category.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                ${(budgets[category.value] || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 