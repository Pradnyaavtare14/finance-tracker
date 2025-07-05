import { useState, useEffect } from 'react';

export function useIncomeTarget() {
  const [incomeTarget, setIncomeTarget] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('incomeTarget');
    if (saved) {
      setIncomeTarget(parseFloat(saved));
    }
    setIsLoaded(true);
  }, []);

  // Update income target and save to localStorage
  const updateIncomeTarget = (newTarget: number) => {
    setIncomeTarget(newTarget);
    if (typeof window !== 'undefined') {
      localStorage.setItem('incomeTarget', newTarget.toString());
    }
  };

  return { incomeTarget, updateIncomeTarget, isLoaded };
} 