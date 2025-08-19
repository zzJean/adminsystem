import React from 'react';
import { BarChart3, Users, Building2, FileText, AlertCircle } from 'lucide-react';
import StatCard from './StatCard';
import Chart from './Chart';
import RecentList from './RecentList';
import { useThemeClasses } from '../hooks/useThemeClasses';

const Dashboard: React.FC = () => {
  const classes = useThemeClasses();
  
  const recentActivities = [
    {
      id: '1',
      title: 'New facility registered',
      subtitle: 'Manufacturing Plant A has been added to the system',
      timestamp: '2 hours ago',
      type: 'facility'
    },
    {
      id: '2',
      title: 'Document approved',
      subtitle: 'Safety protocol document has been approved',
      timestamp: '4 hours ago',
      type: 'document'
    },
    {
      id: '3',
      title: 'User access granted',
      subtitle: 'New user John Doe has been granted access',
      timestamp: '6 hours ago',
      type: 'user'
    },
    {
      id: '4',
      title: 'Audit completed',
      subtitle: 'Monthly compliance audit has been completed',
      timestamp: '1 day ago',
      type: 'audit'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Design User!</h1>
        <p className="text-blue-100">Here's what's happening with your facilities today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Companies"
          value="24"
          icon={Building2}
          activeCount={22}
          inactiveCount={2}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Facilities"
          value="156"
          icon={BarChart3}
          activeCount={148}
          inactiveCount={8}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value="1,234"
          icon={Users}
          activeCount={1180}
          inactiveCount={54}
          color="purple"
          trend={{ value: 23, isPositive: true }}
        />
        <StatCard
          title="Documents"
          value="5,678"
          icon={FileText}
          activeCount={5456}
          inactiveCount={222}
          color="orange"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <Chart
          title="Performance Overview"
          data={[
            { label: 'Manufacturing', value: 2400, color: '#3B82F6' },
            { label: 'Distribution', value: 1800, color: '#10B981' },
            { label: 'Research', value: 900, color: '#8B5CF6' },
            { label: 'Storage', value: 600, color: '#F59E0B' }
          ]}
        />

        {/* Recent Activity */}
        <RecentList
          title="Recent Activity"
          items={recentActivities}
          icon={<AlertCircle className="w-5 h-5 text-blue-600" />}
        />
      </div>
    </div>
  );
};

export default Dashboard;