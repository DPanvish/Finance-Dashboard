import { create } from 'zustand';
import { initialTransactions } from "../data/mockdata"

const useFinanceStore = create((set) => ({
  // --- State ---
  transactions: initialTransactions,
  role: 'Viewer', // Default role based on Requirement #3
  
  // --- Actions ---
  // Switch between Admin and Viewer
  setRole: (newRole) => set({ role: newRole }),

  // Add a new transaction (Admin only feature)
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),

  // Delete a transaction (Admin only feature)
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),
}));

export default useFinanceStore;