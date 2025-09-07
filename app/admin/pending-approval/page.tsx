'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaCheck, FaTimes, FaEye, FaUser, FaBook, FaBullhorn, FaComment, FaFlag, FaClock, FaFilter, FaSearch, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const mockPendingItems = [
  {
    id: 'pending1',
    type: 'guide',
    title: 'Complete Guide to Banking in Rivers State',
    author: 'Blessing Okonkwo',
    authorId: 'admin_rivers',
    submittedDate: '2024-02-20T14:30:00Z',
    category: 'Finance',
    state: 'Rivers',
    priority: 'high',
    description: 'Comprehensive guide about banking services, ATM locations, and financial tips for corps members in Rivers State.',
    status: 'pending_review',
    reviewNotes: null,
    estimatedReadTime: 8,
    tags: ['banking', 'finance', 'rivers', 'atm'],
    contentPreview: 'Banking is one of the most important aspects to consider when starting your service year...'
  },
  {
    id: 'pending2',
    type: 'announcement',
    title: 'Important: New CDS Schedule for Lagos State',
    author: 'Adebayo Johnson',
    authorId: 'admin_lagos',
    submittedDate: '2024-02-21T09:15:00Z',
    category: 'CDS',
    state: 'Lagos',
    priority: 'urgent',
    description: 'Updated CDS schedule for all Lagos corps members effective immediately.',
    status: 'pending_approval',
    reviewNotes: 'Needs verification of dates with state coordinator',
    scheduleDate: '2024-02-25',
    target: 'Lagos Corps Members',
    contentPreview: 'Dear Corps Members, please note the following changes to the CDS schedule...'
  },
  {
    id: 'pending3',
    type: 'user_report',
    title: 'Inappropriate Content Report',
    author: 'System',
    authorId: 'system',
    submittedDate: '2024-02-19T16:45:00Z',
    category: 'Content Moderation',
    state: 'All',
    priority: 'medium',
    description: 'User reported inappropriate content in accommodation guide comments.',
    status: 'pending_review',
    reviewNotes: null,
    reportedBy: 'Corps Member #CM2024001',
    reportedContent: 'Guide: Lagos Accommodation Tips',
    reportReason: 'Spam/Inappropriate language',
    contentPreview: 'User reported comment contains inappropriate language and spam content...'
  },
  {
    id: 'pending4',
    type: 'state_admin',
    title: 'New State Admin Application - Edo State',
    author: 'John Osahon',
    authorId: 'temp_edo',
    submittedDate: '2024-02-18T11:20:00Z',
    category: 'Administrator',
    state: 'Edo',
    priority: 'high',
    description: 'Application for State Administrator position for Edo State.',
    status: 'pending_approval',
    reviewNotes: 'Background check completed, references verified',
    experience: '5 years in youth development',
    qualifications: 'BSc Computer Science, NYSC Alumni',
    contentPreview: 'Application submitted for State Administrator role with relevant experience...'
  },
  {
    id: 'pending5',
    type: 'guide',
    title: 'Transportation Guide for Kaduna State',
    author: 'Ahmed Musa',
    authorId: 'admin_kaduna',
    submittedDate: '2024-02-17T13:10:00Z',
    category: 'Transportation',
    state: 'Kaduna',
    priority: 'medium',
    description: 'Comprehensive transportation guide including safety tips for Kaduna State.',
    status: 'needs_revision',
    reviewNotes: 'Please update safety information and add more route details',
    estimatedReadTime: 6,
    tags: ['transportation', 'kaduna', 'safety', 'routes'],
    contentPreview: 'Getting around Kaduna requires careful planning and awareness of safety protocols...'
  },
  {
    id: 'pending6',
    type: 'comment',
    title: 'Comment Flagged for Review',
    author: 'Anonymous User',
    authorId: 'user_anon',
    submittedDate: '2024-02-16T20:30:00Z',
    category: 'Content Moderation',
    state: 'FCT',
    priority: 'low',
    description: 'Comment on FCT accommodation guide flagged by community.',
    status: 'pending_review',
    reviewNotes: null,
    parentContent: 'FCT Accommodation Guide',
    flaggedBy: '3 users',
    flagReason: 'Misinformation',
    contentPreview: 'Comment contains potentially misleading information about accommodation costs...'
  }
];

const PendingApprovalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = mockPendingItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    const matchesState = stateFilter === 'All' || item.state === stateFilter || item.state === 'All';
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesPriority && matchesState && matchesStatus;
  });

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === filteredItems.length ? [] : filteredItems.map(item => item.id)
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'guide': FaBook,
      'announcement': FaBullhorn,
      'user_report': FaFlag,
      'state_admin': FaUser,
      'comment': FaComment,
    };
    return icons[type as keyof typeof icons] || FaInfoCircle;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'guide': 'bg-blue-100 text-blue-700',
      'announcement': 'bg-green-100 text-green-700',
      'user_report': 'bg-red-100 text-red-700',
      'state_admin': 'bg-purple-100 text-purple-700',
      'comment': 'bg-yellow-100 text-yellow-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'urgent': { bg: 'bg-red-100', text: 'text-red-700', icon: '🔥' },
      'high': { bg: 'bg-orange-100', text: 'text-orange-700', icon: '⚡' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '⚠️' },
      'low': { bg: 'bg-green-100', text: 'text-green-700', icon: '📌' },
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className="mr-1">{config.icon}</span>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending_review': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'pending_approval': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'needs_revision': { bg: 'bg-orange-100', text: 'text-orange-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_review;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const urgentCount = mockPendingItems.filter(item => item.priority === 'urgent').length;
  const highPriorityCount = mockPendingItems.filter(item => item.priority === 'high').length;
  const pendingReviewCount = mockPendingItems.filter(item => item.status === 'pending_review').length;
  const needsRevisionCount = mockPendingItems.filter(item => item.status === 'needs_revision').length;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Pending Approvals</h1>
            <p className="text-gray-600">Review and approve pending content, users, and reports</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium"
              disabled={selectedItems.length === 0}
            >
              <FaCheck />
              Approve Selected ({selectedItems.length})
            </button>
            <button 
              className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-700 transition shadow-lg font-medium"
              disabled={selectedItems.length === 0}
            >
              <FaTimes />
              Reject Selected
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pending</p>
              <p className="text-3xl font-black text-gray-800">{mockPendingItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Urgent</p>
              <p className="text-3xl font-black text-red-600">{urgentCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">High Priority</p>
              <p className="text-3xl font-black text-orange-600">{highPriorityCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaFlag className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Needs Revision</p>
              <p className="text-3xl font-black text-yellow-600">{needsRevisionCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaTimes className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pending items..."
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
            <option value="guide">Guides</option>
            <option value="announcement">Announcements</option>
            <option value="user_report">User Reports</option>
            <option value="state_admin">State Admins</option>
            <option value="comment">Comments</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="pending_review">Pending Review</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="needs_revision">Needs Revision</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All States</option>
            <option value="Lagos">Lagos</option>
            <option value="FCT">FCT</option>
            <option value="Rivers">Rivers</option>
            <option value="Kaduna">Kaduna</option>
            <option value="Edo">Edo</option>
          </select>
        </div>
      </div>

      {/* Pending Items List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Pending Items ({filteredItems.length})
            </h3>
          </div>
          <div className="text-sm text-gray-500">
            {selectedItems.length} selected
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(item.type)}`}>
                    <TypeIcon />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>By: {item.author}</span>
                          <span>•</span>
                          <span>{item.state}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(item.submittedDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(item.priority)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    {item.contentPreview && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700 italic">"{item.contentPreview}"</p>
                      </div>
                    )}

                    {item.reviewNotes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 text-yellow-700 text-sm font-medium mb-1">
                          <FaExclamationTriangle />
                          Review Notes:
                        </div>
                        <p className="text-sm text-yellow-700">{item.reviewNotes}</p>
                      </div>
                    )}

                    {/* Additional info based on type */}
                    {item.type === 'guide' && (
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{item.estimatedReadTime} min read</span>
                        <span>•</span>
                        <span>Category: {item.category}</span>
                        {item.tags && (
                          <>
                            <span>•</span>
                            <span>Tags: {item.tags.join(', ')}</span>
                          </>
                        )}
                      </div>
                    )}

                    {item.type === 'user_report' && (
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>Reported by: {(item as any).reportedBy}</span>
                        <span>•</span>
                        <span>Content: {(item as any).reportedContent}</span>
                        <span>•</span>
                        <span>Reason: {(item as any).reportReason}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                        <FaCheck className="inline mr-2" />
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium">
                        <FaTimes className="inline mr-2" />
                        Reject
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        <FaEye className="inline mr-2" />
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <FaClock className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No pending items found</h3>
          <p className="text-gray-500">All items have been reviewed or try adjusting your filters</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default PendingApprovalPage;
