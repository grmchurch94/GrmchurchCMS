import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import VisitorForm from '../../components/Visitors/VisitorForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiMail, 
  FiPhone, 
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiDownload,
  FiUsers
} = FiIcons;

// Custom FiPending icon since it doesn't exist in react-icons
const FiPending = (props) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12" y2="16"></line>
  </svg>
);

const Visitors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  // Mock data for visitors
  const visitors = [
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 987-1234',
      visitDate: '2023-06-04',
      followUpStatus: 'Pending',
      howHeard: 'Friend/Family',
      assignedTo: 'Pastor John'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com',
      phone: '+1 (555) 456-7890',
      visitDate: '2023-06-04',
      followUpStatus: 'In Progress',
      howHeard: 'Website',
      assignedTo: 'Elder Sarah'
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'david.k@email.com',
      phone: '+1 (555) 234-5678',
      visitDate: '2023-05-28',
      followUpStatus: 'Completed',
      howHeard: 'Walk-in',
      assignedTo: 'Deacon Michael'
    },
    {
      id: 4,
      name: 'Lisa Johnson',
      email: 'lisa.j@email.com',
      phone: '+1 (555) 876-5432',
      visitDate: '2023-05-21',
      followUpStatus: 'Not Required',
      howHeard: 'Social Media',
      assignedTo: null
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'james.w@email.com',
      phone: '+1 (555) 345-6789',
      visitDate: '2023-05-21',
      followUpStatus: 'Pending',
      howHeard: 'Advertisement',
      assignedTo: 'Ministry Leader Emily'
    }
  ];

  const handleEditVisitor = (visitor) => {
    setSelectedVisitor(visitor);
    setShowVisitorForm(true);
  };

  const handleAddVisitor = (formData) => {
    console.log('New visitor data:', formData);
    // Here you would add the visitor to your database
    setShowVisitorForm(false);
  };

  const handleUpdateVisitor = (formData) => {
    console.log('Updated visitor data:', formData);
    // Here you would update the visitor in your database
    setShowVisitorForm(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <SafeIcon icon={FiCheckCircle} className="text-green-500" />;
      case 'In Progress':
        return <SafeIcon icon={FiClock} className="text-blue-500" />;
      case 'Pending':
        return <SafeIcon icon={FiPending} className="text-orange-500" />;
      case 'Not Required':
        return <SafeIcon icon={FiAlertCircle} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Not Required':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          visitor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || visitor.followUpStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalVisitors = visitors.length;
  const pendingFollowUps = visitors.filter(v => v.followUpStatus === 'Pending').length;
  const completedFollowUps = visitors.filter(v => v.followUpStatus === 'Completed').length;
  const inProgressFollowUps = visitors.filter(v => v.followUpStatus === 'In Progress').length;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visitors</h1>
          <p className="text-gray-600 mt-1">Track and manage church visitors</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedVisitor(null);
            setShowVisitorForm(true);
          }}
        >
          Add New Visitor
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Visitors</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalVisitors}</p>
              <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiUsers} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Follow-ups</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{pendingFollowUps}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs sm:text-sm text-orange-600 font-medium">Requires attention</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiPending} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{inProgressFollowUps}</p>
              <p className="text-sm text-gray-500 mt-2">Currently being handled</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiClock} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{completedFollowUps}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiCheckCircle} className="text-green-500 mr-1" />
                <span className="text-xs sm:text-sm text-green-600 font-medium">Successfully followed up</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiCheckCircle} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 gap-4">
          <div className="flex-1 max-w-full sm:max-w-md">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Not Required">Not Required</option>
            </select>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
              <Button variant="outline" icon={FiDownload} size="sm">Export</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Visitors List */}
      <Card>
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 min-w-[180px]">Visitor</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden md:table-cell min-w-[160px]">Contact</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden sm:table-cell">Visit Date</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900">Follow-up</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden lg:table-cell">Assigned To</th>
                <th className="text-right py-3 px-3 sm:px-4 font-semibold text-gray-900 min-w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-3 sm:px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {visitor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{visitor.name}</p>
                        <p className="text-sm text-gray-500">Via: {visitor.howHeard}</p>
                        {/* Show contact info on mobile */}
                        <div className="md:hidden mt-1 space-y-1">
                          <div className="flex items-center space-x-1 text-xs">
                            <SafeIcon icon={FiMail} className="text-gray-400" />
                            <span className="text-gray-600 truncate">{visitor.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs">
                            <SafeIcon icon={FiPhone} className="text-gray-400" />
                            <span className="text-gray-600">{visitor.phone}</span>
                          </div>
                        </div>
                        {/* Show visit date on mobile */}
                        <div className="sm:hidden mt-1">
                          <div className="flex items-center space-x-1 text-xs">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <span className="text-gray-600">{format(new Date(visitor.visitDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4 hidden md:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiMail} className="text-gray-400" />
                        <span className="text-gray-600">{visitor.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiPhone} className="text-gray-400" />
                        <span className="text-gray-600">{visitor.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4 hidden sm:table-cell">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      <span className="text-gray-600">{format(new Date(visitor.visitDate), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusClass(visitor.followUpStatus)}`}>
                      {getStatusIcon(visitor.followUpStatus)}
                      <span className="ml-1">{visitor.followUpStatus}</span>
                    </span>
                    {/* Show assigned person on mobile */}
                    <div className="lg:hidden mt-1">
                      {visitor.assignedTo ? (
                        <span className="text-xs text-gray-600">{visitor.assignedTo}</span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Not assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4 hidden lg:table-cell">
                    {visitor.assignedTo ? (
                      <span className="text-gray-900">{visitor.assignedTo}</span>
                    ) : (
                      <span className="text-gray-400 italic">Not assigned</span>
                    )}
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleEditVisitor(visitor)}
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors hidden sm:block">
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredVisitors.length}</span> of <span className="font-medium">{visitors.length}</span> visitors
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Add/Edit Visitor Modal */}
      {showVisitorForm && (
        <VisitorForm 
          initialData={selectedVisitor} 
          onClose={() => setShowVisitorForm(false)} 
          onSubmit={selectedVisitor ? handleUpdateVisitor : handleAddVisitor} 
        />
      )}
    </div>
  );
};

export default Visitors;