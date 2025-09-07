'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaExclamationTriangle, FaEye, FaCheck, FaTimes, FaFlag, FaUser, FaComment, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';

const mockReports = [
  {
    id: 'rep1',
    type: 'inappropriate_content',
    title: 'Inappropriate listing content',
    description: 'This accommodation listing contains misleading information and inappropriate photos.',
    reportedItem: {
      type: 'listing',
      id: 'list123',
      title: 'Budget Lodge Ilorin',
      url: '/listings/list123'
    },
    reportedBy: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      id: 'user456'
    },
    reportDate: '2024-02-20',
    status: 'pending',
    priority: 'high',
    category: 'content',
    assignedTo: null,
    evidence: ['screenshot1.jpg', 'screenshot2.jpg'],
    location: 'Kwara State'
  },
  {
    id: 'rep2',
    type: 'fake_listing',
    title: 'Suspicious restaurant listing',
    description: 'This restaurant appears to be fake with no real location or contact information.',
    reportedItem: {
      type: 'listing',
      id: 'list789',
      title: 'Corpers Kitchen',
      url: '/listings/list789'
    },
    reportedBy: {
      name: 'Mary Johnson',
      email: 'mary.johnson@email.com',
      id: 'user789'
    },
    reportDate: '2024-02-18',
    status: 'investigating',
    priority: 'medium',
    category: 'fraud',
    assignedTo: 'Admin Team',
    evidence: ['report.pdf'],
    location: 'Lagos State'
  },
  {
    id: 'rep3',
    type: 'harassment',
    title: 'Inappropriate user behavior',
    description: 'User posting offensive comments and harassing other corps members.',
    reportedItem: {
      type: 'user',
      id: 'user999',
      title: 'Peter Wilson',
      url: '/users/user999'
    },
    reportedBy: {
      name: 'Sarah Ahmed',
      email: 'sarah.ahmed@email.com',
      id: 'user111'
    },
    reportDate: '2024-02-15',
    status: 'resolved',
    priority: 'high',
    category: 'conduct',
    assignedTo: 'Moderation Team',
    evidence: ['chat_logs.txt'],
    location: 'FCT Abuja'
  }
];

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || report.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || report.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: FaExclamationTriangle },
      'investigating': { bg: 'bg-blue-100', text: 'text-blue-700', icon: FaEye },
      'resolved': { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheck },
      'dismissed': { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaTimes },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
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

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'content': FaComment,
      'fraud': FaExclamationTriangle,
      'conduct': FaUser,
      'spam': FaFlag,
    };
    return icons[category] || FaExclamationTriangle;
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Reports & Moderation</h1>
            <p className="text-gray-600">Review and manage user reports and content moderation</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-3xl font-black text-gray-800">{mockReports.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-black text-gray-800">{mockReports.filter(r => r.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Investigating</p>
              <p className="text-3xl font-black text-gray-800">{mockReports.filter(r => r.status === 'investigating').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-3xl font-black text-gray-800">{mockReports.filter(r => r.status === 'resolved').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCheck className="text-green-600 text-xl" />
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
              placeholder="Search reports..."
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
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
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

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Categories</option>
            <option value="content">Content</option>
            <option value="fraud">Fraud</option>
            <option value="conduct">Conduct</option>
            <option value="spam">Spam</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.map((report) => {
          const CategoryIcon = getCategoryIcon(report.category);
          
          return (
            <div key={report.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <CategoryIcon className="text-red-600 text-xl" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{report.title}</h3>
                      {getPriorityBadge(report.priority)}
                      {getStatusBadge(report.status)}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium text-gray-700">Reported Item:</span></p>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-800">{report.reportedItem.title}</p>
                          <p className="text-xs text-gray-500 capitalize">{report.reportedItem.type}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium text-gray-700">Reported By:</span></p>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-800">{report.reportedBy.name}</p>
                          <p className="text-xs text-gray-500">{report.reportedBy.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium text-gray-700">Details:</span></p>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-800">
                            <FaCalendarAlt className="inline text-gray-400 mr-1" />
                            {new Date(report.reportDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-800">
                            <FaMapMarkerAlt className="inline text-gray-400 mr-1" />
                            {report.location}
                          </p>
                          {report.assignedTo && (
                            <p className="text-sm text-gray-800">
                              <FaUser className="inline text-gray-400 mr-1" />
                              {report.assignedTo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {report.evidence.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Evidence:</p>
                        <div className="flex gap-2">
                          {report.evidence.map((file, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    Investigate
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                    Resolve
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-16">
          <FaExclamationTriangle className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No reports found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default ReportsPage;
