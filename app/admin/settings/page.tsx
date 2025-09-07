'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaCog, FaSave, FaBell, FaShieldAlt, FaGlobe, FaEnvelope, FaDatabase, FaPalette, FaUsers, FaKey } from 'react-icons/fa';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'NYSC Companion',
      siteDescription: 'Official platform for NYSC corps members',
      adminEmail: 'admin@nysccompanion.org',
      timezone: 'Africa/Lagos',
      language: 'en',
      maintenanceMode: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      announcementAlerts: true,
      reportAlerts: true,
      newUserAlerts: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      requireStrongPasswords: true,
      allowRegistration: true
    },
    content: {
      moderationEnabled: true,
      autoApproveListings: false,
      maxFileSize: 10,
      allowedFileTypes: ['jpg', 'png', 'pdf', 'doc'],
      requireVerification: true,
      contentFiltering: true
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'content', label: 'Content', icon: FaDatabase },
  ];

  const handleSettingChange = (tab: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
          <input
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="ha">Hausa</option>
            <option value="yo">Yoruba</option>
            <option value="ig">Igbo</option>
          </select>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={settings.general.maintenanceMode}
            onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
            Enable Maintenance Mode
          </label>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          When enabled, the site will show a maintenance page to all users except administrators.
        </p>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
        
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <label className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </label>
              <p className="text-xs text-gray-500">
                {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                {key === 'pushNotifications' && 'Browser push notifications for real-time alerts'}
                {key === 'smsNotifications' && 'SMS notifications for critical alerts'}
                {key === 'announcementAlerts' && 'Notifications when new announcements are published'}
                {key === 'reportAlerts' && 'Immediate alerts for new user reports'}
                {key === 'newUserAlerts' && 'Notifications when new users register'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Security Configuration</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
            <input
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-4">
          {['twoFactorAuth', 'requireStrongPasswords', 'allowRegistration'].map((key) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="text-xs text-gray-500">
                  {key === 'twoFactorAuth' && 'Require two-factor authentication for admin accounts'}
                  {key === 'requireStrongPasswords' && 'Enforce strong password requirements'}
                  {key === 'allowRegistration' && 'Allow new user registrations'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security[key as keyof typeof settings.security] as boolean}
                  onChange={(e) => handleSettingChange('security', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Content Management</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
          <input
            type="number"
            value={settings.content.maxFileSize}
            onChange={(e) => handleSettingChange('content', 'maxFileSize', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {settings.content.allowedFileTypes.map((type, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                .{type}
              </span>
            ))}
          </div>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
            + Add file type
          </button>
        </div>

        <div className="space-y-4">
          {['moderationEnabled', 'autoApproveListings', 'requireVerification', 'contentFiltering'].map((key) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="text-xs text-gray-500">
                  {key === 'moderationEnabled' && 'Enable content moderation for all submissions'}
                  {key === 'autoApproveListings' && 'Automatically approve new listing submissions'}
                  {key === 'requireVerification' && 'Require email verification for new accounts'}
                  {key === 'contentFiltering' && 'Enable automatic content filtering for inappropriate content'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.content[key as keyof typeof settings.content] as boolean}
                  onChange={(e) => handleSettingChange('content', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">System Settings</h1>
            <p className="text-gray-600">Configure platform settings and preferences</p>
          </div>
          <button className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
            <FaSave />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'content' && renderContentSettings()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
