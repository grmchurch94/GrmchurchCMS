import React from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiUsers, 
  FiHeart, 
  FiCalendar, 
  FiClock,
  FiPhone,
  FiMail,
  FiBook,
  FiUserPlus,
  FiAlertTriangle,
  FiCheckCircle,
  FiMessageSquare,
  FiVideo,
  FiPlus,
  FiEye
} = FiIcons;

const PastorDashboard = () => {
  // Mock pastoral data
  const pastoralStats = {
    totalMembers: 1234,
    newMembers: 12,
    prayerRequests: 8,
    counselingSessions: 5,
    upcomingSermons: 3,
    visitorFollowUps: 6
  };

  const prayerRequests = [
    {
      id: 1,
      title: 'Healing for Mother',
      requester: 'Sarah Johnson',
      priority: 'High',
      category: 'Health',
      dateSubmitted: '2023-06-04',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Job Search Guidance',
      requester: 'Mike Wilson',
      priority: 'Medium',
      category: 'Career',
      dateSubmitted: '2023-06-03',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Family Reconciliation',
      requester: 'Emily Davis',
      priority: 'High',
      category: 'Family',
      dateSubmitted: '2023-06-01',
      status: 'In Progress'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      type: 'Counseling',
      person: 'Robert Brown',
      date: '2023-06-08',
      time: '2:00 PM',
      topic: 'Marriage Counseling'
    },
    {
      id: 2,
      type: 'Meeting',
      person: 'Church Board',
      date: '2023-06-10',
      time: '10:00 AM',
      topic: 'Monthly Board Meeting'
    },
    {
      id: 3,
      type: 'Visit',
      person: 'John Smith',
      date: '2023-06-12',
      time: '3:00 PM',
      topic: 'Hospital Visit'
    }
  ];

  const membershipGrowth = [
    { month: 'Jan', members: 1180 },
    { month: 'Feb', members: 1195 },
    { month: 'Mar', members: 1210 },
    { month: 'Apr', members: 1220 },
    { month: 'May', members: 1225 },
    { month: 'Jun', members: 1234 }
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pastor's Dashboard</h1>
        <p className="text-blue-100">Shepherd your flock with wisdom and love</p>
      </div>

      {/* Pastoral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Members</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{pastoralStats.totalMembers}</p>
              <p className="text-sm text-gray-500 mt-2">+{pastoralStats.newMembers} this month</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiUsers} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Prayer Requests</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{pastoralStats.prayerRequests}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiHeart} className="text-red-500 mr-1" />
                <span className="text-sm text-red-600 font-medium">Active requests</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiHeart} className="text-red-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Counseling Sessions</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{pastoralStats.counselingSessions}</p>
              <p className="text-sm text-gray-500 mt-2">This week</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiMessageSquare} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prayer Requests */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Active Prayer Requests</h3>
            <SafeIcon icon={FiHeart} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {prayerRequests.map(request => (
              <div key={request.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{request.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {request.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Requested by: {request.requester}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {request.category}
                  </span>
                  <span className="text-xs text-gray-500">{format(new Date(request.dateSubmitted), 'MMM d')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View All Prayer Requests</Button>
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            <SafeIcon icon={FiCalendar} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-md">
                  <SafeIcon icon={FiClock} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{appointment.topic}</h4>
                  <p className="text-sm text-gray-600">{appointment.type} with {appointment.person}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(appointment.date), 'MMM d')} at {appointment.time}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" icon={FiPhone}></Button>
                  <Button variant="outline" size="sm" icon={FiMail}></Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View Calendar</Button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Pastoral Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiHeart} className="text-blue-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Prayer Requests</span>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiUserPlus} className="text-green-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">New Members</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiBook} className="text-purple-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Sermon Prep</span>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiCalendar} className="text-orange-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Schedule Visit</span>
          </button>
          <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiPhone} className="text-red-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Emergency Call</span>
          </button>
          <button className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiMessageSquare} className="text-indigo-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Send Message</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PastorDashboard;