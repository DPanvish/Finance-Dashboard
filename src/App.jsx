import React from 'react';
import Layout from './components/Layout';
import SummaryCards from './components/SummaryCards';
import DashboardCharts from './components/DashboardCharts'; 
import Insights from './components/Insights';             

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Track your financial activity at a glance.</p>
        </div>
        
        <SummaryCards />
        
        {/* Added Insights */}
        <Insights />
        
        {/* Added Charts */}
        <DashboardCharts />

        {/* This is the final placeholder we will tackle next */}
        <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
           [ Transactions List & Admin Controls will go here ]
        </div>
      </div>
    </Layout>
  );
}

export default App;