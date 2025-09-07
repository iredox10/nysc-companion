'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaBell, FaPlus, FaEye, FaTrash, FaUsers, FaCalendarAlt, FaFilter, FaSearch, FaPaperPlane, FaCheckCircle, FaClock } from 'react-icons/fa';

const mockNotifications = [
  {
    id: 'notif1',
    title: 'Monthly Allowance Update',
    message: 'Your February allowance has been processed and will be credited to your account within 24 hours.',
    type: 'allowance',
    priority: 'high',
    targetAudience: 'all-active',
    targetStates: ['All'],
    scheduledDate: '2024-02-25T10:00:00',
    status: 'sent',
    sentDate: '2024-02-25T10:00:00',
    recipients: 1247,
    opened: 892,
    clicked: 234,
    createdBy: 'Finance Team'
  },
  {
    id: 'notif2',
    title: 'Orientation Camp Reminder',
    message: 'Reminder: Batch A orientation camp begins in 3 days. Please ensure you have all required documents.',
    type: 'orientation',
    priority: 'high',
    targetAudience: 'batch-a-2024',
    targetStates: ['Kwara', 'Lagos', 'Ogun'],
    scheduledDate: '2024-02-28T09:00:00',
    status: 'scheduled',
    sentDate: null,
    recipients: 456,
    opened: 0,
    clicked: 0,
    createdBy: 'Operations Team'
  },
  {
    id: 'notif3',
    title: 'System Maintenance Notice',
    message: 'The platform will undergo scheduled maintenance on March 1st from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.',
    type: 'system',
    priority: 'medium',
    targetAudience: 'all-users',
    targetStates: ['All'],
    scheduledDate: '2024-02-26T18:00:00',
    status: 'draft',
    sentDate: null,
    recipients: 2341,
    opened: 0,
    clicked: 0,
    createdBy: 'Tech Team'
  }
];

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || notification.status === statusFilter;
    const matchesType = typeFilter === 'All' || notification.type === typeFilter;
    const matchesPriority = priorityFilter === 'All' || notification.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'sent': { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheckCircle },
      'scheduled': { bg: 'bg-blue-100', text: 'text-blue-700', icon: FaClock },
      'draft': { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaEye },
      'failed': { bg: 'bg-red-100', text: 'text-red-700', icon: FaEye },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'high': { bg: 'bg-red-100', text: 'text-red-700' },
      'medium': { bg: 'bg-orange-100', text: 'text-orange-700' },
      'low': { bg: 'bg-blue-100', text: 'text-blue-700' },
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      'allowance': { bg: 'bg-green-100', text: 'text-green-700' },
      'orientation': { bg: 'bg-purple-100', text: 'text-purple-700' },
      'system': { bg: 'bg-gray-100', text: 'text-gray-700' },
      'general': { bg: 'bg-blue-100', text: 'text-blue-700' },
    };
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.general;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const calculateOpenRate = (opened: number, recipients: number) => {
    if (recipients === 0) return 0;
    return ((opened / recipients) * 100).toFixed(1);
  };

  const calculateClickRate = (clicked: number, recipients: number) => {
    if (recipients === 0) return 0;
    return ((clicked / recipients) * 100).toFixed(1);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Notifications</h1>
            <p className="text-gray-600">Send and manage push notifications to users</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium"
            >
              <FaPlus />
              Create Notification
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sent</p>
              <p className="text-3xl font-black text-gray-800">{mockNotifications.filter(n => n.status === 'sent').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaPaperPlane className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-3xl font-black text-gray-800">{mockNotifications.filter(n => n.status === 'scheduled').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Draft</p>
              <p className="text-3xl font-black text-gray-800">{mockNotifications.filter(n => n.status === 'draft').length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <FaBell className="text-gray-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Open Rate</p>
              <p className="text-3xl font-black text-gray-800">71.5%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Types</option>
            <option value="allowance">Allowance</option>
            <option value="orientation">Orientation</option>
            <option value="system">System</option>
            <option value="general">General</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{notification.title}</h3>
                  {getTypeBadge(notification.type)}
                  {getPriorityBadge(notification.priority)}
                  {getStatusBadge(notification.status)}
                </div>
                
                <p className="text-gray-600 mb-4">{notification.message}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Targeting</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-800">Audience: {notification.targetAudience.replace('-', ' ')}</p>
                      <p className="text-sm text-gray-600">States: {notification.targetStates.join(', ')}</p>
                      <p className="text-sm text-gray-600">Recipients: {notification.recipients.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Schedule</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-800">
                        <FaCalendarAlt className="inline text-gray-400 mr-1" />
                        {new Date(notification.scheduledDate).toLocaleString()}
                      </p>
                      {notification.sentDate && (
                        <p className="text-sm text-gray-600">
                          Sent: {new Date(notification.sentDate).toLocaleString()}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">By: {notification.createdBy}</p>
                    </div>
                  </div>
                  
                  {notification.status === 'sent' && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Performance</p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-800">
                          Open Rate: {calculateOpenRate(notification.opened, notification.recipients)}%
                        </p>
                        <p className="text-sm text-gray-600">
                          Opened: {notification.opened.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Click Rate: {calculateClickRate(notification.clicked, notification.recipients)}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button 
                  title="View Details"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaEye />
                </button>
                {notification.status === 'draft' && (
                  <button 
                    title="Send Now"
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FaPaperPlane />
                  </button>
                )}
                <button 
                  title="Delete Notification"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-16">
          <FaBell className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No notifications found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Notification</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter notification title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter notification message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="general">General</option>
                    <option value="allowance">Allowance</option>
                    <option value="orientation">Orientation</option>
                    <option value="system">System</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl hover:bg-gray-700 transition font-medium">
                Save as Draft
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition font-medium">
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default NotificationsPage;
