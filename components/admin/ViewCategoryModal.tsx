'use client';

import { useState, useEffect } from 'react';
import { mockListings } from '@/data/mock';
import { FaTimes, FaHome, FaUtensils, FaBus, FaMedkit, FaShoppingBag, FaFilm, FaBuilding, FaGraduationCap, FaCar, FaHammer, FaEye, FaEdit, FaTrash, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';

interface ViewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
  onEdit: (category: any) => void;
  onDelete: (categoryId: string) => void;
}

const ViewCategoryModal: React.FC<ViewCategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  category,
  onEdit,
  onDelete
}) => {
  const [listings, setListings] = useState<any[]>([]);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    FaHome,
    FaUtensils,
    FaBus,
    FaMedkit,
    FaShoppingBag,
    FaFilm,
    FaBuilding,
    FaGraduationCap,
    FaCar,
    FaHammer
  };

  useEffect(() => {
    if (category) {
      const categoryListings = mockListings.filter(listing => listing.categoryId === category.$id);
      setListings(categoryListings);
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const IconComponent = iconMap[category.icon] || FaBuilding;
  const approvedCount = listings.filter(l => l.status === 'approved').length;
  const pendingCount = listings.filter(l => l.status === 'pending').length;
  const rejectedCount = listings.filter(l => l.status === 'rejected').length;
  const flaggedCount = listings.filter(l => l.status === 'flagged').length;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'approved': { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheck },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: FaClock },
      'rejected': { bg: 'bg-red-100', text: 'text-red-700', icon: FaTimes },
      'flagged': { bg: 'bg-orange-100', text: 'text-orange-700', icon: FaExclamationTriangle },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="text-xs" />
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
      </span>
    );
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the "${category.name}" category? This action cannot be undone and will affect ${listings.length} listing${listings.length !== 1 ? 's' : ''}.`)) {
      onDelete(category.$id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`${category.color} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <IconComponent className="text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{category.name}</h2>
                <p className="text-white/80">{category.description || 'No description provided'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-600 mb-1">{listings.length}</div>
              <div className="text-sm text-gray-600">Total Listings</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-green-600 mb-1">{approvedCount}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-yellow-600 mb-1">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-red-600 mb-1">{rejectedCount + flaggedCount}</div>
              <div className="text-sm text-gray-600">Issues</div>
            </div>
          </div>

          {/* Category Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Category Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category ID</label>
                <div className="text-gray-900 font-mono bg-white px-3 py-2 rounded-lg border">{category.$id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Icon</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                  <IconComponent className="text-gray-600" />
                  <span className="text-gray-900">{category.icon}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Color</label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                  <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                  <span className="text-gray-900">{category.color}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Created</label>
                <div className="text-gray-900 bg-white px-3 py-2 rounded-lg border">
                  {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'Unknown'}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Listings */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Listings</h3>
            {listings.length === 0 ? (
              <div className="text-center py-8">
                <FaBuilding className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No listings in this category yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {listings.slice(0, 10).map((listing) => (
                  <div key={listing.$id} className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{listing.name || 'Unnamed Business'}</h4>
                      <p className="text-sm text-gray-500">{listing.address || 'No address'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(listing.status)}
                      <div className="text-xs text-gray-400">
                        {listing.submittedDate ? new Date(listing.submittedDate).toLocaleDateString() : 'No date'}
                      </div>
                    </div>
                  </div>
                ))}
                {listings.length > 10 && (
                  <div className="text-center pt-3">
                    <span className="text-sm text-gray-500">
                      Showing 10 of {listings.length} listings
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-medium"
          >
            Close
          </button>
          <button
            onClick={() => {
              onEdit(category);
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
          >
            <FaEdit />
            Edit Category
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium flex items-center justify-center gap-2"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCategoryModal;
