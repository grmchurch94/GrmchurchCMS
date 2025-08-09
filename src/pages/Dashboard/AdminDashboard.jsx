import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUsers, 
  FiUserPlus, 
  FiCalendar, 
  FiDollarSign, 
  FiTrendingUp, 
  FiActivity, 
  FiMessageSquare, 
  FiFileText,
  FiMail,
  FiSettings,
  FiShield,
  FiDatabase
} = FiIcons;

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: 'Total Members',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'emerald'
    },
    {
      title: 'New Visitors',
      value: '45',
      change: '+8%',
      trend: 'up',
      icon: FiUserPlus,
      color: 'blue'
    },
    {
      title: 'This Week Attendance',
      value: '892',
      change: '+5%',
      trend: 'up',
      icon: FiCalendar,
      color: 'purple'
    },
    {
      title: 'Monthly Donations',
      value: '₦1,245,000.00',
      change: '+15%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'orange'
    }
  ];

  const colorClasses = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };
  
  const quickActions = [
    { title: 'Add Member', icon: FiUsers, path: '/members', color: 'emerald', action: 'add' },
    { title: 'Record Attendance', icon: FiCalendar, path: '/attendance', color: 'blue', action: 'add' },
    { title: 'Send SMS', icon: FiMessageSquare, path: '/bulk-sms', color: 'purple', action: 'compose' },
    { title: 'Generate Report', icon: FiFileText, path: '/reports', color: 'orange', action: 'view' }
  ];

  const systemHealth = [
    { metric: 'Database Status', value: 'Healthy', status: 'good' },
    { metric: 'Backup Status', value: 'Up to date', status: 'good' },
    { metric: 'User Sessions', value: '12 active', status: 'normal' },
    { metric: 'System Load', value: '23%', status: 'good' }
  ];

  const handleQuickAction = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Administrator Dashboard</h1>
        <p className="text-emerald-100">Complete system overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1 hidden sm:inline">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${colorClasses[stat.color]}`}>
                <SafeIcon icon={stat.icon} className="text-white text-lg sm:text-xl" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* System Health and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* System Health */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <SafeIcon icon={FiShield} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{item.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{item.value}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'good' ? 'bg-green-500' : 
                    item.status === 'normal' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full" icon={FiSettings}>System Settings</Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <SafeIcon icon={FiActivity} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              {
                action: 'New member registered',
                user: 'John Smith',
                time: '2 hours ago'
              },
              {
                action: 'Donation received',
                user: 'Sarah Johnson',
                time: '4 hours ago'
              },
              {
                action: 'Visitor checked in',
                user: 'Mike Wilson',
                time: '6 hours ago'
              },
              {
                action: 'Equipment maintenance logged',
                user: 'Admin',
                time: '1 day ago'
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start sm:items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex flex-col items-start transition-colors"
              onClick={() => handleQuickAction(action.path)}
            >
              <SafeIcon 
                icon={action.icon} 
                className={`text-xl mb-2 text-${action.color}-500`} 
              />
              <span className="text-sm font-medium text-gray-900">{action.title}</span>
            </button>
          ))}
        </div>
        
        {/* Additional Admin Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <button
            className="p-4 rounded-lg text-center bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            onClick={() => handleQuickAction('/mail')}
          >
            <div className="flex items-center justify-center">
              <SafeIcon icon={FiMail} className="mr-2" />
              <span>Send Email Campaign</span>
            </div>
          </button>
          <button
            className="p-4 rounded-lg text-center bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            onClick={() => handleQuickAction('/settings')}
          >
            <div className="flex items-center justify-center">
              <SafeIcon icon={FiDatabase} className="mr-2" />
              <span>System Management</span>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;