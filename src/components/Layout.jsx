import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import RoleToggle from './RoleToggle';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <LayoutDashboard className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-900">FinanceDash</h1>
          </div>
          
          {/* Role Toggle will go here */}
          <RoleToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;