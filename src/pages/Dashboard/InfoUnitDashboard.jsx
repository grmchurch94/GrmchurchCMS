import React from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiMessageSquare, 
  FiMail, 
  FiSend,
  FiUsers, 
  FiCalendar, 
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiGlobe,
  FiEdit,
  FiPlus,
  FiEye,
  FiShare2
} = FiIcons;

const InfoUnitDashboard = () => {
  // Mock communication stats
  const communicationStats = {
    totalMessages: 156,
    emailsSent: 89,
    smsDelivered: 67,
    websiteViews: 2340,
    socialMediaReach: 5670,
    newsletterSubscribers: 890
  };

  const recentCampaigns = [
    {
      id: 1,
      title: 'Sunday Service Reminder',
      type: 'SMS',
      recipients: 450,
      delivered: 445,
      opened: 380,
      date: '2023-06-03',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Weekly Newsletter',
      type: 'Email',
      recipients: 890,
      delivered: 885,
      opened: 620,
      date: '2023-06-01',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Youth Event Invitation',
      type: 'Email',
      recipients: 120,
      delivered: 118,
      opened: 95,
      date: '2023-05-30',
      status: 'Completed'
    }
  ];

  const upcomingAnnouncements = [
    {
      id: 1,
      title: 'Father\'s Day Service',
      scheduledDate: '2023-06-18',
      channels: ['Website', 'Email', 'SMS'],
      status: 'Draft'
    },
    {
      id: 2,
      title: 'Vacation Bible School',
      scheduledDate: '2023-06-20',
      channels: ['Social Media', 'Email'],
      status: 'Scheduled'
    },
    {
      id: 3,
      title: 'Community Outreach',
      scheduledDate: '2023-06-25',
      channels: ['Website', 'SMS'],
      status: 'Draft'
    }
  ];

  const contentCalendar = [
    {
      id: 1,
      title: 'Weekly Bulletin',
      type: 'Newsletter',
      dueDate: '2023-06-09',
      assignedTo: 'Content Team',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Social Media Posts',
      type: 'Social Media',
      dueDate: '2023-06-10',
      assignedTo: 'Social Media Manager',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Event Photography',
      type: 'Media',
      dueDate: '2023-06-11',
      assignedTo: 'Photo Team',
      status: 'Scheduled'
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Information Unit Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage communications and information flow</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FiPlus}>Create Campaign</Button>
          <Button icon={FiMessageSquare}>Send Message</Button>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100 mb-1">Messages Sent</p>
              <p className="text-2xl sm:text-3xl font-bold">{communicationStats.totalMessages}</p>
              <p className="text-sm mt-2">This month</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiSend} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Email Campaigns</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{communicationStats.emailsSent}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+15%</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiMail} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Website Views</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{communicationStats.websiteViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">This month</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiGlobe} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
            <SafeIcon icon={FiSend} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentCampaigns.map(campaign => (
              <div key={campaign.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    campaign.type === 'SMS' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {campaign.type}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Sent</p>
                    <p className="font-medium">{campaign.recipients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delivered</p>
                    <p className="font-medium text-green-600">{campaign.delivered}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Opened</p>
                    <p className="font-medium text-blue-600">{campaign.opened}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{format(new Date(campaign.date), 'MMM d, yyyy')}</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" icon={FiEye}></Button>
                    <Button variant="outline" size="sm" icon={FiShare2}></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Content Calendar */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Content Calendar</h3>
            <SafeIcon icon={FiCalendar} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {contentCalendar.map(content => (
              <div key={content.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{content.title}</h4>
                  <p className="text-sm text-gray-600">{content.type}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>Due: {format(new Date(content.dueDate), 'MMM d')}</span>
                    <span>{content.assignedTo}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(content.status)}`}>
                  {content.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View Full Calendar</Button>
          </div>
        </Card>
      </div>

      {/* Upcoming Announcements */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Announcements</h3>
          <Button icon={FiPlus} size="sm">Add Announcement</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingAnnouncements.map(announcement => (
            <div key={announcement.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(announcement.status)}`}>
                  {announcement.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Scheduled for {format(new Date(announcement.scheduledDate), 'MMM d, yyyy')}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {announcement.channels.map((channel, index) => (
                  <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                    {channel}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" icon={FiEdit}>Edit</Button>
                <Button variant="outline" size="sm" icon={FiSend}>Send Now</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InfoUnitDashboard;