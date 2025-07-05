"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  currentIncome: number;
  onSetIncome: (income: number) => void;
};

export default function IncomeSettings({ currentIncome, onSetIncome }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [income, setIncome] = useState(currentIncome.toString());

  const handleSave = () => {
    const newIncome = parseFloat(income);
    if (!isNaN(newIncome) && newIncome >= 0) {
      onSetIncome(newIncome);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIncome(currentIncome.toString());
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Income Target</h3>
        {!isEditing && (
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 shadow-sm transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Target
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="income" className="text-sm font-medium text-gray-700">
              Monthly Income Target
            </Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                min={0}
                step={0.01}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            ${currentIncome.toFixed(2)}
          </div>
          <p className="text-sm text-gray-500">Monthly income target</p>
        </div>
      )}
    </div>
  );
} 