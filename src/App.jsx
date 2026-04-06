import React from 'react';
import Layout from './components/Layout';
import SummaryCards from './components/SummaryCards';
import DashboardCharts from './components/DashboardCharts';
import Insights from './components/Insights';
import TransactionList from './components/TransactionList'; 

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Track your financial activity at a glance.</p>
        </div>
        
        <SummaryCards />
        <Insights />
        <DashboardCharts />
        <TransactionList />
      </div>
    </Layout>
  );
}

export default App;