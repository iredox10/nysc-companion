'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaFlag, FaEye, FaTrash, FaShieldAlt, FaBan, FaCheck, FaSearch, FaFilter, FaClock, FaExclamationTriangle, FaUser, FaComment, FaBook, FaBullhorn, FaCalendarAlt } from 'react-icons/fa';

const mockFlaggedContent = [
  {
    id: 'flag1',
    contentType: 'comment',
    contentTitle: 'Comment on Lagos Accommodation Guide',
    contentPreview: 'This place is terrible, dont go there. The owner is a scammer and will steal your money...',
    flaggedBy: [
      { userId: 'user1', username: 'corps_member_001', reason: 'Inappropriate language', date: '2024-02-21T10:30:00Z' },
      { userId: 'user2', username: 'lagos_corper', reason: 'Misinformation', date: '2024-02-21T11:15:00Z' },
      { userId: 'user3', username: 'service_year_2024', reason: 'Spam', date: '2024-02-21T12:00:00Z' }
    ],
    author: 'anonymous_user_456',
    authorEmail: 'temp@example.com',
    publishDate: '2024-02-20T16:45:00Z',
    flagCount: 3,
    severity: 'high',
    status: 'under_review',
    category: 'Accommodation',
    state: 'Lagos',
    parentContent: 'Lagos Accommodation Guide',
    moderatorNotes: null,
    autoFlagged: false
  },
  {
    id: 'flag2',
    contentType: 'guide',
    contentTitle: 'Quick Money Making Tips During Service Year',
    contentPreview: 'Make $5000 monthly working from home during NYSC. Click this link and sign up now to start earning immediately...',
    flaggedBy: [
      { userId: 'user4', username: 'concerned_corper', reason: 'Spam/Scam', date: '2024-02-20T14:20:00Z' },
      { userId: 'user5', username: 'vigilant_nysc', reason: 'Misleading content', date: '2024-02-20T15:30:00Z' }
    ],
    author: 'suspicious_admin',
    authorEmail: 'suspicious@fake.com',
    publishDate: '2024-02-19T09:15:00Z',
    flagCount: 2,
    severity: 'critical',
    status: 'escalated',
    category: 'Finance',
    state: 'All',
    parentContent: null,
    moderatorNotes: 'Potential scam - investigate author account',
    autoFlagged: true
  },
  {
    id: 'flag3',
    contentType: 'announcement',
    contentTitle: 'Urgent: New NYSC Policy Changes',
    contentPreview: 'BREAKING: NYSC has announced immediate changes to allowance payments. All corps members must update their information...',
    flaggedBy: [
      { userId: 'user6', username: 'fact_checker', reason: 'Misinformation', date: '2024-02-19T20:45:00Z' }
    ],
    author: 'fake_official',
    authorEmail: 'fake.official@scam.com',
    publishDate: '2024-02-19T18:30:00Z',
    flagCount: 1,
    severity: 'critical',
    status: 'pending_action',
    category: 'Official',
    state: 'National',
    parentContent: null,
    moderatorNotes: 'Impersonating official NYSC communication',
    autoFlagged: true
  },
  {
    id: 'flag4',
    contentType: 'comment',
    contentTitle: 'Comment on FCT Transportation Tips',
    contentPreview: 'Transportation in FCT is okay but you need to be careful of certain areas at night. Some areas are not safe...',
    flaggedBy: [
      { userId: 'user7', username: 'fct_resident', reason: 'Misleading information', date: '2024-02-18T16:20:00Z' }
    ],
    author: 'helpful_corper',
    authorEmail: 'helpful@corper.com',
    publishDate: '2024-02-17T14:10:00Z',
    flagCount: 1,
    severity: 'low',
    status: 'resolved',
    category: 'Transportation',
    state: 'FCT',
    parentContent: 'FCT Transportation Guide',
    moderatorNotes: 'Reviewed - content is factual and helpful',
    autoFlagged: false
  },
  {
    id: 'flag5',
    contentType: 'guide',
    contentTitle: 'Traditional Medicine Practices in Rural Areas',
    contentPreview: 'During your service year, you might encounter traditional healing practices. Some herbs can cure serious diseases without modern medicine...',
    flaggedBy: [
      { userId: 'user8', username: 'medical_student', reason: 'Health misinformation', date: '2024-02-17T11:30:00Z' },
      { userId: 'user9', username: 'health_advocate', reason: 'Dangerous advice', date: '2024-02-17T13:45:00Z' }
    ],
    author: 'traditional_healer',
    authorEmail: 'healer@traditional.com',
    publishDate: '2024-02-16T08:20:00Z',
    flagCount: 2,
    severity: 'high',
    status: 'under_review',
    category: 'Healthcare',
    state: 'Various',
    parentContent: null,
    moderatorNotes: 'Potentially dangerous medical advice',
    autoFlagged: false
  },
  {
    id: 'flag6',
    contentType: 'comment',
    contentTitle: 'Offensive Language in Discussion',
    contentPreview: 'This is complete nonsense! Anyone who believes this is stupid and ignorant. The author clearly doesnt know what theyre talking about...',
    flaggedBy: [
      { userId: 'user10', username: 'peace_maker', reason: 'Abusive language', date: '2024-02-16T19:15:00Z' },
      { userId: 'user11', username: 'positive_vibes', reason: 'Harassment', date: '2024-02-16T20:30:00Z' }
    ],
    author: 'angry_user_123',
    authorEmail: 'angry@user.com',
    publishDate: '2024-02-16T17:45:00Z',
    flagCount: 2,
    severity: 'medium',
    status: 'action_taken',
    category: 'General',
    state: 'All',
    parentContent: 'Corps Member Welfare Discussion',
    moderatorNotes: 'User warned and comment hidden',
    autoFlagged: false
  }
];

const FlaggedContentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredContent = mockFlaggedContent.filter(content => {
    const matchesSearch = content.contentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.contentPreview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = contentTypeFilter === 'All' || content.contentType === contentTypeFilter;
    const matchesSeverity = severityFilter === 'All' || content.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || content.status === statusFilter;
    const matchesState = stateFilter === 'All' || content.state === stateFilter || content.state === 'All' || content.state === 'National';
    return matchesSearch && matchesType && matchesSeverity && matchesStatus && matchesState;
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
      prev.length === filteredContent.length ? [] : filteredContent.map(content => content.id)
    );
  };

  const getContentTypeIcon = (type: string) => {
    const icons = {
      'comment': FaComment,
      'guide': FaBook,
      'announcement': FaBullhorn,
      'post': FaUser,
    };
    return icons[type as keyof typeof icons] || FaComment;
  };

  const getContentTypeColor = (type: string) => {
    const colors = {
      'comment': 'bg-blue-100 text-blue-700',
      'guide': 'bg-green-100 text-green-700',
      'announcement': 'bg-purple-100 text-purple-700',
      'post': 'bg-yellow-100 text-yellow-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'critical': { bg: 'bg-red-100', text: 'text-red-700', icon: '🚨' },
      'high': { bg: 'bg-orange-100', text: 'text-orange-700', icon: '⚠️' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '⚡' },
      'low': { bg: 'bg-green-100', text: 'text-green-700', icon: '📝' },
    };
    const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.medium;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className="mr-1">{config.icon}</span>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'under_review': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'pending_action': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'escalated': { bg: 'bg-red-100', text: 'text-red-700' },
      'resolved': { bg: 'bg-green-100', text: 'text-green-700' },
      'action_taken': { bg: 'bg-purple-100', text: 'text-purple-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.under_review;
    
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

  const criticalCount = mockFlaggedContent.filter(content => content.severity === 'critical').length;
  const highSeverityCount = mockFlaggedContent.filter(content => content.severity === 'high').length;
  const underReviewCount = mockFlaggedContent.filter(content => content.status === 'under_review').length;
  const escalatedCount = mockFlaggedContent.filter(content => content.status === 'escalated').length;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Flagged Content</h1>
            <p className="text-gray-600">Review and moderate flagged content reported by the community</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button 
              className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-700 transition shadow-lg font-medium"
              disabled={selectedItems.length === 0}
            >
              <FaBan />
              Remove Selected ({selectedItems.length})
            </button>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium"
              disabled={selectedItems.length === 0}
            >
              <FaCheck />
              Mark as Safe
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Flagged</p>
              <p className="text-3xl font-black text-gray-800">{mockFlaggedContent.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaFlag className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Critical</p>
              <p className="text-3xl font-black text-red-600">{criticalCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Under Review</p>
              <p className="text-3xl font-black text-blue-600">{underReviewCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Escalated</p>
              <p className="text-3xl font-black text-orange-600">{escalatedCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaShieldAlt className="text-orange-600 text-xl" />
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
              placeholder="Search flagged content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <select
            value={contentTypeFilter}
            onChange={(e) => setContentTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Types</option>
            <option value="comment">Comments</option>
            <option value="guide">Guides</option>
            <option value="announcement">Announcements</option>
            <option value="post">Posts</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Severity</option>
            <option value="critical">Critical</option>
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
            <option value="under_review">Under Review</option>
            <option value="pending_action">Pending Action</option>
            <option value="escalated">Escalated</option>
            <option value="resolved">Resolved</option>
            <option value="action_taken">Action Taken</option>
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
            <option value="National">National</option>
          </select>
        </div>
      </div>

      {/* Flagged Content List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Flagged Content ({filteredContent.length})
            </h3>
          </div>
          <div className="text-sm text-gray-500">
            {selectedItems.length} selected
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContent.map((content) => {
            const TypeIcon = getContentTypeIcon(content.contentType);
            return (
              <div key={content.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(content.id)}
                    onChange={() => toggleItemSelection(content.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getContentTypeColor(content.contentType)}`}>
                    <TypeIcon />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{content.contentTitle}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>By: {content.author}</span>
                          <span>•</span>
                          <span>{content.state}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(content.publishDate)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaFlag className="text-red-500" />
                            {content.flagCount} flag{content.flagCount > 1 ? 's' : ''}
                          </span>
                          {content.autoFlagged && (
                            <>
                              <span>•</span>
                              <span className="text-orange-600 font-medium">Auto-flagged</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(content.severity)}
                        {getStatusBadge(content.status)}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700 italic">"{content.contentPreview}"</p>
                    </div>

                    {/* Flag reasons */}
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Reported for:</h5>
                      <div className="space-y-1">
                        {content.flaggedBy.map((flag, index) => (
                          <div key={index} className="flex items-center justify-between text-xs bg-red-50 rounded p-2">
                            <div className="flex items-center gap-2">
                              <FaUser className="text-red-500" />
                              <span className="font-medium">{flag.username}</span>
                              <span className="text-gray-500">reported for:</span>
                              <span className="text-red-600 font-medium">{flag.reason}</span>
                            </div>
                            <span className="text-gray-500">{formatTimeAgo(flag.date)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {content.moderatorNotes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-1">
                          <FaShieldAlt />
                          Moderator Notes:
                        </div>
                        <p className="text-sm text-blue-700">{content.moderatorNotes}</p>
                      </div>
                    )}

                    {content.parentContent && (
                      <div className="text-sm text-gray-500 mb-3">
                        <span className="font-medium">Parent Content:</span> {content.parentContent}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        <FaEye className="inline mr-2" />
                        Review
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                        <FaCheck className="inline mr-2" />
                        Mark Safe
                      </button>
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-sm font-medium">
                        <FaFlag className="inline mr-2" />
                        Warn Author
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium">
                        <FaBan className="inline mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-16">
          <FaShieldAlt className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No flagged content found</h3>
          <p className="text-gray-500">All content has been reviewed or try adjusting your filters</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default FlaggedContentPage;
