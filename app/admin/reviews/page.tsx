'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaComments, FaStar, FaEye, FaTrash, FaFlag, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';

const mockReviews = [
  {
    id: 'rev1',
    listingId: 'list123',
    listingName: 'Green Valley Lodge',
    listingCategory: 'Accommodation',
    reviewerId: 'user456',
    reviewerName: 'Adebayo Johnson',
    reviewerAvatar: null,
    rating: 4.5,
    title: 'Great place for corps members',
    content: 'I had an amazing stay at Green Valley Lodge. The facilities are clean, the staff is friendly, and the location is perfect for corps members. The internet connection is stable which is great for staying connected with family. Highly recommended!',
    date: '2024-02-20',
    status: 'approved',
    helpful: 12,
    reported: false,
    location: 'Kwara State',
    images: ['review1.jpg', 'review2.jpg']
  },
  {
    id: 'rev2',
    listingId: 'list789',
    listingName: 'Corpers Kitchen',
    listingCategory: 'Food & Dining',
    reviewerId: 'user789',
    reviewerName: 'Chioma Okwu',
    reviewerAvatar: null,
    rating: 3.0,
    title: 'Average food quality',
    content: 'The food is okay but nothing special. Prices are reasonable for corps members but the taste could be better. Service is slow during peak hours.',
    date: '2024-02-18',
    status: 'pending',
    helpful: 3,
    reported: true,
    location: 'Lagos State',
    images: []
  },
  {
    id: 'rev3',
    listingId: 'list456',
    listingName: 'Swift Transport',
    listingCategory: 'Transportation',
    reviewerId: 'user111',
    reviewerName: 'Kemi Adebisi',
    reviewerAvatar: null,
    rating: 5.0,
    title: 'Excellent service!',
    content: 'Best transport service I have used during my service year. Very punctual, safe drivers, and affordable rates. The vehicles are well-maintained and comfortable.',
    date: '2024-02-15',
    status: 'approved',
    helpful: 8,
    reported: false,
    location: 'Ogun State',
    images: ['transport1.jpg']
  }
];

const ReviewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.listingName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'All' || 
      (ratingFilter === '5' && review.rating === 5) ||
      (ratingFilter === '4' && review.rating >= 4 && review.rating < 5) ||
      (ratingFilter === '3' && review.rating >= 3 && review.rating < 4) ||
      (ratingFilter === '2' && review.rating >= 2 && review.rating < 3) ||
      (ratingFilter === '1' && review.rating >= 1 && review.rating < 2);
    const matchesCategory = categoryFilter === 'All' || review.listingCategory === categoryFilter;
    return matchesSearch && matchesStatus && matchesRating && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'approved': { bg: 'bg-green-100', text: 'text-green-700' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'rejected': { bg: 'bg-red-100', text: 'text-red-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm font-medium text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Reviews & Ratings</h1>
            <p className="text-gray-600">Manage user reviews and ratings for listings</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reviews</p>
              <p className="text-3xl font-black text-gray-800">{mockReviews.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaComments className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-3xl font-black text-gray-800">{mockReviews.filter(r => r.status === 'approved').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaComments className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-black text-gray-800">{mockReviews.filter(r => r.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaComments className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <p className="text-3xl font-black text-gray-800">
                {(mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaStar className="text-orange-600 text-xl" />
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
              placeholder="Search reviews..."
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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className={`bg-white rounded-2xl shadow-lg p-6 ${review.reported ? 'border-l-4 border-red-500' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(review.reviewerName)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{review.title}</h3>
                    {getStatusBadge(review.status)}
                    {review.reported && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                        REPORTED
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{review.reviewerName}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      <FaCalendarAlt className="inline mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{review.listingName}</p>
                        <p className="text-xs text-gray-500">{review.listingCategory} • {review.location}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Listing
                      </button>
                    </div>
                  </div>
                  
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500">IMG</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{review.helpful} people found this helpful</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button 
                  title="View Details"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaEye />
                </button>
                {review.status === 'pending' && (
                  <>
                    <button 
                      title="Approve Review"
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <FaComments />
                    </button>
                  </>
                )}
                {review.reported && (
                  <button 
                    title="Handle Report"
                    className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <FaFlag />
                  </button>
                )}
                <button 
                  title="Delete Review"
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-16">
          <FaComments className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No reviews found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default ReviewsPage;
