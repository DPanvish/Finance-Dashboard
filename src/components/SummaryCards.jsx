import React, { useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency } from '../utils/formatter';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useFinanceStore();

  // useMemo ensures we only recalculate when transactions change
  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
          acc.balance += curr.amount;
        } else {
          acc.expense += curr.amount;
          acc.balance -= curr.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Total Income',
      amount: income,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Total Expenses',
      amount: expense,
      icon: TrendingDown,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(card.amount)}
              </h3>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;