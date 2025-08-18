import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import MemberForm from '../../components/Members/MemberForm';
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
  FiUsers,
  FiDownload,
  FiUpload,
  FiUserCheck,
  FiUserX
} = FiIcons;

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMinistry, setFilterMinistry] = useState('all');
  const [filterJoinDate, setFilterJoinDate] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  // Initialize members from localStorage or use default data
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('churchMembers');
    if (savedMembers) {
      return JSON.parse(savedMembers);
    }
    return [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2023-01-15',
        status: 'Active',
        ministry: 'Worship Team',
        address: '123 Main St, City, State 12345',
        dateOfBirth: '1985-03-20',
        maritalStatus: 'Married',
        occupation: 'Teacher',
        emergencyContact: 'Jane Smith - +1 (555) 123-4568'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        joinDate: '2022-11-08',
        status: 'Active',
        ministry: 'Children Ministry',
        address: '456 Oak Ave, City, State 12345',
        dateOfBirth: '1990-07-12',
        maritalStatus: 'Single',
        occupation: 'Nurse',
        emergencyContact: 'Robert Johnson - +1 (555) 987-6544'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.b@email.com',
        phone: '+1 (555) 456-7890',
        joinDate: '2023-03-22',
        status: 'Active',
        ministry: 'Youth Ministry',
        address: '789 Pine St, City, State 12345',
        dateOfBirth: '1988-12-05',
        maritalStatus: 'Married',
        occupation: 'Engineer',
        emergencyContact: 'Lisa Brown - +1 (555) 456-7891'
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '+1 (555) 234-5678',
        joinDate: '2022-09-14',
        status: 'Inactive',
        ministry: 'Prayer Team',
        address: '321 Elm St, City, State 12345',
        dateOfBirth: '1992-04-18',
        maritalStatus: 'Single',
        occupation: 'Designer',
        emergencyContact: 'Mark Davis - +1 (555) 234-5679'
      },
      {
        id: 5,
        name: 'David Wilson',
        email: 'david.w@email.com',
        phone: '+1 (555) 876-5432',
        joinDate: '2023-02-10',
        status: 'Active',
        ministry: 'Ushering Team',
        address: '654 Maple Ave, City, State 12345',
        dateOfBirth: '1980-09-30',
        maritalStatus: 'Married',
        occupation: 'Manager',
        emergencyContact: 'Carol Wilson - +1 (555) 876-5433'
      }
    ];
  });

  // Save members to localStorage whenever members state changes
  useEffect(() => {
    localStorage.setItem('churchMembers', JSON.stringify(members));
  }, [members]);

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      alert('Member has been deleted successfully!');
    }
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowMemberForm(true);
  };

  const handleAddMember = (formData) => {
    console.log('New member data:', formData);
    
    const newMember = {
      id: Math.max(...members.map(m => m.id), 0) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinDate: formData.joinDate,
      status: formData.status || 'Active',
      ministry: formData.ministry || '',
      address: formData.address || '',
      dateOfBirth: formData.dateOfBirth || '',
      maritalStatus: formData.maritalStatus || '',
      occupation: formData.occupation || '',
      emergencyContact: formData.emergencyContact || ''
    };
    
    setMembers(prevMembers => [...prevMembers, newMember]);
    alert(`Member "${formData.name}" has been added successfully!`);
    setShowMemberForm(false);
    setSelectedMember(null);
  };

  const handleUpdateMember = (formData) => {
    console.log('Updated member data:', formData);
    
    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === selectedMember.id 
          ? { ...member, ...formData }
          : member
      )
    );
    
    alert(`Member "${formData.name}" has been updated successfully!`);
    setShowMemberForm(false);
    setSelectedMember(null);
  };

  const handleExportMembers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Join Date', 'Status', 'Ministry', 'Address', 'Date of Birth', 'Marital Status', 'Occupation', 'Emergency Contact'],
      ...filteredMembers.map(member => [
        member.name,
        member.email,
        member.phone,
        member.joinDate,
        member.status,
        member.ministry,
        member.address || '',
        member.dateOfBirth || '',
        member.maritalStatus || '',
        member.occupation || '',
        member.emergencyContact || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportMembers = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" selected. Import functionality will be implemented to parse and add members from the file.`);
        // TODO: Implement actual CSV/Excel parsing
      }
    };
    input.click();
  };

  const handleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <SafeIcon icon={FiUserCheck} className="text-green-500" />;
      case 'Inactive':
        return <SafeIcon icon={FiUserX} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesMinistry = filterMinistry === 'all' || member.ministry === filterMinistry;
    const matchesJoinDate = !filterJoinDate || member.joinDate === filterJoinDate;
    return matchesSearch && matchesStatus && matchesMinistry && matchesJoinDate;
  });

  // Get unique values for filter dropdowns
  const ministryOptions = [...new Set(members.map(member => member.ministry).filter(Boolean))];

  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const inactiveMembers = members.filter(m => m.status === 'Inactive').length;
  const newThisMonth = members.filter(m => {
    const joinDate = new Date(m.joinDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-1">Manage church membership</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedMember(null);
            setShowMemberForm(true);
          }}
        >
          Add New Member
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Members</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalMembers}</p>
              <p className="text-sm text-gray-500 mt-2">All registered</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiUsers} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Members</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{activeMembers}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiUserCheck} className="text-green-500 mr-1" />
                <span className="text-xs sm:text-sm text-green-600 font-medium">Currently active</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiUserCheck} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Inactive Members</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{inactiveMembers}</p>
              <p className="text-sm text-gray-500 mt-2">Need follow-up</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiUserX} className="text-red-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">New This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{newThisMonth}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs sm:text-sm text-blue-600 font-medium">Recent additions</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiCalendar} className="text-blue-500 text-xl" />
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
                placeholder="Search members..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" icon={FiFilter} size="sm" onClick={handleMoreFilters}>
                More Filters
              </Button>
              <Button variant="outline" icon={FiUpload} size="sm" onClick={handleImportMembers}>
                Import
              </Button>
              <Button variant="outline" icon={FiDownload} size="sm" onClick={handleExportMembers}>
                Export
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* More Filters Panel */}
      {showMoreFilters && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ministry</label>
              <select
                value={filterMinistry}
                onChange={(e) => setFilterMinistry(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Ministries</option>
                {ministryOptions.map((ministry, index) => (
                  <option key={index} value={ministry}>{ministry}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <input
                type="date"
                value={filterJoinDate}
                onChange={(e) => setFilterJoinDate(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilterStatus('all');
                  setFilterMinistry('all');
                  setFilterJoinDate('');
                  setSearchTerm('');
                }}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Members List */}
      <Card>
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 min-w-[180px]">Member</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden md:table-cell min-w-[160px]">Contact</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden sm:table-cell">Join Date</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 hidden lg:table-cell">Ministry</th>
                <th className="text-right py-3 px-3 sm:px-4 font-semibold text-gray-900 min-w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-3 sm:px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">Member since {format(new Date(member.joinDate), 'MMM yyyy')}</p>
                        {/* Show contact info on mobile */}
                        <div className="md:hidden mt-1 space-y-1">
                          <div className="flex items-center space-x-1 text-xs">
                            <SafeIcon icon={FiMail} className="text-gray-400" />
                            <span className="text-gray-600 truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs">
                            <SafeIcon icon={FiPhone} className="text-gray-400" />
                            <span className="text-gray-600">{member.phone}</span>
                          </div>
                        </div>
                        {/* Show join date on mobile */}
                        <div className="sm:hidden mt-1">
                          <div className="flex items-center space-x-1 text-xs">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <span className="text-gray-600">{format(new Date(member.joinDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4 hidden md:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiMail} className="text-gray-400" />
                        <span className="text-gray-600">{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiPhone} className="text-gray-400" />
                        <span className="text-gray-600">{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4 hidden sm:table-cell">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      <span className="text-gray-600">{format(new Date(member.joinDate), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusClass(member.status)}`}>
                      {getStatusIcon(member.status)}
                      <span className="ml-1">{member.status}</span>
                    </span>
                    {/* Show ministry on mobile */}
                    <div className="lg:hidden mt-1">
                      {member.ministry ? (
                        <span className="text-xs text-gray-600">{member.ministry}</span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No ministry</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3 sm:px-4 hidden lg:table-cell">
                    {member.ministry ? (
                      <span className="text-gray-900">{member.ministry}</span>
                    ) : (
                      <span className="text-gray-400 italic">No ministry</span>
                    )}
                  </td>
                  <td className="py-4 px-3 sm:px-4">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleEditMember(member)}
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors hidden sm:block"
                        onClick={() => handleDeleteMember(member.id)}
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
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredMembers.length}</span> of <span className="font-medium">{members.length}</span> members
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

      {/* Add/Edit Member Modal */}
      {showMemberForm && (
        <MemberForm 
          initialData={selectedMember} 
          onClose={() => setShowMemberForm(false)} 
          onSubmit={selectedMember ? handleUpdateMember : handleAddMember} 
        />
      )}
    </div>
  );
};

export default Members;