import React from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiCalendar, 
  FiHeart, 
  FiDollarSign, 
  FiBook, 
  FiUsers, 
  FiMail,
  FiClock,
  FiMapPin,
  FiPhone,
  FiVideo,
  FiMusic
} = FiIcons;

const MemberDashboard = () => {
  // Mock member data
  const memberData = {
    name: 'John Smith',
    memberSince: '2023-01-15',
    ministry: 'Worship Team',
    attendanceRate: 85,
    totalDonations: 450000.00,
    lastAttendance: '2023-06-04'
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Sunday Morning Service',
      date: '2023-06-11',
      time: '10:00 AM',
      location: 'Main Sanctuary'
    },
    {
      id: 2,
      title: 'Prayer Meeting',
      date: '2023-06-14',
      time: '7:00 PM',
      location: 'Fellowship Hall'
    },
    {
      id: 3,
      title: 'Youth Bible Study',
      date: '2023-06-16',
      time: '6:30 PM',
      location: 'Youth Room'
    }
  ];

  const recentSermons = [
    {
      id: 1,
      title: 'Walking in Faith',
      speaker: 'Pastor John',
      date: '2023-06-04',
      duration: '35:42'
    },
    {
      id: 2,
      title: 'The Power of Prayer',
      speaker: 'Elder Sarah',
      date: '2023-05-28',
      duration: '42:18'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {memberData.name}!</h1>
        <p className="text-emerald-100">Member since {format(new Date(memberData.memberSince), 'MMMM yyyy')}</p>
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{memberData.attendanceRate}%</p>
              <p className="text-sm text-gray-500 mt-2">This year</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiCalendar} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Giving</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(memberData.totalDonations)}</p>
              <p className="text-sm text-gray-500 mt-2">This year</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiDollarSign} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Ministry</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{memberData.ministry}</p>
              <p className="text-sm text-gray-500 mt-2">Active member</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiUsers} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Last Attendance</p>
              <p className="text-sm sm:text-base font-bold text-gray-900">{format(new Date(memberData.lastAttendance), 'MMM d')}</p>
              <p className="text-sm text-gray-500 mt-2">Sunday service</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiClock} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <SafeIcon icon={FiCalendar} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-emerald-100 rounded-md">
                  <SafeIcon icon={FiCalendar} className="text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} className="text-xs" />
                      <span>{format(new Date(event.date), 'MMM d')} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMapPin} className="text-xs" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View All Events</Button>
          </div>
        </Card>

        {/* Recent Sermons */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sermons</h3>
            <SafeIcon icon={FiBook} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentSermons.map(sermon => (
              <div key={sermon.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-md">
                  <SafeIcon icon={FiVideo} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{sermon.title}</h4>
                  <p className="text-sm text-gray-500">{sermon.speaker}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>{format(new Date(sermon.date), 'MMM d, yyyy')}</span>
                    <span>{sermon.duration}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" icon={FiVideo}>Play</Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View All Sermons</Button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiDollarSign} className="text-emerald-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Give Online</span>
          </button>
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiHeart} className="text-blue-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Prayer Request</span>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiMail} className="text-purple-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Contact Pastor</span>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
            <SafeIcon icon={FiPhone} className="text-orange-500 text-2xl mb-2 mx-auto" />
            <span className="text-sm font-medium text-gray-900">Church Directory</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default MemberDashboard;