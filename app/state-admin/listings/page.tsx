'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaList, FaFilter, FaSearch, FaEye, FaEdit, FaMapMarkerAlt, FaStar, FaCalendar, FaUser, FaBuilding, FaFlag } from 'react-icons/fa';

const StateAdminListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLGA, setSelectedLGA] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock listings data for Lagos State
  const listings = [
    {
      id: 'LST001',
      title: 'Affordable Lodge Near NYSC Secretariat',
      category: 'Accommodation',
      lga: 'Ikeja',
      location: 'GRA Ikeja',
      status: 'approved',
      rating: 4.5,
      price: '₦15,000/month',
      author: 'Adebayo Johnson',
      dateSubmitted: '2025-09-01',
      views: 145,
      image: '/placeholder-accommodation.jpg'
    },
    {
      id: 'LST002',
      title: 'Reliable Transport Service - Lagos Island',
      category: 'Transportation',
      lga: 'Lagos Island',
      location: 'Marina',
      status: 'pending',
      rating: 0,
      price: '₦500/trip',
      author: 'Kemi Okafor',
      dateSubmitted: '2025-09-05',
      views: 23,
      image: '/placeholder-transport.jpg'
    },
    {
      id: 'LST003',
      title: 'Local Cuisine Restaurant',
      category: 'Food & Dining',
      lga: 'Surulere',
      location: 'National Stadium Area',
      status: 'approved',
      rating: 4.2,
      price: '₦1,500/meal',
      author: 'Olumide Adeyemi',
      dateSubmitted: '2025-08-28',
      views: 89,
      image: '/placeholder-food.jpg'
    },
    {
      id: 'LST004',
      title: 'Study Center with Free WiFi',
      category: 'Education',
      lga: 'Yaba',
      location: 'University of Lagos Area',
      status: 'flagged',
      rating: 3.8,
      price: 'Free',
      author: 'Sarah Okonkwo',
      dateSubmitted: '2025-09-03',
      views: 67,
      image: '/placeholder-education.jpg'
    },
    {
      id: 'LST005',
      title: 'General Hospital - Emergency Services',
      category: 'Healthcare',
      lga: 'Lagos Island',
      location: 'Broad Street',
      status: 'approved',
      rating: 4.7,
      price: 'Varies',
      author: 'Dr. Ahmed Ibrahim',
      dateSubmitted: '2025-08-25',
      views: 234,
      image: '/placeholder-healthcare.jpg'
    },
    {
      id: 'LST006',
      title: 'Movie Cinema & Recreation Center',
      category: 'Entertainment',
      lga: 'Victoria Island',
      location: 'VI Shopping Complex',
      status: 'pending',
      rating: 0,
      price: '₦2,000/ticket',
      author: 'Michael Eze',
      dateSubmitted: '2025-09-06',
      views: 12,
      image: '/placeholder-entertainment.jpg'
    }
  ];

  const categories = [
    'all', 'Accommodation', 'Transportation', 'Food & Dining', 'Healthcare', 'Education', 'Entertainment'
  ];

  const lgas = [
    'all', 'Ikeja', 'Lagos Island', 'Victoria Island', 'Surulere', 'Yaba', 'Alimosho', 'Agege'
  ];

  const statuses = [
    'all', 'approved', 'pending', 'flagged', 'rejected'
  ];

  const filteredListings = listings.filter(listing => {
    return (
      (searchTerm === '' || listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || listing.category === selectedCategory) &&
      (selectedLGA === 'all' || listing.lga === selectedLGA) &&
      (selectedStatus === 'all' || listing.status === selectedStatus)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'flagged':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged':
        return <FaFlag className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Listings</h1>
          <p className="text-gray-600 mt-2">Manage all listings for Lagos State</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaList className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaList className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {listings.filter(l => l.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaList className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {listings.filter(l => l.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FaFlag className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900">
                  {listings.filter(l => l.status === 'flagged').length}
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
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Listing</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Location</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Rating</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Views</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <FaBuilding className="text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{listing.title}</h3>
                          <p className="text-sm text-gray-600">ID: {listing.id}</p>
                          <p className="text-sm text-gray-500">By {listing.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {listing.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400 text-sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{listing.lga}</p>
                          <p className="text-xs text-gray-600">{listing.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(listing.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(listing.status)}`}>
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {listing.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-sm font-medium">{listing.rating}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No ratings</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <FaEye className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{listing.views}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <FaList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredListings.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {filteredListings.length} of {listings.length} listings
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

export default StateAdminListings;
