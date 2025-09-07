'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaFlag, FaExclamationTriangle, FaEye, FaBan, FaCheck, FaUser, FaMapMarkerAlt, FaClock, FaComments, FaImage, FaTimes } from 'react-icons/fa';

const StateAdminFlagged = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Mock flagged listings for Lagos State
  const flaggedListings = [
    {
      id: 'FLG001',
      title: 'Budget Accommodation Near Campus',
      category: 'Accommodation',
      lga: 'Yaba',
      location: 'University of Lagos Area',
      author: 'John Suspect',
      authorEmail: 'john.suspect@email.com',
      dateFlagged: '2025-09-06T14:30:00',
      dateSubmitted: '2025-09-05T10:15:00',
      flagReason: 'Misleading Information',
      flagDetails: 'Property photos do not match actual location. Suspected false advertising.',
      flaggedBy: 'user@email.com',
      severity: 'high',
      status: 'under-review',
      views: 67,
      reports: 3,
      evidence: ['photos', 'location-mismatch'],
      priority: 'urgent'
    },
    {
      id: 'FLG002',
      title: 'Fast Food Joint - Local Delicacies',
      category: 'Food & Dining',
      lga: 'Surulere',
      location: 'National Stadium Road',
      author: 'Amina Hassan',
      authorEmail: 'amina.hassan@email.com',
      dateFlagged: '2025-09-07T09:45:00',
      dateSubmitted: '2025-09-06T16:20:00',
      flagReason: 'Inappropriate Content',
      flagDetails: 'Inappropriate images uploaded in gallery section.',
      flaggedBy: 'moderator@nysc.gov.ng',
      severity: 'medium',
      status: 'pending-action',
      views: 23,
      reports: 1,
      evidence: ['inappropriate-images'],
      priority: 'normal'
    },
    {
      id: 'FLG003',
      title: 'Transport Service - Island Routes',
      category: 'Transportation',
      lga: 'Lagos Island',
      location: 'Marina Area',
      author: 'Kemi Transport',
      authorEmail: 'kemi.transport@email.com',
      dateFlagged: '2025-09-05T11:20:00',
      dateSubmitted: '2025-09-04T08:30:00',
      flagReason: 'Safety Concerns',
      flagDetails: 'Multiple reports of unsafe driving practices and unlicensed vehicles.',
      flaggedBy: 'safety.officer@nysc.gov.ng',
      severity: 'high',
      status: 'investigating',
      views: 145,
      reports: 5,
      evidence: ['user-reports', 'license-verification'],
      priority: 'urgent'
    },
    {
      id: 'FLG004',
      title: 'Computer Training Center',
      category: 'Education',
      lga: 'Ikeja',
      location: 'Computer Village',
      author: 'Tech Academy',
      authorEmail: 'info@techacademy.com',
      dateFlagged: '2025-09-04T15:10:00',
      dateSubmitted: '2025-09-03T12:45:00',
      flagReason: 'Spam/Duplicate',
      flagDetails: 'Multiple identical listings posted by the same user.',
      flaggedBy: 'auto-detection-system',
      severity: 'low',
      status: 'resolved',
      views: 89,
      reports: 2,
      evidence: ['duplicate-content'],
      priority: 'low'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      case 'pending-action':
        return 'bg-yellow-100 text-yellow-800';
      case 'investigating':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredListings = flaggedListings.filter(listing => {
    if (selectedTab !== 'all' && listing.status !== selectedTab) return false;
    if (selectedSeverity !== 'all' && listing.severity !== selectedSeverity) return false;
    return true;
  });

  const handleApprove = (id: string) => {
    console.log('Approving flagged listing:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting flagged listing:', id);
  };

  const handleDismiss = (id: string) => {
    console.log('Dismissing flag:', id);
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Flagged Listings</h1>
          <p className="text-gray-600 mt-2">Review and manage flagged listings for Lagos State</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FaFlag className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Flagged</p>
                <p className="text-2xl font-bold text-gray-900">{flaggedListings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FaExclamationTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {flaggedListings.filter(l => l.severity === 'high').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaClock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {flaggedListings.filter(l => l.status === 'under-review' || l.status === 'investigating').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {flaggedListings.filter(l => l.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Flagged ({flaggedListings.length})
            </button>
            <button
              onClick={() => setSelectedTab('under-review')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'under-review'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Under Review ({flaggedListings.filter(l => l.status === 'under-review').length})
            </button>
            <button
              onClick={() => setSelectedTab('investigating')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'investigating'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Investigating ({flaggedListings.filter(l => l.status === 'investigating').length})
            </button>
            <button
              onClick={() => setSelectedTab('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'resolved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Resolved ({flaggedListings.filter(l => l.status === 'resolved').length})
            </button>
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="low">Low Severity</option>
            </select>
          </div>
        </div>

        {/* Flagged Listings */}
        <div className="space-y-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(listing.severity)}`}>
                        {listing.severity.charAt(0).toUpperCase() + listing.severity.slice(1)} Risk
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(listing.status)}`}>
                        {listing.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {listing.priority === 'urgent' && (
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium animate-pulse">
                          URGENT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaUser className="w-4 h-4" />
                        {listing.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        {listing.lga}, {listing.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        Flagged {getTimeAgo(listing.dateFlagged)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="w-4 h-4" />
                        {listing.views} views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Flag Details */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <FaFlag className="text-red-500 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800 mb-2">Flag Reason: {listing.flagReason}</h4>
                      <p className="text-red-700 text-sm mb-2">{listing.flagDetails}</p>
                      <div className="flex items-center gap-4 text-xs text-red-600">
                        <span>Flagged by: {listing.flaggedBy}</span>
                        <span>{listing.reports} total reports</span>
                        <span>Evidence: {listing.evidence.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600">Category</p>
                    <p className="font-medium text-gray-900">{listing.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Listing ID</p>
                    <p className="font-medium text-gray-900">{listing.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Author Email</p>
                    <p className="font-medium text-gray-900 text-sm">{listing.authorEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Date Submitted</p>
                    <p className="font-medium text-gray-900">{new Date(listing.dateSubmitted).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleApprove(listing.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaCheck className="w-4 h-4" />
                    Approve Listing
                  </button>
                  
                  <button
                    onClick={() => handleReject(listing.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaBan className="w-4 h-4" />
                    Remove Listing
                  </button>
                  
                  <button
                    onClick={() => handleDismiss(listing.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                    Dismiss Flag
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaEye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaComments className="w-4 h-4" />
                    Contact Author
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaImage className="w-4 h-4" />
                    View Evidence
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <FaFlag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No flagged listings</h3>
            <p className="text-gray-600">
              {selectedTab === 'all' 
                ? 'No listings have been flagged for review.' 
                : `No flagged listings in the "${selectedTab.replace('-', ' ')}" status.`
              }
            </p>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminFlagged;
