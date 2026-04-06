import React, { useState } from 'react';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency } from '../utils/formatter';
import { Search, Plus, Trash2 } from 'lucide-react';
import AddTransactionModal from './AddTransactionModal';

const TransactionList = () => {
  const { transactions, role, deleteTransaction } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple Filtering logic
  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search description or category..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* RBAC: Only Admin can see this button */}
          {role === 'Admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {/* RBAC: Admin column for actions */}
              {role === 'Admin' && <th className="px-6 py-4 font-medium text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{t.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  
                  {/* RBAC: Admin delete action */}
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-gray-500">
                  No transactions found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TransactionList;