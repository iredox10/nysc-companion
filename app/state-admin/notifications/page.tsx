'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaBell, FaBullhorn, FaEye, FaEdit, FaTrash, FaPlus, FaPaperPlane, FaUsers, FaCalendar, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';

const StateAdminNotifications = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [selectedNotificationType, setSelectedNotificationType] = useState('general');
  const [selectedRecipients, setSelectedRecipients] = useState('all-users');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const notificationTypes = [
    { value: 'general', label: 'General Update', icon: FaBell, color: 'blue' },
    { value: 'announcement', label: 'Official Announcement', icon: FaBullhorn, color: 'purple' },
    { value: 'alert', label: 'Important Alert', icon: FaExclamationTriangle, color: 'orange' },
    { value: 'emergency', label: 'Emergency Notice', icon: FaExclamationTriangle, color: 'red' },
    { value: 'info', label: 'Information', icon: FaInfoCircle, color: 'blue' },
    { value: 'success', label: 'Success Message', icon: FaCheckCircle, color: 'green' }
  ];

  const recipientOptions = [
    { value: 'all-users', label: 'All Users', count: '45,230' },
    { value: 'corps-members', label: 'Corps Members Only', count: '12,450' },
    { value: 'business-owners', label: 'Business Owners', count: '8,920' },
    { value: 'active-users', label: 'Active Users (Last 30 Days)', count: '28,340' },
    { value: 'new-users', label: 'New Users (Last 7 Days)', count: '1,240' },
    { value: 'verified-users', label: 'Verified Users', count: '32,180' }
  ];

  // Mock sent notifications
  const sentNotifications = [
    {
      id: 'NOT001',
      title: 'Platform Maintenance Scheduled',
      message: 'We will be performing scheduled maintenance on our platform this weekend...',
      type: 'announcement',
      recipients: 'all-users',
      sentDate: '2025-09-07T14:30:00',
      status: 'delivered',
      deliveryRate: '98.5%',
      openRate: '76.2%',
      clickRate: '12.4%',
      totalSent: 45230,
      totalDelivered: 44552,
      totalOpened: 34212,
      totalClicked: 5572
    },
    {
      id: 'NOT002',
      title: 'New Business Categories Available',
      message: 'We\'ve added new business categories to help you better classify your listings...',
      type: 'info',
      recipients: 'business-owners',
      sentDate: '2025-09-06T10:15:00',
      status: 'delivered',
      deliveryRate: '99.1%',
      openRate: '82.3%',
      clickRate: '24.1%',
      totalSent: 8920,
      totalDelivered: 8840,
      totalOpened: 7278,
      totalClicked: 2151
    },
    {
      id: 'NOT003',
      title: 'Security Alert: Update Your Password',
      message: 'As part of our ongoing security improvements, we recommend updating your password...',
      type: 'alert',
      recipients: 'all-users',
      sentDate: '2025-09-05T16:45:00',
      status: 'delivered',
      deliveryRate: '97.8%',
      openRate: '85.6%',
      clickRate: '45.2%',
      totalSent: 45230,
      totalDelivered: 44235,
      totalOpened: 37865,
      totalClicked: 19996
    }
  ];

  // Mock scheduled notifications
  const scheduledNotifications = [
    {
      id: 'SCH001',
      title: 'Weekend Service Hours Update',
      message: 'Please note that our customer service hours will be modified this weekend...',
      type: 'general',
      recipients: 'all-users',
      scheduledDate: '2025-09-08T09:00:00',
      status: 'scheduled'
    },
    {
      id: 'SCH002',
      title: 'Monthly Business Report Available',
      message: 'Your monthly business performance report is now ready for download...',
      type: 'info',
      recipients: 'business-owners',
      scheduledDate: '2025-09-10T08:00:00',
      status: 'scheduled'
    }
  ];

  const getTypeIcon = (type: string) => {
    const typeConfig = notificationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : FaBell;
  };

  const getTypeColor = (type: string) => {
    const typeConfig = notificationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'gray';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSendNotification = () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate sending notification
    alert(`Notification "${notificationTitle}" sent successfully to ${selectedRecipients}!`);
    
    // Reset form
    setNotificationTitle('');
    setNotificationMessage('');
    setScheduleDate('');
    setIsUrgent(false);
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

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Send notifications and manage communications for Lagos State</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'send', label: 'Send Notification', icon: FaPaperPlane },
                { key: 'sent', label: 'Sent Notifications', icon: FaBell },
                { key: 'scheduled', label: 'Scheduled', icon: FaCalendar }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Send Notification Tab */}
            {activeTab === 'send' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send New Notification</h2>
                
                {/* Notification Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Notification Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {notificationTypes.map(type => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setSelectedNotificationType(type.value)}
                          className={`p-3 text-left border rounded-lg transition-colors ${
                            selectedNotificationType === type.value
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-4 h-4 text-${type.color}-600`} />
                            <span className="text-sm font-medium text-gray-900">{type.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recipients */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={selectedRecipients}
                    onChange={(e) => setSelectedRecipients(e.target.value)}
                  >
                    {recipientOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.count} users)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter notification title..."
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your notification message..."
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">{notificationMessage.length}/500 characters</p>
                </div>

                {/* Options */}
                <div className="mb-6 space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Mark as urgent (high priority)</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule for Later (Optional)</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Send Button */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSendNotification}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    {scheduleDate ? 'Schedule Notification' : 'Send Now'}
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            )}

            {/* Sent Notifications Tab */}
            {activeTab === 'sent' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Sent Notifications</h2>
                  <div className="text-sm text-gray-600">
                    Total: {sentNotifications.length} notifications
                  </div>
                </div>

                <div className="space-y-4">
                  {sentNotifications.map(notification => {
                    const TypeIcon = getTypeIcon(notification.type);
                    return (
                      <div key={notification.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <TypeIcon className={`w-5 h-5 text-${getTypeColor(notification.type)}-600`} />
                            <div>
                              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                              <p className="text-sm text-gray-600">{getTimeAgo(notification.sentDate)}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                            {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4">{notification.message}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{notification.totalSent.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Sent</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{notification.deliveryRate}</p>
                            <p className="text-sm text-gray-600">Delivered</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{notification.openRate}</p>
                            <p className="text-sm text-gray-600">Opened</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{notification.clickRate}</p>
                            <p className="text-sm text-gray-600">Clicked</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Recipients: {notification.recipients.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <FaEdit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scheduled Notifications Tab */}
            {activeTab === 'scheduled' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Scheduled Notifications</h2>
                  <div className="text-sm text-gray-600">
                    {scheduledNotifications.length} scheduled notifications
                  </div>
                </div>

                <div className="space-y-4">
                  {scheduledNotifications.map(notification => {
                    const TypeIcon = getTypeIcon(notification.type);
                    return (
                      <div key={notification.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <TypeIcon className={`w-5 h-5 text-${getTypeColor(notification.type)}-600`} />
                            <div>
                              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                              <p className="text-sm text-gray-600">Scheduled for: {formatScheduledDate(notification.scheduledDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                              {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{notification.message}</p>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Recipients: {notification.recipients.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminNotifications;
