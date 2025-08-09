import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSave, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLock, 
  FiSettings,
  FiUsers,
  FiMessageSquare,
  FiDatabase,
  FiLayout,
  FiGlobe,
  FiAlertTriangle,
  FiClock,
  FiPlusCircle,
  FiImage,
  FiShield,
  FiServer,
  FiHardDrive,
  FiWifi,
  FiMonitor,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiTrash2,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
  FiActivity,
  FiKey,
  FiEye,
  FiEyeOff,
  FiBell,
  FiToggleLeft,
  FiToggleRight
} = FiIcons;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswords, setShowPasswords] = useState({});
  
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    churchName: 'Grace Community Church',
    churchEmail: 'info@gracechurch.org',
    churchPhone: '(555) 123-4567',
    churchAddress: '123 Faith Street, Cityville, ST 12345',
    churchWebsite: 'www.gracechurch.org',
    timeZone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'NGN',
    language: 'English'
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#10b981',
    theme: 'default',
    logoUrl: null,
    enableDarkMode: false,
    compactMode: false
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5,
    lockoutDuration: 15
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    systemAlerts: true,
    maintenanceNotices: true
  });

  // System Health Data
  const systemHealth = {
    status: 'Healthy',
    uptime: '99.9%',
    lastRestart: '2023-05-15 02:00:00',
    cpuUsage: 23,
    memoryUsage: 45,
    diskUsage: 67,
    activeUsers: 12,
    databaseConnections: 8,
    responseTime: '120ms'
  };

  // API Keys and Integrations
  const [apiKeys, setApiKeys] = useState({
    smsProvider: 'Twilio',
    smsApiKey: 'sk_test_••••••••••••••••',
    smsAccountSid: 'AC••••••••••••••••••••••••••••••••',
    smsFromNumber: '+15551234567',
    emailProvider: 'SendGrid',
    emailApiKey: 'SG.••••••••••••••••••••••••••••••••',
    paymentProvider: 'Paystack',
    paystackPublicKey: 'pk_test_••••••••••••••••••••••••••••••••',
    paystackSecretKey: 'sk_test_••••••••••••••••••••••••••••••••'
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    console.log('General settings saved:', generalSettings);
    alert('General settings saved successfully!');
  };

  const handleAppearanceSubmit = (e) => {
    e.preventDefault();
    console.log('Appearance settings saved:', appearanceSettings);
    alert('Appearance settings saved successfully!');
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    console.log('Security settings saved:', securitySettings);
    alert('Security settings saved successfully!');
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    console.log('Notification settings saved:', notificationSettings);
    alert('Notification settings saved successfully!');
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    console.log('API keys saved:', apiKeys);
    alert('API keys saved successfully!');
  };

  const testConnection = (service) => {
    console.log(`Testing ${service} connection...`);
    alert(`Testing ${service} connection... Check console for results.`);
  };

  const performSystemAction = (action) => {
    console.log(`Performing system action: ${action}`);
    alert(`${action} initiated. Check system logs for progress.`);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            systemHealth.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <SafeIcon icon={systemHealth.status === 'Healthy' ? FiCheckCircle : FiXCircle} />
            <span className="text-sm font-medium">System {systemHealth.status}</span>
          </div>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">System Uptime</p>
              <p className="text-3xl font-bold text-gray-900">{systemHealth.uptime}</p>
              <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiActivity} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{systemHealth.activeUsers}</p>
              <p className="text-sm text-gray-500 mt-2">Currently online</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiUsers} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Response Time</p>
              <p className="text-3xl font-bold text-gray-900">{systemHealth.responseTime}</p>
              <p className="text-sm text-gray-500 mt-2">Average</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiClock} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Disk Usage</p>
              <p className="text-3xl font-bold text-gray-900">{systemHealth.diskUsage}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${systemHealth.diskUsage > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${systemHealth.diskUsage}%` }}
                ></div>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiHardDrive} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Card className="p-0 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
          {[
            { id: 'general', label: 'General', icon: FiSettings },
            { id: 'appearance', label: 'Appearance', icon: FiLayout },
            { id: 'security', label: 'Security', icon: FiShield },
            { id: 'notifications', label: 'Notifications', icon: FiBell },
            { id: 'users', label: 'Users & Roles', icon: FiUsers },
            { id: 'integrations', label: 'Integrations', icon: FiWifi },
            { id: 'system', label: 'System', icon: FiServer },
            { id: 'backup', label: 'Backup', icon: FiDatabase },
            { id: 'logs', label: 'Logs', icon: FiAlertTriangle }
          ].map(tab => (
            <button
              key={tab.id}
              className={`py-4 px-6 flex items-center space-x-2 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-600 bg-emerald-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <SafeIcon icon={tab.icon} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <form onSubmit={handleGeneralSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Church Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Church Name*</label>
                    <input 
                      type="text" 
                      value={generalSettings.churchName}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, churchName: e.target.value }))}
                      required
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiMail} className="text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        value={generalSettings.churchEmail}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, churchEmail: e.target.value }))}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiPhone} className="text-gray-400" />
                      </div>
                      <input 
                        type="tel" 
                        value={generalSettings.churchPhone}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, churchPhone: e.target.value }))}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiGlobe} className="text-gray-400" />
                      </div>
                      <input 
                        type="url" 
                        value={generalSettings.churchWebsite}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, churchWebsite: e.target.value }))}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Church Address*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiMapPin} className="text-gray-400" />
                      </div>
                      <textarea 
                        value={generalSettings.churchAddress}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, churchAddress: e.target.value }))}
                        required
                        rows={2}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone*</label>
                    <select 
                      value={generalSettings.timeZone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, timeZone: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="America/New_York">(GMT-05:00) Eastern Time</option>
                      <option value="America/Chicago">(GMT-06:00) Central Time</option>
                      <option value="America/Denver">(GMT-07:00) Mountain Time</option>
                      <option value="America/Los_Angeles">(GMT-08:00) Pacific Time</option>
                      <option value="Europe/London">(GMT) Greenwich Mean Time</option>
                      <option value="Europe/Paris">(GMT+01:00) Central European Time</option>
                      <option value="Africa/Lagos">(GMT+01:00) West Africa Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format*</label>
                    <select 
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (UK)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                      <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency*</label>
                    <select 
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="NGN">NGN (₦) - Nigerian Naira</option>
                      <option value="USD">USD ($) - US Dollar</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="GBP">GBP (£) - British Pound</option>
                      <option value="CAD">CAD (C$) - Canadian Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language*</label>
                    <select 
                      value={generalSettings.language}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Portuguese">Portuguese</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button icon={FiSave} type="submit">Save General Settings</Button>
              </div>
            </form>
          )}

          {activeTab === 'appearance' && (
            <form onSubmit={handleAppearanceSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme & Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="color" 
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="#10b981"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Church Logo</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                        {appearanceSettings.logoUrl ? (
                          <img src={appearanceSettings.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                        ) : (
                          <SafeIcon icon={FiImage} className="text-gray-400 text-2xl" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" icon={FiUpload}>Upload Logo</Button>
                        {appearanceSettings.logoUrl && (
                          <Button variant="outline" size="sm" icon={FiTrash2}>Remove</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Dark Mode</h4>
                      <p className="text-sm text-gray-500">Enable dark theme for the interface</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppearanceSettings(prev => ({ ...prev, enableDarkMode: !prev.enableDarkMode }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearanceSettings.enableDarkMode ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearanceSettings.enableDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Compact Mode</h4>
                      <p className="text-sm text-gray-500">Reduce spacing for more content on screen</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppearanceSettings(prev => ({ ...prev, compactMode: !prev.compactMode }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearanceSettings.compactMode ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearanceSettings.compactMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Default', color: 'emerald', active: appearanceSettings.theme === 'default' },
                    { name: 'Blue', color: 'blue', active: appearanceSettings.theme === 'blue' },
                    { name: 'Purple', color: 'purple', active: appearanceSettings.theme === 'purple' }
                  ].map((theme) => (
                    <div 
                      key={theme.name}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        theme.active ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: theme.name.toLowerCase() }))}
                    >
                      <div className={`w-full h-24 bg-gradient-to-br from-${theme.color}-500 to-${theme.color}-700 rounded-md mb-3`}></div>
                      <h4 className="text-base font-medium text-gray-900">{theme.name} Theme</h4>
                      <p className="text-sm text-gray-500">{theme.color} gradient design</p>
                      {theme.active && (
                        <div className="flex items-center mt-2 text-emerald-600">
                          <SafeIcon icon={FiCheckCircle} className="mr-1" />
                          <span className="text-sm font-medium">Active</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button icon={FiSave} type="submit">Save Appearance Settings</Button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
                    <input 
                      type="number" 
                      min="6"
                      max="20"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      min="5"
                      max="480"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
                    <input 
                      type="number" 
                      min="3"
                      max="10"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: parseInt(e.target.value) }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lockout Duration (minutes)</label>
                    <input 
                      type="number" 
                      min="5"
                      max="60"
                      value={securitySettings.lockoutDuration}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, lockoutDuration: parseInt(e.target.value) }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Require Special Characters</h4>
                      <p className="text-sm text-gray-500">Passwords must contain special characters</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSecuritySettings(prev => ({ ...prev, requireSpecialChars: !prev.requireSpecialChars }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.requireSpecialChars ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.requireSpecialChars ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorAuth ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button icon={FiSave} type="submit">Save Security Settings</Button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleNotificationSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
                    { key: 'weeklyReports', label: 'Weekly Reports', description: 'Automated weekly summary reports' },
                    { key: 'systemAlerts', label: 'System Alerts', description: 'Critical system notifications' },
                    { key: 'maintenanceNotices', label: 'Maintenance Notices', description: 'Scheduled maintenance notifications' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{setting.label}</h4>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotificationSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notificationSettings[setting.key] ? 'bg-emerald-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button icon={FiSave} type="submit">Save Notification Settings</Button>
              </div>
            </form>
          )}

          {activeTab === 'integrations' && (
            <form onSubmit={handleApiKeySubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SMS Provider</label>
                    <select 
                      value={apiKeys.smsProvider}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, smsProvider: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="Twilio">Twilio</option>
                      <option value="Nexmo">Nexmo (Vonage)</option>
                      <option value="MessageBird">MessageBird</option>
                      <option value="AWS SNS">AWS SNS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Number</label>
                    <input 
                      type="text" 
                      value={apiKeys.smsFromNumber}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, smsFromNumber: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+15551234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                    <div className="relative">
                      <input 
                        type={showPasswords.smsApiKey ? "text" : "password"}
                        value={apiKeys.smsApiKey}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, smsApiKey: e.target.value }))}
                        className="block w-full pr-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('smsApiKey')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <SafeIcon icon={showPasswords.smsApiKey ? FiEyeOff : FiEye} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account SID</label>
                    <div className="relative">
                      <input 
                        type={showPasswords.smsAccountSid ? "text" : "password"}
                        value={apiKeys.smsAccountSid}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, smsAccountSid: e.target.value }))}
                        className="block w-full pr-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('smsAccountSid')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <SafeIcon icon={showPasswords.smsAccountSid ? FiEyeOff : FiEye} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => testConnection('SMS')}>Test SMS Connection</Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Provider</label>
                    <select 
                      value={apiKeys.emailProvider}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, emailProvider: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="SendGrid">SendGrid</option>
                      <option value="Mailgun">Mailgun</option>
                      <option value="AWS SES">AWS SES</option>
                      <option value="SMTP">Custom SMTP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                    <div className="relative">
                      <input 
                        type={showPasswords.emailApiKey ? "text" : "password"}
                        value={apiKeys.emailApiKey}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, emailApiKey: e.target.value }))}
                        className="block w-full pr-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('emailApiKey')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <SafeIcon icon={showPasswords.emailApiKey ? FiEyeOff : FiEye} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => testConnection('Email')}>Test Email Connection</Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Provider</label>
                    <select 
                      value={apiKeys.paymentProvider}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, paymentProvider: e.target.value }))}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="Paystack">Paystack</option>
                      <option value="Flutterwave">Flutterwave</option>
                      <option value="Stripe">Stripe</option>
                      <option value="PayPal">PayPal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Public Key</label>
                    <div className="relative">
                      <input 
                        type={showPasswords.paystackPublicKey ? "text" : "password"}
                        value={apiKeys.paystackPublicKey}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, paystackPublicKey: e.target.value }))}
                        className="block w-full pr-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('paystackPublicKey')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <SafeIcon icon={showPasswords.paystackPublicKey ? FiEyeOff : FiEye} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                    <div className="relative">
                      <input 
                        type={showPasswords.paystackSecretKey ? "text" : "password"}
                        value={apiKeys.paystackSecretKey}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, paystackSecretKey: e.target.value }))}
                        className="block w-full pr-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('paystackSecretKey')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <SafeIcon icon={showPasswords.paystackSecretKey ? FiEyeOff : FiEye} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => testConnection('Payment')}>Test Payment Connection</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button icon={FiSave} type="submit">Save Integration Settings</Button>
              </div>
            </form>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <h4 className="font-semibold text-gray-900 mb-3">Server Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="flex items-center space-x-1">
                          <SafeIcon icon={FiCheckCircle} className="text-green-500" />
                          <span className="font-medium text-green-600">Online</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uptime:</span>
                        <span className="font-medium">{systemHealth.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Restart:</span>
                        <span className="font-medium">{systemHealth.lastRestart}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{systemHealth.responseTime}</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <h4 className="font-semibold text-gray-900 mb-3">Resource Usage</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">CPU Usage</span>
                          <span className="font-medium">{systemHealth.cpuUsage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${systemHealth.cpuUsage > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${systemHealth.cpuUsage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Memory Usage</span>
                          <span className="font-medium">{systemHealth.memoryUsage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${systemHealth.memoryUsage > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${systemHealth.memoryUsage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Disk Usage</span>
                          <span className="font-medium">{systemHealth.diskUsage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${systemHealth.diskUsage > 80 ? 'bg-red-500' : 'bg-purple-500'}`}
                            style={{ width: `${systemHealth.diskUsage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Operations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-center p-4"
                    onClick={() => performSystemAction('System Health Check')}
                  >
                    <div className="flex flex-col items-center">
                      <SafeIcon icon={FiActivity} className="text-2xl mb-2" />
                      <span>Health Check</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-center p-4"
                    onClick={() => performSystemAction('Clear Cache')}
                  >
                    <div className="flex flex-col items-center">
                      <SafeIcon icon={FiRefreshCw} className="text-2xl mb-2" />
                      <span>Clear Cache</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-center p-4"
                    onClick={() => performSystemAction('Optimize Database')}
                  >
                    <div className="flex flex-col items-center">
                      <SafeIcon icon={FiDatabase} className="text-2xl mb-2" />
                      <span>Optimize DB</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-center p-4"
                    onClick={() => performSystemAction('Update System')}
                  >
                    <div className="flex flex-col items-center">
                      <SafeIcon icon={FiDownload} className="text-2xl mb-2" />
                      <span>System Update</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-center p-4"
                    onClick={() => performSystemAction('Restart Services')}
                  >
                    <div className="flex flex-col items-center">
                      <SafeIcon icon={FiRefreshCw} className="text-2xl mb-2" />
                      <span>Restart Services</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-center p-4"
                    onClick={() => performSystemAction('Generate Report')}
                  >
                    <div className="flex flex-col items-center">
                      <SafeIcon icon={FiDownload} className="text-2xl mb-2" />
                      <span>System Report</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Automatic Backups</h4>
                      <p className="text-sm text-gray-500">Automatically backup your data at scheduled intervals</p>
                    </div>
                    <button
                      type="button"
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600"
                    >
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                      <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Backup Time</label>
                      <input 
                        type="time" 
                        defaultValue="02:00"
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Retention Period</label>
                      <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="365">1 year</option>
                        <option value="forever">Forever</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Backups</h3>
                  <Button icon={FiDownload} size="sm" onClick={() => performSystemAction('Manual Backup')}>
                    Create Backup Now
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { date: '2023-06-05 02:00 AM', size: '245 MB', status: 'Success', type: 'Automatic' },
                    { date: '2023-06-04 02:00 AM', size: '243 MB', status: 'Success', type: 'Automatic' },
                    { date: '2023-06-03 02:00 AM', size: '241 MB', status: 'Success', type: 'Automatic' },
                    { date: '2023-06-02 02:00 AM', size: '239 MB', status: 'Failed', type: 'Automatic' },
                    { date: '2023-06-01 03:15 PM', size: '238 MB', status: 'Success', type: 'Manual' }
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <SafeIcon 
                          icon={backup.status === 'Success' ? FiCheckCircle : FiXCircle} 
                          className={backup.status === 'Success' ? 'text-green-500' : 'text-red-500'} 
                        />
                        <div>
                          <p className="font-medium text-gray-900">{backup.date}</p>
                          <p className="text-sm text-gray-500">
                            {backup.type} • {backup.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          backup.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {backup.status}
                        </span>
                        {backup.status === 'Success' && (
                          <Button variant="outline" size="sm" icon={FiDownload}>Download</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Restore from Backup</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <SafeIcon icon={FiUpload} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Backup File</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Select a backup file to restore your system data
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Button variant="outline" icon={FiUpload}>Choose File</Button>
                    <Button variant="danger">Restore System</Button>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    ⚠️ Warning: This will overwrite all current data
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>All Levels</option>
                      <option>Error</option>
                      <option>Warning</option>
                      <option>Info</option>
                      <option>Debug</option>
                    </select>
                    <Button variant="outline" size="sm" icon={FiRefreshCw}>Refresh</Button>
                    <Button variant="outline" size="sm" icon={FiDownload}>Export</Button>
                    <Button variant="outline" size="sm" icon={FiTrash2}>Clear Logs</Button>
                  </div>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto bg-gray-900 rounded-lg p-4">
                  {[
                    { time: '2023-06-05 14:30:25', level: 'INFO', message: 'User login successful: admin@gracechurch.org', ip: '192.168.1.100' },
                    { time: '2023-06-05 14:25:12', level: 'INFO', message: 'New member added: John Smith', user: 'admin@gracechurch.org' },
                    { time: '2023-06-05 14:20:45', level: 'WARNING', message: 'Failed login attempt detected', ip: '192.168.1.200' },
                    { time: '2023-06-05 14:15:33', level: 'INFO', message: 'Database backup completed successfully', size: '245 MB' },
                    { time: '2023-06-05 14:10:22', level: 'ERROR', message: 'Email service connection timeout', service: 'SendGrid' },
                    { time: '2023-06-05 14:05:11', level: 'INFO', message: 'SMS sent to 25 recipients', provider: 'Twilio' },
                    { time: '2023-06-05 14:00:00', level: 'INFO', message: 'System health check completed', status: 'Healthy' },
                    { time: '2023-06-05 13:55:44', level: 'WARNING', message: 'High memory usage detected: 85%', threshold: '80%' },
                    { time: '2023-06-05 13:50:33', level: 'INFO', message: 'Attendance record updated', service: 'Sunday Morning' },
                    { time: '2023-06-05 13:45:22', level: 'INFO', message: 'Financial report generated', type: 'Monthly' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm font-mono">
                      <span className="text-gray-400 whitespace-nowrap">{log.time}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${
                        log.level === 'ERROR' ? 'bg-red-900 text-red-200' :
                        log.level === 'WARNING' ? 'bg-yellow-900 text-yellow-200' :
                        log.level === 'INFO' ? 'bg-blue-900 text-blue-200' :
                        'bg-gray-800 text-gray-300'
                      }`}>
                        {log.level}
                      </span>
                      <span className="flex-1 text-gray-300">{log.message}</span>
                      {log.ip && <span className="text-gray-500 text-xs">IP: {log.ip}</span>}
                      {log.user && <span className="text-gray-500 text-xs">User: {log.user}</span>}
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Log Level</label>
                    <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option value="debug">Debug (All logs)</option>
                      <option value="info">Info (Info, Warning, Error)</option>
                      <option value="warning">Warning (Warning, Error)</option>
                      <option value="error">Error (Error only)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Log Retention</label>
                    <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <Button icon={FiSave}>Save Log Settings</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <Button icon={FiPlusCircle} size="sm">Add User</Button>
              </div>
              
              <Card>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2FA</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { 
                          name: 'Admin User', 
                          email: 'admin@gracechurch.org', 
                          role: 'Administrator', 
                          status: 'Active', 
                          lastLogin: '2023-06-04 10:30 AM',
                          twoFactor: true,
                          loginCount: 245
                        },
                        { 
                          name: 'Pastor John', 
                          email: 'pastor@gracechurch.org', 
                          role: 'Pastor', 
                          status: 'Active', 
                          lastLogin: '2023-06-03 09:15 AM',
                          twoFactor: true,
                          loginCount: 189
                        },
                        { 
                          name: 'Sarah Johnson', 
                          email: 'sarah@gracechurch.org', 
                          role: 'Accountant', 
                          status: 'Active', 
                          lastLogin: '2023-06-02 02:45 PM',
                          twoFactor: false,
                          loginCount: 156
                        },
                        { 
                          name: 'Michael Brown', 
                          email: 'michael@gracechurch.org', 
                          role: 'Info Unit', 
                          status: 'Inactive', 
                          lastLogin: '2023-05-20 11:20 AM',
                          twoFactor: false,
                          loginCount: 89
                        }
                      ].map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-xs text-gray-400">{user.loginCount} logins</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <SafeIcon icon={FiClock} className="text-gray-400" />
                              <span>{user.lastLogin}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <SafeIcon 
                              icon={user.twoFactor ? FiShield : FiAlertTriangle} 
                              className={user.twoFactor ? 'text-green-500' : 'text-orange-500'} 
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <SafeIcon icon={FiEdit} />
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                <SafeIcon icon={FiKey} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
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
              
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
                <div className="space-y-4">
                  {[
                    { 
                      name: 'Administrator', 
                      description: 'Full system access with all permissions',
                      permissions: ['All Modules', 'User Management', 'System Settings', 'Reports'],
                      users: 1
                    },
                    { 
                      name: 'Pastor', 
                      description: 'Access to pastoral care and member management',
                      permissions: ['Members', 'Visitors', 'Prayer Requests', 'Reports'],
                      users: 1
                    },
                    { 
                      name: 'Accountant', 
                      description: 'Access to financial records and reports',
                      permissions: ['Finance', 'Reports', 'Branch Management'],
                      users: 1
                    },
                    { 
                      name: 'Info Unit', 
                      description: 'Access to member data and communications',
                      permissions: ['Members', 'Visitors', 'Communications'],
                      users: 1
                    }
                  ].map((role, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-base font-medium text-gray-900">{role.name}</h4>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            {role.users} user{role.users !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{role.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, idx) => (
                            <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" icon={FiEdit}>Edit Permissions</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;