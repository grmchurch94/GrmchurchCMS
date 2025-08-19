import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import OfferingForm from '../../components/Finance/OfferingForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';
import ReactEcharts from 'echarts-for-react';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiDownload,
  FiPieChart,
  FiBarChart2
} = FiIcons;

const Offering = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [showOfferingForm, setShowOfferingForm] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [filterCollector, setFilterCollector] = useState('all');
  const [filterAmountRange, setFilterAmountRange] = useState({ min: '', max: '' });
  const [offerings, setOfferings] = useState(() => {
    const savedOfferings = localStorage.getItem('churchOfferings');
    if (savedOfferings) {
      return JSON.parse(savedOfferings);
    }
    return [
      {
        id: 1,
        date: '2023-06-04',
        service: 'Sunday Morning Service',
        totalAmount: 125000.00,
        cashAmount: 45000.00,
        transferAmount: 50000.00,
        posAmount: 30000.00,
        collectedBy: 'Deacon Michael',
        countedBy: 'Finance Team',
        notes: 'Special offering for building fund included'
      },
      {
        id: 2,
        date: '2023-05-28',
        service: 'Sunday Morning Service',
        totalAmount: 98000.00,
        cashAmount: 38000.00,
        transferAmount: 40000.00,
        posAmount: 20000.00,
        collectedBy: 'Deacon Sarah',
        countedBy: 'Finance Team',
        notes: ''
      },
      {
        id: 3,
        date: '2023-05-24',
        service: 'Midweek Service',
        totalAmount: 35000.00,
        cashAmount: 20000.00,
        transferAmount: 15000.00,
        posAmount: 0.00,
        collectedBy: 'Elder John',
        countedBy: 'Finance Team',
        notes: 'Lower attendance due to weather'
      },
      {
        id: 4,
        date: '2023-05-21',
        service: 'Sunday Morning Service',
        totalAmount: 110000.00,
        cashAmount: 42000.00,
        transferAmount: 48000.00,
        posAmount: 20000.00,
        collectedBy: 'Deacon Michael',
        countedBy: 'Finance Team',
        notes: ''
      },
      {
        id: 5,
        date: '2023-05-17',
        service: 'Midweek Service',
        totalAmount: 28000.00,
        cashAmount: 18000.00,
        transferAmount: 10000.00,
        posAmount: 0.00,
        collectedBy: 'Elder Sarah',
        countedBy: 'Finance Team',
        notes: ''
      }
    ];
  });

  // Save offerings to localStorage whenever offerings state changes
  React.useEffect(() => {
    localStorage.setItem('churchOfferings', JSON.stringify(offerings));
  }, [offerings]);


  // Calculate stats
  const totalOfferings = offerings.reduce((sum, offering) => sum + offering.totalAmount, 0);
  const averageOffering = totalOfferings / offerings.length;
  const cashTotal = offerings.reduce((sum, offering) => sum + offering.cashAmount, 0);
  const digitalTotal = offerings.reduce((sum, offering) => sum + offering.transferAmount + offering.posAmount, 0);

  // Chart data for payment methods
  const paymentMethodsData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ₦{c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: ['Cash', 'Bank Transfer', 'POS/Card']
    },
    series: [
      {
        name: 'Payment Methods',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: cashTotal, name: 'Cash' },
          { value: offerings.reduce((sum, o) => sum + o.transferAmount, 0), name: 'Bank Transfer' },
          { value: offerings.reduce((sum, o) => sum + o.posAmount, 0), name: 'POS/Card' }
        ],
        color: ['#10b981', '#3b82f6', '#8b5cf6']
      }
    ]
  };

  // Weekly trend data
  const weeklyTrendData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: offerings.map(o => format(new Date(o.date), 'MMM d')).reverse()
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '₦{value}'
        }
      }
    ],
    series: [
      {
        name: 'Offering Amount',
        type: 'bar',
        data: offerings.map(o => o.totalAmount).reverse(),
        color: '#10b981',
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
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

  const filteredOfferings = offerings.filter(offering => {
    const matchesSearch = offering.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          offering.collectedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || offering.date === filterDate;
    const matchesService = filterService === 'all' || offering.service === filterService;
    const matchesCollector = filterCollector === 'all' || offering.collectedBy === filterCollector;
    const matchesAmountRange = (!filterAmountRange.min || offering.totalAmount >= parseFloat(filterAmountRange.min)) &&
                               (!filterAmountRange.max || offering.totalAmount <= parseFloat(filterAmountRange.max));
    return matchesSearch && matchesDate && matchesService && matchesCollector && matchesAmountRange;
  });

  // Get unique collectors for filter dropdown
  const collectors = [...new Set(offerings.map(offering => offering.collectedBy))];

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offering Management</h1>
          <p className="text-gray-600 mt-1">Track and manage church offerings and collections</p>
        </div>
        <Button icon={FiPlus}>
          Record Offering
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-100 mb-1">Total Offerings</p>
              <p className="text-3xl font-bold">{formatCurrency(totalOfferings)}</p>
              <p className="text-sm mt-2">Last 5 services</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiDollarSign} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average per Service</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(averageOffering)}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiBarChart2} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Cash Collections</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(cashTotal)}</p>
              <p className="text-sm text-gray-500 mt-2">{Math.round((cashTotal / totalOfferings) * 100)}% of total</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiDollarSign} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Digital Payments</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(digitalTotal)}</p>
              <p className="text-sm text-gray-500 mt-2">{Math.round((digitalTotal / totalOfferings) * 100)}% of total</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiPieChart} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Trend</h3>
            <SafeIcon icon={FiBarChart2} className="text-gray-400" />
          </div>
          <ReactEcharts option={weeklyTrendData} style={{ height: '300px' }} />
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <SafeIcon icon={FiPieChart} className="text-gray-400" />
          </div>
          <ReactEcharts option={paymentMethodsData} style={{ height: '300px' }} />
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search offerings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Services</option>
              <option value="Sunday Morning Service">Sunday Morning</option>
              <option value="Midweek Service">Midweek</option>
            </select>
            <div className="relative">
              <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
            <Button variant="outline" icon={FiDownload} size="sm" onClick={handleExportOfferings}>Export</Button>
          </div>
        </div>
      </Card>

      {/* More Filters Panel */}
      {showMoreFilters && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Collected By</label>
              <select
                value={filterCollector}
                onChange={(e) => setFilterCollector(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Collectors</option>
                {collectors.map((collector, index) => (
                  <option key={index} value={collector}>{collector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">₦</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={filterAmountRange.min}
                  onChange={(e) => setFilterAmountRange(prev => ({ ...prev, min: e.target.value }))}
                  className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">₦</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={filterAmountRange.max}
                  onChange={(e) => setFilterAmountRange(prev => ({ ...prev, max: e.target.value }))}
                  className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </Card>
      )}
      {/* Offerings List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cash</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Digital</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Collected By</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfferings.map((offering) => (
                <tr key={offering.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-emerald-500" />
                      <span>{format(new Date(offering.date), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{offering.service}</td>
                  <td className="py-4 px-4 font-semibold text-emerald-600">
                    {formatCurrency(offering.totalAmount)}
                  </td>
                  <td className="py-4 px-4">{formatCurrency(offering.cashAmount)}</td>
                  <td className="py-4 px-4">{formatCurrency(offering.transferAmount + offering.posAmount)}</td>
                  <td className="py-4 px-4">{offering.collectedBy}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleEditOffering(offering)}
                        title="Edit Offering"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleDownloadOffering(offering)}
                        title="Download Receipt"
                      >
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeleteOffering(offering.id)}
                        title="Delete Offering"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Offering Form Modal */}
      {showOfferingForm && (
        <OfferingForm 
          initialData={selectedOffering} 
          onClose={() => {
            setShowOfferingForm(false);
            setSelectedOffering(null);
          }} 
          onSubmit={selectedOffering ? handleUpdateOffering : handleAddOffering} 
        />
      )}
    </div>
  );
};

export default Offering;