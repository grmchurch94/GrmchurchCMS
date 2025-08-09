import React from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';
import ReactEcharts from 'echarts-for-react';

const { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown,
  FiCalendar, 
  FiFileText, 
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiPieChart,
  FiBarChart2,
  FiDownload,
  FiPlus
} = FiIcons;

const AccountantDashboard = () => {
  // Mock financial data
  const financialStats = {
    totalIncome: 1245000.00,
    totalExpenses: 890000.00,
    netBalance: 355000.00,
    pendingApprovals: 5,
    overduePayments: 2,
    monthlyGrowth: 12.5
  };

  const pendingTransactions = [
    {
      id: 1,
      type: 'Expense',
      description: 'Equipment Purchase',
      amount: 75000.00,
      requestedBy: 'Tech Team',
      date: '2023-06-05',
      priority: 'Medium'
    },
    {
      id: 2,
      type: 'Donation',
      description: 'Building Fund Contribution',
      amount: 250000.00,
      requestedBy: 'John Smith',
      date: '2023-06-04',
      priority: 'High'
    },
    {
      id: 3,
      type: 'Expense',
      description: 'Utility Bills',
      amount: 45000.00,
      requestedBy: 'Admin',
      date: '2023-06-03',
      priority: 'High'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'Income',
      description: 'Sunday Offering',
      amount: 125000.00,
      date: '2023-06-04',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Expense',
      description: 'Office Supplies',
      amount: 15000.00,
      date: '2023-06-03',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Income',
      description: 'Tithe Collection',
      amount: 180000.00,
      date: '2023-06-01',
      status: 'Completed'
    }
  ];

  // Chart data for monthly financial overview
  const monthlyFinanceData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Income', 'Expenses', 'Net'],
      bottom: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '₦{value}k'
        }
      }
    ],
    series: [
      {
        name: 'Income',
        type: 'bar',
        data: [980, 1050, 1120, 1080, 1200, 1245],
        color: '#10b981'
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [750, 820, 890, 850, 920, 890],
        color: '#ef4444'
      },
      {
        name: 'Net',
        type: 'line',
        data: [230, 230, 230, 230, 280, 355],
        color: '#3b82f6'
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor church finances and manage transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FiDownload} size="sm">Export Report</Button>
          <Button icon={FiPlus}>Add Transaction</Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100 mb-1">Total Income</p>
              <p className="text-xl sm:text-2xl font-bold">{formatCurrency(financialStats.totalIncome)}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="mr-1" />
                <span className="text-sm font-medium">+{financialStats.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiTrendingUp} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-500 to-red-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-100 mb-1">Total Expenses</p>
              <p className="text-xl sm:text-2xl font-bold">{formatCurrency(financialStats.totalExpenses)}</p>
              <p className="text-sm mt-2">This month</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiTrendingDown} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100 mb-1">Net Balance</p>
              <p className="text-xl sm:text-2xl font-bold">{formatCurrency(financialStats.netBalance)}</p>
              <p className="text-sm mt-2">Available funds</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiDollarSign} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Approvals</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{financialStats.pendingApprovals}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiAlertTriangle} className="text-orange-500 mr-1" />
                <span className="text-sm text-orange-600 font-medium">Requires action</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiClock} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Financial Overview</h3>
          <SafeIcon icon={FiBarChart2} className="text-gray-400" />
        </div>
        <ReactEcharts option={monthlyFinanceData} style={{ height: '350px' }} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <SafeIcon icon={FiClock} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {pendingTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {transaction.priority}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                  <p className="text-sm text-gray-500">By: {transaction.requestedBy}</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Approve</Button>
                  <Button variant="outline" size="sm">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <SafeIcon icon={FiFileText} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SafeIcon 
                    icon={transaction.type === 'Income' ? FiTrendingUp : FiTrendingDown} 
                    className={transaction.type === 'Income' ? 'text-green-500' : 'text-red-500'} 
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <p className="text-sm text-gray-500">{format(new Date(transaction.date), 'MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <SafeIcon icon={FiCheckCircle} className="text-green-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View All Transactions</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountantDashboard;