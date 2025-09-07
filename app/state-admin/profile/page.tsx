'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaUser, FaEdit, FaKey, FaBell, FaShield, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSave, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

const StateAdminProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock admin profile data
  const [profileData, setProfileData] = useState({
    firstName: 'Adebayo',
    lastName: 'Ogundimu',
    email: 'adebayo.ogundimu@nysc.gov.ng',
    phone: '+234 801 234 5678',
    position: 'Lagos State Coordinator',
    state: 'Lagos State',
    lga: 'All LGAs',
    department: 'State Administration',
    staffId: 'NYSC-LAG-001',
    joinDate: '2020-03-15',
    lastLogin: '2025-09-07T14:30:00',
    avatar: null
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newListings: true,
    pendingApprovals: true,
    flaggedContent: true,
    systemUpdates: true,
    weeklyReports: true,
    monthlyReports: true,
    securityAlerts: true,
    corpsUpdates: false,
    lgaReports: true,
    categoryUpdates: false
  });

  // Mock activity log
  const activityLog = [
    {
      id: 'ACT001',
      action: 'Approved listing',
      details: 'Approved "Green Garden Restaurant" listing',
      timestamp: '2025-09-07T14:25:00',
      ipAddress: '192.168.1.100',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'ACT002',
      action: 'Updated category',
      details: 'Modified "Food & Restaurants" category settings',
      timestamp: '2025-09-07T11:45:00',
      ipAddress: '192.168.1.100',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'ACT003',
      action: 'Generated report',
      details: 'Downloaded monthly analytics report',
      timestamp: '2025-09-07T09:15:00',
      ipAddress: '192.168.1.100',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'ACT004',
      action: 'Login',
      details: 'Successful login to admin portal',
      timestamp: '2025-09-07T08:30:00',
      ipAddress: '192.168.1.100',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'ACT005',
      action: 'Flagged content reviewed',
      details: 'Resolved flag on "Tech Hub Lagos" listing',
      timestamp: '2025-09-06T16:20:00',
      ipAddress: '192.168.1.95',
      location: 'Lagos, Nigeria'
    }
  ];

  const handleSaveProfile = () => {
    // Simulate saving profile
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (securityData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // Simulate password change
    alert('Password changed successfully!');
    setSecurityData({
      ...securityData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                      <FaUser className="w-12 h-12 text-green-600" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors">
                    <FaCamera className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-3">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-sm text-gray-600">{profileData.position}</p>
                <p className="text-sm text-gray-500">{profileData.state}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { key: 'profile', label: 'Profile Information', icon: FaUser },
                  { key: 'security', label: 'Security Settings', icon: FaShield },
                  { key: 'notifications', label: 'Notifications', icon: FaBell },
                  { key: 'activity', label: 'Activity Log', icon: FaEye }
                ].map(item => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.key
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {isEditing ? <FaSave className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <input
                        type="text"
                        value={profileData.position}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Staff ID</label>
                      <input
                        type="text"
                        value={profileData.staffId}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={profileData.state}
                          disabled
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={profileData.department}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                        <input
                          type="text"
                          value={new Date(profileData.joinDate).toLocaleDateString()}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                        <input
                          type="text"
                          value={new Date(profileData.lastLogin).toLocaleString()}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>

                  {/* Change Password */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={securityData.currentPassword}
                            onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={securityData.newPassword}
                            onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaKey className="w-4 h-4" />
                      Change Password
                    </button>
                  </div>

                  {/* Security Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => setSecurityData({...securityData, twoFactorEnabled: !securityData.twoFactorEnabled})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            securityData.twoFactorEnabled ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Login Alerts</h4>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <button
                          onClick={() => setSecurityData({...securityData, loginAlerts: !securityData.loginAlerts})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            securityData.loginAlerts ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              securityData.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                    <button
                      onClick={() => alert('Notification settings saved!')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaSave className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Notifications</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'newListings', label: 'New Listings', description: 'When new businesses submit listings for review' },
                          { key: 'pendingApprovals', label: 'Pending Approvals', description: 'Reminders about listings awaiting approval' },
                          { key: 'flaggedContent', label: 'Flagged Content', description: 'When content is flagged for review' },
                          { key: 'systemUpdates', label: 'System Updates', description: 'Platform maintenance and feature updates' }
                        ].map(notification => (
                          <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{notification.label}</h4>
                              <p className="text-sm text-gray-600">{notification.description}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(notification.key, !notificationSettings[notification.key])}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notificationSettings[notification.key] ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notificationSettings[notification.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports & Analytics</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly summary of platform activity' },
                          { key: 'monthlyReports', label: 'Monthly Reports', description: 'Comprehensive monthly analytics' },
                          { key: 'lgaReports', label: 'LGA Reports', description: 'Local Government Area performance updates' }
                        ].map(notification => (
                          <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{notification.label}</h4>
                              <p className="text-sm text-gray-600">{notification.description}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(notification.key, !notificationSettings[notification.key])}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notificationSettings[notification.key] ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notificationSettings[notification.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Log Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Log</h2>
                  <div className="space-y-4">
                    {activityLog.map(activity => (
                      <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{activity.action}</h3>
                            <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{getTimeAgo(activity.timestamp)}</span>
                              <span>IP: {activity.ipAddress}</span>
                              <span>{activity.location}</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminProfile;
