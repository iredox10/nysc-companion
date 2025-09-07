'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaEye, FaThumbtack, FaCalendar, FaUsers, FaChartBar, FaFlag, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const StateAdminAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    priority: 'normal',
    targetAudience: 'all-users',
    expiryDate: '',
    isPinned: false,
    showOnDashboard: true
  });

  const announcementTypes = [
    { value: 'general', label: 'General Announcement', icon: FaBullhorn, color: 'blue' },
    { value: 'update', label: 'Platform Update', icon: FaInfoCircle, color: 'purple' },
    { value: 'maintenance', label: 'Maintenance Notice', icon: FaExclamationTriangle, color: 'orange' },
    { value: 'emergency', label: 'Emergency Alert', icon: FaFlag, color: 'red' },
    { value: 'success', label: 'Success Story', icon: FaCheckCircle, color: 'green' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low Priority', color: 'gray' },
    { value: 'normal', label: 'Normal Priority', color: 'blue' },
    { value: 'high', label: 'High Priority', color: 'orange' },
    { value: 'urgent', label: 'Urgent', color: 'red' }
  ];

  const targetAudiences = [
    { value: 'all-users', label: 'All Users', count: '45,230' },
    { value: 'corps-members', label: 'Corps Members', count: '12,450' },
    { value: 'business-owners', label: 'Business Owners', count: '8,920' },
    { value: 'state-coordinators', label: 'State Coordinators', count: '37' },
    { value: 'lga-coordinators', label: 'LGA Coordinators', count: '185' }
  ];

  // Mock announcements data
  const announcements = [
    {
      id: 'ANN001',
      title: 'Platform Maintenance Scheduled for This Weekend',
      content: 'We will be performing scheduled maintenance on our platform this Saturday from 2:00 AM to 6:00 AM. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience this may cause.',
      type: 'maintenance',
      priority: 'high',
      targetAudience: 'all-users',
      author: 'Lagos State Admin',
      createdDate: '2025-09-07T10:30:00',
      expiryDate: '2025-09-09T00:00:00',
      isPinned: true,
      showOnDashboard: true,
      status: 'active',
      views: 15420,
      engagement: 8.5
    },
    {
      id: 'ANN002',
      title: 'New Business Registration Categories Added',
      content: 'We are excited to announce that we have added new business categories to help you better classify your listings. The new categories include: Tech Startups, Food Delivery Services, Digital Marketing Agencies, and more.',
      type: 'update',
      priority: 'normal',
      targetAudience: 'business-owners',
      author: 'Lagos State Admin',
      createdDate: '2025-09-06T14:15:00',
      expiryDate: '2025-09-20T23:59:59',
      isPinned: false,
      showOnDashboard: true,
      status: 'active',
      views: 3240,
      engagement: 12.3
    },
    {
      id: 'ANN003',
      title: 'Corps Member Success Story: Tech Innovation',
      content: 'We are proud to share the success story of Adebayo Johnson, a corps member who developed an innovative mobile app that has now gained over 10,000 downloads. His app connects local farmers with consumers directly.',
      type: 'success',
      priority: 'normal',
      targetAudience: 'corps-members',
      author: 'Lagos State Admin',
      createdDate: '2025-09-05T09:20:00',
      expiryDate: '2025-09-25T23:59:59',
      isPinned: false,
      showOnDashboard: true,
      status: 'active',
      views: 5680,
      engagement: 18.7
    },
    {
      id: 'ANN004',
      title: 'Security Enhancement: Two-Factor Authentication',
      content: 'As part of our ongoing commitment to security, we have implemented two-factor authentication for all user accounts. This additional layer of security helps protect your account from unauthorized access.',
      type: 'update',
      priority: 'high',
      targetAudience: 'all-users',
      author: 'Lagos State Admin',
      createdDate: '2025-09-04T16:45:00',
      expiryDate: '2025-09-15T23:59:59',
      isPinned: false,
      showOnDashboard: false,
      status: 'active',
      views: 12350,
      engagement: 6.8
    },
    {
      id: 'ANN005',
      title: 'Monthly Coordinators Meeting Reminder',
      content: 'This is a reminder that the monthly coordinators meeting is scheduled for this Friday at 10:00 AM. The meeting will be held via video conference. Please confirm your attendance.',
      type: 'general',
      priority: 'normal',
      targetAudience: 'lga-coordinators',
      author: 'Lagos State Admin',
      createdDate: '2025-09-03T11:30:00',
      expiryDate: '2025-09-10T23:59:59',
      isPinned: false,
      showOnDashboard: false,
      status: 'active',
      views: 180,
      engagement: 45.2
    }
  ];

  const getTypeIcon = (type: string) => {
    const typeConfig = announcementTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : FaBullhorn;
  };

  const getTypeColor = (type: string) => {
    const typeConfig = announcementTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'gray';
  };

  const getPriorityColor = (priority: string) => {
    const priorityConfig = priorityLevels.find(p => p.value === priority);
    return priorityConfig ? priorityConfig.color : 'gray';
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

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    switch (activeTab) {
      case 'active':
        return announcement.status === 'active' && !isExpired(announcement.expiryDate);
      case 'pinned':
        return announcement.isPinned;
      case 'expired':
        return isExpired(announcement.expiryDate);
      case 'dashboard':
        return announcement.showOnDashboard;
      default:
        return true;
    }
  });

  const handleCreateAnnouncement = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate creating announcement
    alert(`Announcement "${formData.title}" created successfully!`);
    
    // Reset form and close modal
    setFormData({
      title: '',
      content: '',
      type: 'general',
      priority: 'normal',
      targetAudience: 'all-users',
      expiryDate: '',
      isPinned: false,
      showOnDashboard: true
    });
    setShowCreateModal(false);
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 15) return 'text-green-600';
    if (engagement >= 10) return 'text-blue-600';
    if (engagement >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-2">Manage announcements and communications for Lagos State</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            New Announcement
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Announcements</p>
                <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
              </div>
              <FaBullhorn className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {announcements.filter(a => a.status === 'active' && !isExpired(a.expiryDate)).length}
                </p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pinned</p>
                <p className="text-2xl font-bold text-purple-600">
                  {announcements.filter(a => a.isPinned).length}
                </p>
              </div>
              <FaThumbtack className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-orange-600">
                  {announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </p>
              </div>
              <FaEye className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Announcements' },
                { key: 'active', label: 'Active' },
                { key: 'pinned', label: 'Pinned' },
                { key: 'dashboard', label: 'On Dashboard' },
                { key: 'expired', label: 'Expired' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredAnnouncements.map(announcement => {
                const TypeIcon = getTypeIcon(announcement.type);
                const isExpiredAnnouncement = isExpired(announcement.expiryDate);
                
                return (
                  <div
                    key={announcement.id}
                    className={`border rounded-lg p-6 transition-colors ${
                      isExpiredAnnouncement ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <TypeIcon className={`w-6 h-6 text-${getTypeColor(announcement.type)}-600 mt-1`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-lg font-semibold ${isExpiredAnnouncement ? 'text-gray-600' : 'text-gray-900'}`}>
                              {announcement.title}
                            </h3>
                            {announcement.isPinned && (
                              <FaThumbtack className="w-4 h-4 text-purple-600" />
                            )}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getPriorityColor(announcement.priority)}-100 text-${getPriorityColor(announcement.priority)}-800`}>
                              {announcement.priority}
                            </span>
                            {isExpiredAnnouncement && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                Expired
                              </span>
                            )}
                          </div>
                          <p className={`${isExpiredAnnouncement ? 'text-gray-500' : 'text-gray-700'} mb-3`}>
                            {announcement.content}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span>By {announcement.author}</span>
                            <span>{getTimeAgo(announcement.createdDate)}</span>
                            <span>Target: {targetAudiences.find(t => t.value === announcement.targetAudience)?.label}</span>
                            <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <FaEye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{announcement.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaChartBar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${getEngagementColor(announcement.engagement)}`}>
                          {announcement.engagement}% engagement
                        </span>
                      </div>
                      {announcement.showOnDashboard && (
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">On Dashboard</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-12">
                <FaBullhorn className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No announcements found for this filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Create Announcement Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create New Announcement</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter announcement title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter announcement content..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                {/* Type and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      {announcementTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      {priorityLevels.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Target Audience and Expiry Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    >
                      {targetAudiences.map(audience => (
                        <option key={audience.value} value={audience.value}>
                          {audience.label} ({audience.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPinned}
                      onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pin this announcement</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.showOnDashboard}
                      onChange={(e) => setFormData({ ...formData, showOnDashboard: e.target.checked })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show on dashboard</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateAnnouncement}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaPlus className="w-4 h-4" />
                    Create Announcement
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminAnnouncements;
