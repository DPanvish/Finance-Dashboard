import React from 'react';
import useFinanceStore from '../store/useFinanceStore';
import { Shield, User } from 'lucide-react';

const RoleToggle = () => {
  const { role, setRole } = useFinanceStore();

  const toggleRole = () => {
    setRole(role === 'Admin' ? 'Viewer' : 'Admin');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500 hidden sm:block">
        Current Role: <strong className="text-gray-900">{role}</strong>
      </span>
      <button
        onClick={toggleRole}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
      >
        {role === 'Admin' ? <Shield className="w-4 h-4 text-indigo-600" /> : <User className="w-4 h-4 text-emerald-600" />}
        Switch to {role === 'Admin' ? 'Viewer' : 'Admin'}
      </button>
    </div>
  );
};

export default RoleToggle;