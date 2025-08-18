import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import MessageForm from '../../components/BulkSms/MessageForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiUsers, 
  FiMessageSquare, 
  FiCalendar,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiPauseCircle,
  FiDownload
} = FiIcons;

const BulkSms = () => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      subject: 'Sunday Service Reminder',
      message: 'Don\'t forget our Sunday service tomorrow at 10:00 AM. We look forward to seeing you there!',
      sentDate: '2023-06-03',
      sentTime: '18:30',
      status: 'Sent',
      recipients: 48,
      delivered: 45,
      failed: 3
    },
    {
      id: 2,
      subject: 'Prayer Meeting Canceled',
      message: 'Due to unforeseen circumstances, tonight\'s prayer meeting has been canceled. We apologize for any inconvenience.',
      sentDate: '2023-06-01',
      sentTime: '12:15',
      status: 'Sent',
      recipients: 20,
      delivered: 20,
      failed: 0
    },
    {
      id: 3,
      subject: 'Youth Camp Registration',
      message: 'Registration for the summer youth camp is now open! Please register by June 15th to secure a spot.',
      sentDate: '2023-05-28',
      sentTime: '09:00',
      status: 'Sent',
      recipients: 35,
      delivered: 32,
      failed: 3
    },
    {
      id: 4,
      subject: 'Volunteer Appreciation Dinner',
      message: 'We invite all volunteers to a special appreciation dinner this Friday at 6:30 PM in the fellowship hall.',
      sentDate: '2023-06-10',
      sentTime: '19:00',
      status: 'Scheduled',
      recipients: 25,
      delivered: 0,
      failed: 0
    },
    {
      id: 5,
      subject: 'Building Fund Update',
      message: 'We\'ve reached 75% of our building fund goal! Thank you for your generous contributions.',
      sentDate: '2023-05-25',
      sentTime: '14:30',
      status: 'Failed',
      recipients: 50,
      delivered: 0,
      failed: 50
    }
  ]);

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
      alert('Message has been deleted successfully!');
    }
  };

  const handleResendMessage = (messageId) => {
    if (window.confirm('Are you sure you want to resend this message?')) {
      setMessages(prevMessages => 
        prevMessages.map(message => 
          message.id === messageId 
            ? { ...message, status: 'Sent', sentDate: new Date().toISOString().split('T')[0], sentTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) }
            : message
        )
      );
      alert('Message has been resent successfully!');
    }
  };

  const handleSendMessage = (formData) => {
    console.log('Message data:', formData);
    
    const newMessage = {
      id: Math.max(...messages.map(m => m.id), 0) + 1,
      subject: formData.subject,
      message: formData.message,
      sentDate: formData.isScheduled ? formData.scheduledDate : new Date().toISOString().split('T')[0],
      sentTime: formData.isScheduled ? formData.scheduledTime : new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      status: formData.isScheduled ? 'Scheduled' : 'Sent',
      recipients: formData.recipients === 'all' ? 50 : formData.customRecipients.length,
      delivered: formData.isScheduled ? 0 : (formData.recipients === 'all' ? 48 : formData.customRecipients.length - 1),
      failed: formData.isScheduled ? 0 : 1
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    alert(`Message "${formData.subject}" has been ${formData.isScheduled ? 'scheduled' : 'sent'} successfully!`);
    setShowMessageForm(false);
  };

  const handleExportMessages = () => {
    const csvContent = [
      ['Subject', 'Status', 'Recipients', 'Delivered', 'Failed', 'Date', 'Time'],
      ...filteredMessages.map(message => [
        message.subject,
        message.status,
        message.recipients,
        message.delivered,
        message.failed,
        message.sentDate,
        message.sentTime
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-sms-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sent':
        return <SafeIcon icon={FiCheckCircle} className="text-green-500" />;
      case 'Scheduled':
        return <SafeIcon icon={FiClock} className="text-blue-500" />;
      case 'Sending':
        return <SafeIcon icon={FiSend} className="text-orange-500" />;
      case 'Failed':
        return <SafeIcon icon={FiXCircle} className="text-red-500" />;
      case 'Draft':
        return <SafeIcon icon={FiPauseCircle} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Sending':
        return 'bg-orange-100 text-orange-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesDate = !filterDate || message.sentDate === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate stats
  const totalMessages = messages.length;
  const sentMessages = messages.filter(m => m.status === 'Sent').length;
  const scheduledMessages = messages.filter(m => m.status === 'Scheduled').length;
  const failedMessages = messages.filter(m => m.status === 'Failed').length;
  
  // Calculate total recipients and delivered percentage
  const totalRecipients = messages.reduce((sum, message) => sum + message.recipients, 0);
  const totalDelivered = messages.reduce((sum, message) => sum + message.delivered, 0);
  const deliveryRate = totalRecipients > 0 ? Math.round((totalDelivered / totalRecipients) * 100) : 0;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk SMS</h1>
          <p className="text-gray-600 mt-1">Send messages to members and groups</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => setShowMessageForm(true)}
        >
          Compose Message
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Messages</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalMessages}</p>
              <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiMessageSquare} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Delivery Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{deliveryRate}%</p>
              <div className="flex items-center mt-2">
                <span className="text-xs sm:text-sm text-gray-500">{totalDelivered} of {totalRecipients} delivered</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiCheckCircle} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Scheduled</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{scheduledMessages}</p>
              <p className="text-sm text-gray-500 mt-2">Pending delivery</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiClock} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Failed</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{failedMessages}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiAlertCircle} className="text-red-500 mr-1" />
                <span className="text-xs sm:text-sm text-red-600 font-medium">Requires attention</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiXCircle} className="text-red-500 text-xl" />
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
                placeholder="Search messages..."
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
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="failed">Failed</option>
            </select>
            <div className="relative">
              <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-auto"
              />
            </div>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
            <Button variant="outline" icon={FiDownload} size="sm" onClick={handleExportMessages}>Export</Button>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipients</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Delivery</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{message.subject}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{message.message}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-600">{format(new Date(message.sentDate), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiClock} className="text-gray-400" />
                        <span className="text-gray-600">{message.sentTime}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUsers} className="text-gray-400" />
                      <span className="text-gray-900">{message.recipients}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusClass(message.status)}`}>
                      {getStatusIcon(message.status)}
                      <span className="ml-1">{message.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex flex-col items-end">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${(message.delivered / message.recipients) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {message.delivered}/{message.recipients} ({Math.round((message.delivered / message.recipients) * 100)}%)
                      </span>
                      {message.status === 'Failed' && (
                        <button 
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                          onClick={() => handleResendMessage(message.id)}
                        >
                          Resend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredMessages.length}</span> of <span className="font-medium">{messages.length}</span> messages
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

      {/* Message Form Modal */}
      {showMessageForm && (
        <MessageForm 
          onClose={() => setShowMessageForm(false)} 
          onSubmit={handleSendMessage} 
        />
      )}
    </div>
  );
};

export default BulkSms;