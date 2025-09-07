'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaCheckCircle, FaEye, FaEdit, FaMapMarkerAlt, FaStar, FaUser, FaBuilding, FaCalendar, FaThumbsUp, FaDownload } from 'react-icons/fa';

const StateAdminApproved = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLGA, setSelectedLGA] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock approved listings for Lagos State
  const approvedListings = [
    {
      id: 'APR001',
      title: 'Comfortable Lodge Near NYSC Secretariat',
      category: 'Accommodation',
      lga: 'Ikeja',
      location: 'GRA Ikeja',
      author: 'Adebayo Johnson',
      dateApproved: '2025-09-01T14:30:00',
      dateSubmitted: '2025-08-28T10:15:00',
      approvedBy: 'Admin System',
      rating: 4.5,
      reviews: 23,
      price: '₦15,000/month',
      views: 145,
      bookings: 8,
      revenue: '₦120,000',
      status: 'active'
    },
    {
      id: 'APR002',
      title: 'General Hospital - Emergency Services',
      category: 'Healthcare',
      lga: 'Lagos Island',
      location: 'Broad Street',
      author: 'Dr. Ahmed Ibrahim',
      dateApproved: '2025-08-25T16:45:00',
      dateSubmitted: '2025-08-23T09:20:00',
      approvedBy: 'Admin System',
      rating: 4.7,
      reviews: 67,
      price: 'Varies',
      views: 234,
      bookings: 45,
      revenue: 'N/A',
      status: 'active'
    },
    {
      id: 'APR003',
      title: 'Local Cuisine Restaurant',
      category: 'Food & Dining',
      lga: 'Surulere',
      location: 'National Stadium Area',
      author: 'Olumide Adeyemi',
      dateApproved: '2025-08-28T11:20:00',
      dateSubmitted: '2025-08-26T15:30:00',
      approvedBy: 'Admin System',
      rating: 4.2,
      reviews: 34,
      price: '₦1,500/meal',
      views: 89,
      bookings: 12,
      revenue: '₦18,000',
      status: 'active'
    },
    {
      id: 'APR004',
      title: 'University Library Access',
      category: 'Education',
      lga: 'Yaba',
      location: 'University of Lagos',
      author: 'Prof. Sarah Okonkwo',
      dateApproved: '2025-08-30T09:15:00',
      dateSubmitted: '2025-08-28T12:45:00',
      approvedBy: 'Admin System',
      rating: 4.6,
      reviews: 56,
      price: 'Free',
      views: 178,
      bookings: 23,
      revenue: 'N/A',
      status: 'active'
    },
    {
      id: 'APR005',
      title: 'Reliable Bus Service - Mainland Routes',
      category: 'Transportation',
      lga: 'Alimosho',
      location: 'Ikeja to Mainland',
      author: 'Kemi Transport Services',
      dateApproved: '2025-09-02T13:30:00',
      dateSubmitted: '2025-08-31T08:20:00',
      approvedBy: 'Admin System',
      rating: 4.0,
      reviews: 45,
      price: '₦200-400/trip',
      views: 156,
      bookings: 89,
      revenue: '₦26,700',
      status: 'active'
    },
    {
      id: 'APR006',
      title: 'Cinema & Entertainment Complex',
      category: 'Entertainment',
      lga: 'Victoria Island',
      location: 'VI Shopping Complex',
      author: 'Michael Entertainment Ltd',
      dateApproved: '2025-08-26T17:10:00',
      dateSubmitted: '2025-08-24T14:00:00',
      approvedBy: 'Admin System',
      rating: 4.3,
      reviews: 78,
      price: '₦2,000/ticket',
      views: 267,
      bookings: 34,
      revenue: '₦68,000',
      status: 'active'
    }
  ];

  const categories = [
    'all', 'Accommodation', 'Transportation', 'Food & Dining', 'Healthcare', 'Education', 'Entertainment'
  ];

  const lgas = [
    'all', 'Ikeja', 'Lagos Island', 'Victoria Island', 'Surulere', 'Yaba', 'Alimosho', 'Agege'
  ];

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
  };

  const filteredListings = approvedListings.filter(listing => {
    return (
      (searchTerm === '' || listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || listing.category === selectedCategory) &&
      (selectedLGA === 'all' || listing.lga === selectedLGA)
    );
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateApproved).getTime() - new Date(a.dateApproved).getTime();
      case 'oldest':
        return new Date(a.dateApproved).getTime() - new Date(b.dateApproved).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      case 'bookings':
        return b.bookings - a.bookings;
      default:
        return 0;
    }
  });

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Approved Listings</h1>
          <p className="text-gray-600 mt-2">Manage approved listings for Lagos State</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedListings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaEye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {approvedListings.reduce((sum, listing) => sum + listing.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaStar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(approvedListings.reduce((sum, listing) => sum + listing.rating, 0) / approvedListings.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaThumbsUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {approvedListings.reduce((sum, listing) => sum + listing.bookings, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Search approved listings..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* LGA Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedLGA}
              onChange={(e) => setSelectedLGA(e.target.value)}
            >
              {lgas.map(lga => (
                <option key={lga} value={lga}>
                  {lga === 'all' ? 'All LGAs' : lga}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rated</option>
              <option value="views">Most Viewed</option>
              <option value="bookings">Most Bookings</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FaDownload className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{listing.title}</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {listing.category}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <FaCheckCircle className="w-3 h-3 inline mr-1" />
                        Approved
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        {listing.lga}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        {listing.author}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{listing.price}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                      <span className="text-xs text-gray-500">({listing.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{listing.views}</p>
                    <p className="text-xs text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{listing.bookings}</p>
                    <p className="text-xs text-gray-600">Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{listing.revenue}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>ID: {listing.id}</span>
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    Approved {getTimeAgo(listing.dateApproved)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <FaEye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <FaBuilding className="w-4 h-4" />
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedListings.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <FaCheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No approved listings found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {sortedListings.length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Showing {sortedListings.length} of {approvedListings.length} approved listings
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminApproved;
