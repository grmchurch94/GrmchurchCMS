import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
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
  const [filterCollector, setFilterCollector] = useState('all');
  const [filterAmountRange, setFilterAmountRange] = useState({ min: '', max: '' });

  // Save offerings to localStorage whenever offerings state changes
  React.useEffect(() => {
    localStorage.setItem('churchOfferings', JSON.stringify(offerings));
  }, [offerings]);

  const handleRecordOffering = () => {
    setSelectedOffering(null);
    setShowOfferingForm(true);
  };

  const handleEditOffering = (offering) => {
    setSelectedOffering(offering);
    setShowOfferingForm(true);
  };

  const handleDeleteOffering = (offeringId) => {
    if (window.confirm('Are you sure you want to delete this offering record? This action cannot be undone.')) {
      setOfferings(prevOfferings => prevOfferings.filter(offering => offering.id !== offeringId));
      alert('Offering record has been deleted successfully!');
    }
  };

  const handleAddOffering = (formData) => {
    console.log('New offering data:', formData);
    
    const newOffering = {
      id: Math.max(...offerings.map(o => o.id), 0) + 1,
      date: formData.date,
      service: formData.service,
      totalAmount: parseFloat(formData.cashAmount) + parseFloat(formData.transferAmount) + parseFloat(formData.posAmount),
      cashAmount: parseFloat(formData.cashAmount),
      transferAmount: parseFloat(formData.transferAmount),
      posAmount: parseFloat(formData.posAmount),
      collectedBy: formData.collectedBy,
      countedBy: formData.countedBy,
      notes: formData.notes
    };
    
    setOfferings(prevOfferings => [...prevOfferings, newOffering]);
    alert(`Offering record for ${formData.service} has been added successfully!`);
    setShowOfferingForm(false);
    setSelectedOffering(null);
  };

  const handleUpdateOffering = (formData) => {
    console.log('Updated offering data:', formData);
    
    setOfferings(prevOfferings => 
      prevOfferings.map(offering => 
        offering.id === selectedOffering.id 
          ? {
              ...offering,
              date: formData.date,
              service: formData.service,
              totalAmount: parseFloat(formData.cashAmount) + parseFloat(formData.transferAmount) + parseFloat(formData.posAmount),
              cashAmount: parseFloat(formData.cashAmount),
              transferAmount: parseFloat(formData.transferAmount),
              posAmount: parseFloat(formData.posAmount),
              collectedBy: formData.collectedBy,
              countedBy: formData.countedBy,
              notes: formData.notes
            }
          : offering
      )
    );
    
    alert(`Offering record for ${formData.service} has been updated successfully!`);
    setShowOfferingForm(false);
    setSelectedOffering(null);
  };

  const handleExportOfferings = () => {
    const csvContent = [
      ['Date', 'Service', 'Total Amount', 'Cash', 'Transfer', 'POS', 'Collected By', 'Counted By', 'Notes'],
      ...filteredOfferings.map(offering => [
        offering.date,
        offering.service,
        offering.totalAmount,
        offering.cashAmount,
        offering.transferAmount,
        offering.posAmount,
        offering.collectedBy,
        offering.countedBy,
        offering.notes
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `offerings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    alert('Offering data has been exported successfully!');
  };

  const handleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterService('all');
    setFilterDate('');
    setFilterCollector('all');
    setFilterAmountRange({ min: '', max: '' });
  };

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

  // Calculate stats from current offerings
  const totalOfferings = offerings.reduce((sum, offering) => sum + offering.totalAmount, 0);
  const averageOffering = totalOfferings / offerings.length;
  const cashTotal = offerings.reduce((sum, offering) => sum + offering.cashAmount, 0);
  const digitalTotal = offerings.reduce((sum, offering) => sum + offering.transferAmount + offering.posAmount, 0);

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
          </div>
        </div>
      </Card>

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
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

// Offering Form Component
const OfferingForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    service: initialData?.service || 'Sunday Morning Service',
    cashAmount: initialData?.cashAmount || '',
    transferAmount: initialData?.transferAmount || '',
    posAmount: initialData?.posAmount || '',
    collectedBy: initialData?.collectedBy || '',
    countedBy: initialData?.countedBy || 'Finance Team',
    notes: initialData?.notes || ''
  });

  const services = [
    'Sunday Morning Service',
    'Sunday Evening Service',
    'Midweek Service',
    'Prayer Meeting',
    'Special Event',
    'Youth Service',
    'Children\'s Service'
  ];

  const collectors = [
    'Deacon Michael',
    'Deacon Sarah',
    'Elder John',
    'Elder Mary',
    'Usher Team',
    'Finance Team'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.cashAmount && !formData.transferAmount && !formData.posAmount) {
      alert('Please enter at least one amount (Cash, Transfer, or POS)');
      return;
    }
    
    onSubmit(formData);
  };

  const totalAmount = (parseFloat(formData.cashAmount) || 0) + 
                     (parseFloat(formData.transferAmount) || 0) + 
                     (parseFloat(formData.posAmount) || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Offering Record' : 'Record New Offering'}
          </h2>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Service Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type*</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Offering Amounts */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Offering Amounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cash Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="cashAmount"
                      min="0"
                      step="0.01"
                      value={formData.cashAmount}
                      onChange={handleChange}
                      className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Transfer</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="transferAmount"
                      min="0"
                      step="0.01"
                      value={formData.transferAmount}
                      onChange={handleChange}
                      className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">POS/Card</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input 
                      type="number" 
                      name="posAmount"
                      min="0"
                      step="0.01"
                      value={formData.posAmount}
                      onChange={handleChange}
                      className="block w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              
              {/* Total Display */}
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                      minimumFractionDigits: 2
                    }).format(totalAmount)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Collection Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Collected By*</label>
                  <select 
                    name="collectedBy"
                    value={formData.collectedBy}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select collector</option>
                    {collectors.map((collector, index) => (
                      <option key={index} value={collector}>{collector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Counted By*</label>
                  <input 
                    type="text" 
                    name="countedBy"
                    value={formData.countedBy}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Who counted the offering"
                  />
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Add any additional notes about this offering collection..."
              />
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Button 
                variant="secondary" 
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                icon={FiSave}
                type="submit"
              >
                {initialData ? 'Update Offering' : 'Save Offering'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Offering;