import React, { useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency } from '../utils/formatter';
import { Lightbulb, AlertCircle } from 'lucide-react';

const Insights = () => {
  const { transactions } = useFinanceStore();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) return null;

    // Calculate highest spending category
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    let highestCategory = '';
    let highestAmount = 0;

    for (const [category, amount] of Object.entries(grouped)) {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = category;
      }
    }

    // Calculate total transactions this month (simplified for the mock data)
    const totalTransactions = transactions.length;

    return { highestCategory, highestAmount, totalTransactions };
  }, [transactions]);

  if (!insights) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-full shrink-0">
          <Lightbulb className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900">AI Financial Insight</h4>
          <p className="text-sm text-amber-800 mt-1">
            Your highest spending category currently is <strong className="font-semibold">{insights.highestCategory}</strong> at {formatCurrency(insights.highestAmount)}.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-100/50 px-3 py-1.5 rounded-lg shrink-0">
        <AlertCircle className="w-4 h-4" />
        {insights.totalTransactions} Total Transactions
      </div>
    </div>
  );
};

export default Insights;