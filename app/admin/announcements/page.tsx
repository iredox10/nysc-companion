'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaFilter, FaSearch } from 'react-icons/fa';

const mockAnnouncements = [
  {
    id: 'ann1',
    title: 'Batch A Orientation Camp Update',
    content: 'All Batch A corps members are required to report to their designated orientation camps by March 1st, 2024...',
    type: 'orientation',
    priority: 'high',
    targetAudience: 'batch-a-2024',
    targetStates: ['All'],
    createdBy: 'NYSC Admin',
    createdDate: '2024-02-20',
    publishDate: '2024-02-21',
    expiryDate: '2024-03-05',
    status: 'published',
    views: 1247,
    isSticky: true
  },
  {
    id: 'ann2',
    title: 'Monthly Allowance Payment Schedule',
    content: 'Corps members allowance for February 2024 will be paid on the 25th of the month...',
    type: 'allowance',
    priority: 'medium',
    targetAudience: 'all-active',
    targetStates: ['Kwara', 'Lagos', 'Ogun'],
    createdBy: 'Finance Team',
    createdDate: '2024-02-15',
    publishDate: '2024-02-15',
    expiryDate: '2024-02-28',
    status: 'published',
    views: 892,
    isSticky: false
  },
  {
    id: 'ann3',
    title: 'PPA Clearance Process Guidelines',
    content: 'Updated guidelines for Primary Place of Assignment clearance procedures...',
    type: 'clearance',
    priority: 'medium',
    targetAudience: 'completing-service',
    targetStates: ['All'],
    createdBy: 'Operations Team',
    createdDate: '2024-02-10',
    publishDate: '2024-02-12',
    expiryDate: '2024-03-12',
    status: 'draft',
    views: 0,
    isSticky: false
  }
];

const AnnouncementsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || announcement.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || announcement.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || announcement.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'published': { bg: 'bg-green-100', text: 'text-green-700' },
      'draft': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'archived': { bg: 'bg-gray-100', text: 'text-gray-700' },
      'scheduled': { bg: 'bg-blue-100', text: 'text-blue-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
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
      'orientation': { bg: 'bg-purple-100', text: 'text-purple-700' },
      'allowance': { bg: 'bg-green-100', text: 'text-green-700' },
      'clearance': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'general': { bg: 'bg-gray-100', text: 'text-gray-700' },
    };
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.general;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Announcements</h1>
            <p className="text-gray-600">Create and manage official NYSC announcements</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
              <FaPlus />
              Create Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Announcements</p>
              <p className="text-3xl font-black text-gray-800">{mockAnnouncements.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-3xl font-black text-gray-800">{mockAnnouncements.filter(a => a.status === 'published').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Draft</p>
              <p className="text-3xl font-black text-gray-800">{mockAnnouncements.filter(a => a.status === 'draft').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-3xl font-black text-gray-800">{mockAnnouncements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-purple-600 text-xl" />
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
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Types</option>
            <option value="orientation">Orientation</option>
            <option value="allowance">Allowance</option>
            <option value="clearance">Clearance</option>
            <option value="general">General</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
            <option value="scheduled">Scheduled</option>
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

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className={`bg-white rounded-2xl shadow-lg p-6 ${announcement.isSticky ? 'border-l-4 border-red-500' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{announcement.title}</h3>
                  {announcement.isSticky && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                      PINNED
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{announcement.content}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {getTypeBadge(announcement.type)}
                  {getPriorityBadge(announcement.priority)}
                  {getStatusBadge(announcement.status)}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Created:</span> {new Date(announcement.createdDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Published:</span> {new Date(announcement.publishDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Expires:</span> {new Date(announcement.expiryDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Views:</span> {announcement.views.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaEye />
                </button>
                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>By: {announcement.createdBy}</span>
                  <span>Target: {announcement.targetAudience.replace('-', ' ').toUpperCase()}</span>
                  <span>States: {announcement.targetStates.join(', ')}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs font-medium">
                    View Details
                  </button>
                  {announcement.status === 'draft' && (
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-xs font-medium">
                      Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-16">
          <FaBullhorn className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No announcements found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default AnnouncementsPage;
