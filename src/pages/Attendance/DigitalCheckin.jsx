import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiQrCode, 
  FiSmartphone, 
  FiUsers, 
  FiCalendar, 
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiDownload,
  FiSettings,
  FiWifi,
  FiMonitor
} = FiIcons;

const FiSave = (props) => (
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
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17,21 17,13 7,13 7,21"></polyline>
    <polyline points="7,3 7,8 15,8"></polyline>
  </svg>
);

const FiX = (props) => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DigitalCheckin = () => {
  const [activeService, setActiveService] = useState('sunday-morning');
  const [qrCodeActive, setQrCodeActive] = useState(true);
  const [checkinStats, setCheckinStats] = useState({
    totalCheckins: 145,
    mobileCheckins: 89,
    qrCheckins: 56,
    averageTime: '2.3 min'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('https://church.example.com/checkin/sunday-morning');
  const [services, setServices] = useState([
    { id: 'sunday-morning', name: 'Sunday Morning Service', time: '10:00 AM', active: true },
    { id: 'sunday-evening', name: 'Sunday Evening Service', time: '6:00 PM', active: false },
    { id: 'midweek', name: 'Midweek Service', time: '7:00 PM', active: false },
    { id: 'youth', name: 'Youth Service', time: '5:00 PM', active: false }
  ]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    name: '',
    time: '',
    description: ''
  });
  const [settingsData, setSettingsData] = useState({
    qrExpiration: '24',
    autoRefresh: true,
    requireConfirmation: true,
    enableNotifications: true,
    offlineMode: true,
    checkinRadius: '100'
  });


  // Mock data for recent check-ins
  const recentCheckins = [
    { id: 1, name: 'John Smith', time: '09:45 AM', method: 'QR Code', status: 'success' },
    { id: 2, name: 'Sarah Johnson', time: '09:47 AM', method: 'Mobile App', status: 'success' },
    { id: 3, name: 'Mike Wilson', time: '09:50 AM', method: 'QR Code', status: 'success' },
    { id: 4, name: 'Emily Davis', time: '09:52 AM', method: 'Mobile App', status: 'success' },
    { id: 5, name: 'Robert Brown', time: '09:55 AM', method: 'QR Code', status: 'failed' }
  ];

  const generateQRCode = () => {
    const timestamp = new Date().getTime();
    const newUrl = `https://church.example.com/checkin/${activeService}?t=${timestamp}`;
    setQrCodeUrl(newUrl);
    alert('New QR code generated successfully! The previous QR code is now invalid.');
  };

  const handleDownloadQR = () => {
    // Create a canvas to generate QR code image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;
    
    // Simple QR code placeholder (in real app, use QR code library)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QR Code for', 150, 140);
    ctx.fillText(services.find(s => s.id === activeService)?.name || 'Service', 150, 160);
    
    // Download the canvas as image
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-code-${activeService}-${new Date().toISOString().split('T')[0]}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleDisplayMode = () => {
    // Open QR code in fullscreen mode
    const newWindow = window.open('', '_blank', 'fullscreen=yes,scrollbars=no,menubar=no,toolbar=no');
    newWindow.document.write(`
      <html>
        <head>
          <title>QR Code Display</title>
          <style>
            body { 
              margin: 0; 
              padding: 40px; 
              background: #f3f4f6; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
              font-family: Arial, sans-serif;
            }
            .qr-container { 
              background: white; 
              padding: 60px; 
              border-radius: 20px; 
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
              text-align: center;
              border: 8px solid #10b981;
            }
            .qr-code { 
              width: 400px; 
              height: 400px; 
              background: #f9f9f9; 
              border: 2px solid #e5e7eb;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 20px auto;
            }
            h1 { color: #10b981; margin-bottom: 10px; }
            h2 { color: #374151; margin-bottom: 20px; }
            p { color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>Grace Community Church</h1>
            <h2>${services.find(s => s.id === activeService)?.name || 'Service'}</h2>
            <div class="qr-code">
              <div style="text-align: center; color: #10b981;">
                <div style="font-size: 80px; margin-bottom: 20px;">⬜</div>
                <p style="font-size: 18px; font-weight: bold;">Scan to Check In</p>
              </div>
            </div>
            <p>Point your camera at this QR code to check in</p>
            <p style="font-size: 12px; margin-top: 20px;">URL: ${qrCodeUrl}</p>
          </div>
        </body>
      </html>
    `);
  };

  const handleCheckinSettings = () => {
    setShowSettingsModal(true);
  };

  const handleConfigureQR = () => {
    alert('QR Code Configuration:\n\n• Expiration: 24 hours\n• Max uses: Unlimited\n• Security: Enabled\n• Auto-refresh: Every 6 hours\n\nClick OK to modify these settings.');
  };

  const handleAppSettings = () => {
    alert('Mobile App Settings:\n\n• Push notifications: Enabled\n• Offline mode: Enabled\n• Auto check-in radius: 100m\n• Require confirmation: Yes\n\nRedirecting to app configuration...');
  };

  const handleWiFiSetup = () => {
    alert('WiFi-based Check-in Setup:\n\n• Network: ChurchGuest\n• Auto check-in: Disabled\n• Range detection: 50m\n• Require manual confirmation: Yes\n\nContact IT administrator to configure WiFi settings.');
  };

  const handleAddService = () => {
    setNewServiceData({ name: '', time: '', description: '' });
    setShowServiceForm(true);
  };

  const handleToggleService = (serviceId) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, active: !service.active }
        : service
    ));
    
    const service = services.find(s => s.id === serviceId);
    alert(`${service?.name} has been ${service?.active ? 'stopped' : 'started'} successfully!`);
  };

  const handleExportService = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    const csvContent = [
      ['Service', 'Date', 'Time', 'Check-ins', 'Status'],
      [service?.name || 'Unknown', new Date().toISOString().split('T')[0], service?.time || 'N/A', service?.active ? checkinStats.totalCheckins : 0, service?.active ? 'Active' : 'Inactive']
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${serviceId}-checkin-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    
    if (!newServiceData.name.trim() || !newServiceData.time.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newService = {
      id: newServiceData.name.toLowerCase().replace(/\s+/g, '-'),
      name: newServiceData.name,
      time: newServiceData.time,
      active: false
    };
    
    setServices(prev => [...prev, newService]);
    alert(`Service "${newServiceData.name}" has been added successfully!`);
    setShowServiceForm(false);
    setNewServiceData({ name: '', time: '', description: '' });
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewServiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!\n\nNew configuration:\n• QR Expiration: ' + settingsData.qrExpiration + ' hours\n• Auto-refresh: ' + (settingsData.autoRefresh ? 'Enabled' : 'Disabled') + '\n• Notifications: ' + (settingsData.enableNotifications ? 'Enabled' : 'Disabled'));
    setShowSettingsModal(false);
  };

  const handleExportHistory = () => {
    const csvContent = [
      ['Member', 'Check-in Time', 'Method', 'Status', 'Service'],
      ...recentCheckins.map(checkin => [
        checkin.name,
        checkin.time,
        checkin.method,
        checkin.status,
        services.find(s => s.id === activeService)?.name || 'Unknown Service'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checkin-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleQRCode = () => {
    setQrCodeActive(!qrCodeActive);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Check-in</h1>
          <p className="text-gray-600 mt-1">QR code and mobile-based attendance tracking</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FiSettings} onClick={handleCheckinSettings}>
            Check-in Settings
          </Button>
          <Button icon={FiRefreshCw} onClick={generateQRCode}>
            Generate New QR
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.totalCheckins}</p>
              <p className="text-sm text-gray-500 mt-2">Today</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiUsers} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Mobile Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.mobileCheckins}</p>
              <p className="text-sm text-gray-500 mt-2">{Math.round((checkinStats.mobileCheckins / checkinStats.totalCheckins) * 100)}% of total</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiSmartphone} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">QR Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.qrCheckins}</p>
              <p className="text-sm text-gray-500 mt-2">{Math.round((checkinStats.qrCheckins / checkinStats.totalCheckins) * 100)}% of total</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiQrCode} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Check-in Time</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.averageTime}</p>
              <p className="text-sm text-gray-500 mt-2">Per person</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiClock} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">QR Code Check-in</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                qrCodeActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {qrCodeActive ? 'Active' : 'Inactive'}
              </span>
              <button
                onClick={toggleQRCode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  qrCodeActive ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    qrCodeActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          <div className="text-center">
            {/* Service Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Service</label>
              <select
                value={activeService}
                onChange={(e) => setActiveService(e.target.value)}
                className="mx-auto block border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.time}
                  </option>
                ))}
              </select>
            </div>

            {/* QR Code */}
            <div className="bg-white border-4 border-emerald-600 rounded-xl p-8 mb-6 inline-block">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                {qrCodeActive ? (
                  <div className="text-center">
                    <SafeIcon icon={FiQrCode} className="text-6xl text-emerald-600 mb-4" />
                    <p className="text-sm text-gray-600">QR Code for</p>
                    <p className="font-semibold text-emerald-700">
                      {services.find(s => s.id === activeService)?.name}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <SafeIcon icon={FiQrCode} className="text-6xl mb-4" />
                    <p className="text-sm">QR Code Disabled</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Members can scan this QR code to check in to the service
              </p>
              <div className="flex justify-center space-x-3">
                <Button variant="outline" size="sm" icon={FiDownload} onClick={handleDownloadQR}>
                  Download QR
                </Button>
                <Button variant="outline" size="sm" icon={FiMonitor} onClick={handleDisplayMode}>
                  Display Mode
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Check-ins */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Check-ins</h3>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiWifi} className="text-green-500" />
              <span className="text-sm text-green-600 font-medium">Live</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentCheckins.map(checkin => (
              <div key={checkin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {checkin.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{checkin.name}</p>
                    <p className="text-sm text-gray-500">{checkin.method}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{checkin.time}</span>
                  <SafeIcon 
                    icon={checkin.status === 'success' ? FiCheckCircle : FiXCircle} 
                    className={checkin.status === 'success' ? 'text-green-500' : 'text-red-500'} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Mobile Check-in Options */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Mobile Check-in Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiQrCode} className="text-4xl text-emerald-600 mb-4 mx-auto" />
            <h4 className="font-semibold text-gray-900 mb-2">QR Code Scanning</h4>
            <p className="text-sm text-gray-600 mb-4">Members scan QR codes displayed at entrances</p>
            <Button variant="outline" size="sm" onClick={handleConfigureQR}>Configure QR</Button>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiSmartphone} className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h4 className="font-semibold text-gray-900 mb-2">Mobile App Check-in</h4>
            <p className="text-sm text-gray-600 mb-4">Direct check-in through church mobile app</p>
            <Button variant="outline" size="sm" onClick={handleAppSettings}>App Settings</Button>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiWifi} className="text-4xl text-purple-600 mb-4 mx-auto" />
            <h4 className="font-semibold text-gray-900 mb-2">WiFi-based Check-in</h4>
            <p className="text-sm text-gray-600 mb-4">Automatic check-in when connected to church WiFi</p>
            <Button variant="outline" size="sm" onClick={handleWiFiSetup}>WiFi Setup</Button>
          </div>
        </div>
      </Card>

      {/* Service Management */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Service Management</h3>
          <Button icon={FiCalendar} size="sm" onClick={handleAddService}>Add Service</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-ins</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiCalendar} className="text-emerald-500" />
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                      <span className="text-gray-900">{service.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">
                      {service.active ? checkinStats.totalCheckins : '0'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleService(service.id)}
                      >
                        {service.active ? 'Stop' : 'Start'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={FiDownload}
                        onClick={() => handleExportService(service.id)}
                      >
                        Export
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Attendance History */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Check-ins</h3>
          <Button variant="outline" icon={FiDownload} size="sm" onClick={handleExportHistory}>Export History</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-in Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCheckins.map(checkin => (
                <tr key={checkin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {checkin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{checkin.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                      <span className="text-gray-900">{checkin.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      checkin.method === 'QR Code' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {checkin.method}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <SafeIcon 
                      icon={checkin.status === 'success' ? FiCheckCircle : FiXCircle} 
                      className={checkin.status === 'success' ? 'text-green-500' : 'text-red-500'} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DigitalCheckin;