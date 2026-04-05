import React from 'react';
import Layout from './components/Layout';
import SummaryCards from './components/SummaryCards';

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Track your financial activity at a glance.</p>
        </div>
        
        <SummaryCards />

        {/* Placeholders for our next components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
           [ Charts will go here ]
        </div>
        
        <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
           [ Transactions List will go here ]
        </div>
      </div>
    </Layout>
  );
}

export default App;