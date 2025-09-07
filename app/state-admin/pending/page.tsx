'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaClock, FaEye, FaCheck, FaTimes, FaFlag, FaUser, FaMapMarkerAlt, FaStar, FaBuilding, FaExclamationTriangle } from 'react-icons/fa';

const StateAdminPending = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  // Mock pending listings for Lagos State
  const pendingListings = [
    {
      id: 'PND001',
      title: 'Budget-Friendly Hostel Near Ikeja Training Camp',
      category: 'Accommodation',
      lga: 'Ikeja',
      location: 'Close to NYSC Permanent Orientation Camp',
      author: 'Funmi Adebayo',
      authorEmail: 'funmi.adebayo@email.com',
      dateSubmitted: '2025-09-07T08:30:00',
      price: '₦12,000/month',
      description: 'Clean and affordable accommodation just 5 minutes walk from the NYSC camp. Shared facilities, 24/7 security, and reliable power supply.',
      images: 3,
      priority: 'high',
      views: 45,
      flags: 0
    },
    {
      id: 'PND002',
      title: 'Motorcycle Taxi Service - Lagos Island Routes',
      category: 'Transportation',
      lga: 'Lagos Island',
      location: 'Marina to Ikoyi Routes',
      author: 'Ibrahim Musa',
      authorEmail: 'ibrahim.musa@email.com',
      dateSubmitted: '2025-09-07T10:15:00',
      price: '₦300-500/trip',
      description: 'Reliable motorcycle taxi service covering major routes in Lagos Island. Licensed operators, safety helmets provided.',
      images: 2,
      priority: 'medium',
      views: 23,
      flags: 0
    },
    {
      id: 'PND003',
      title: 'Local Fast Food Joint - Nigerian Cuisine',
      category: 'Food & Dining',
      lga: 'Surulere',
      location: 'National Stadium Area',
      author: 'Amina Hassan',
      authorEmail: 'amina.hassan@email.com',
      dateSubmitted: '2025-09-07T11:45:00',
      price: '₦800-2,000/meal',
      description: 'Authentic Nigerian dishes including jollof rice, pounded yam, and various soups. Clean environment and affordable prices.',
      images: 4,
      priority: 'low',
      views: 67,
      flags: 1
    },
    {
      id: 'PND004',
      title: 'Computer Training Center',
      category: 'Education',
      lga: 'Yaba',
      location: 'University of Lagos Environs',
      author: 'Dr. Michael Okonkwo',
      authorEmail: 'michael.okonkwo@unilag.edu.ng',
      dateSubmitted: '2025-09-06T16:20:00',
      price: '₦5,000/course',
      description: 'Professional computer training center offering Microsoft Office, programming basics, and digital literacy courses.',
      images: 5,
      priority: 'high',
      views: 89,
      flags: 0
    },
    {
      id: 'PND005',
      title: 'Pharmacy & Medical Store',
      category: 'Healthcare',
      lga: 'Victoria Island',
      location: 'Adeola Odeku Street',
      author: 'Pharm. Jennifer Okeke',
      authorEmail: 'jennifer.okeke@pharmacy.com',
      dateSubmitted: '2025-09-06T14:10:00',
      price: 'Varies',
      description: 'Full-service pharmacy with prescription medications, over-the-counter drugs, and basic medical supplies.',
      images: 3,
      priority: 'medium',
      views: 34,
      flags: 0
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
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

  const filteredListings = pendingListings.filter(listing => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'urgent') return listing.priority === 'high';
    if (selectedTab === 'flagged') return listing.flags > 0;
    return true;
  });

  const handleApprove = (id: string) => {
    // Handle approval logic
    console.log('Approving listing:', id);
  };

  const handleReject = (id: string) => {
    // Handle rejection logic
    console.log('Rejecting listing:', id);
  };

  const handleFlag = (id: string) => {
    // Handle flagging logic
    console.log('Flagging listing:', id);
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pending Reviews</h1>
          <p className="text-gray-600 mt-2">Review and approve pending listings for Lagos State</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingListings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FaExclamationTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingListings.filter(l => l.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FaFlag className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingListings.filter(l => l.flags > 0).length}
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
                <p className="text-sm text-gray-600">Avg. Review Time</p>
                <p className="text-2xl font-bold text-gray-900">2.4h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Pending ({pendingListings.length})
            </button>
            <button
              onClick={() => setSelectedTab('urgent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'urgent'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Urgent ({pendingListings.filter(l => l.priority === 'high').length})
            </button>
            <button
              onClick={() => setSelectedTab('flagged')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'flagged'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Flagged ({pendingListings.filter(l => l.flags > 0).length})
            </button>
          </div>
        </div>

        {/* Pending Listings */}
        <div className="space-y-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(listing.priority)}`}>
                        {listing.priority.charAt(0).toUpperCase() + listing.priority.slice(1)} Priority
                      </span>
                      {listing.flags > 0 && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                          <FaFlag className="w-3 h-3 inline mr-1" />
                          {listing.flags} Flag{listing.flags > 1 ? 's' : ''}
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
                        {getTimeAgo(listing.dateSubmitted)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="w-4 h-4" />
                        {listing.views} views
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{listing.price}</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {listing.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>ID: {listing.id}</span>
                    <span>{listing.images} images uploaded</span>
                    <span>Contact: {listing.authorEmail}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleApprove(listing.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaCheck className="w-4 h-4" />
                    Approve
                  </button>
                  
                  <button
                    onClick={() => handleReject(listing.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                    Reject
                  </button>
                  
                  <button
                    onClick={() => handleFlag(listing.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <FaFlag className="w-4 h-4" />
                    Flag for Review
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaEye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaUser className="w-4 h-4" />
                    Contact Author
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <FaClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No pending listings</h3>
            <p className="text-gray-600">
              {selectedTab === 'all' 
                ? 'All listings have been reviewed.' 
                : selectedTab === 'urgent'
                ? 'No urgent listings require immediate attention.'
                : 'No flagged listings need review.'
              }
            </p>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminPending;
