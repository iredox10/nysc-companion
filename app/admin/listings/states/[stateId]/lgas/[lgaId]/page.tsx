'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AddListingModal from '@/components/admin/AddListingModal';
import { mockStates, mockLgas, mockListings, mockCategories } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaList, FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaClock, FaExclamationTriangle, FaDownload, FaStar, FaHome, FaUtensils, FaBus, FaMedkit, FaShoppingBag, FaFilm, FaBuilding, FaArrowLeft } from 'react-icons/fa';

const AdminLgaListingsPage = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [state, setState] = useState<any>(null);
  const [lga, setLga] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stateId = params.stateId as string;
  const lgaId = params.lgaId as string;

  const handleAddListing = (listing: any) => {
    console.log('New listing added:', listing);
    alert('Listing created successfully! It will be reviewed before being published.');
  };

  useEffect(() => {
    // Find the state
    const foundState = mockStates.find(s => s.$id === stateId);
    if (foundState) {
      setState(foundState);
    }

    // Find the LGA
    const foundLga = mockLgas.find(l => l.$id === lgaId);
    if (foundLga) {
      setLga(foundLga);
    }

    // Get listings for this LGA
    const lgaListings = mockListings.filter(listing => listing.lgaId === lgaId);
    setListings(lgaListings);
  }, [stateId, lgaId]);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = (listing.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (listing.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (listing.submittedBy || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || listing.categoryId === categoryFilter;
    const matchesStatus = statusFilter === 'All' || listing.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleListingSelection = (listingId: string) => {
    setSelectedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedListings(prev => 
      prev.length === filteredListings.length ? [] : filteredListings.map(listing => listing.$id)
    );
  };

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

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: any } = {
      'cat1': FaHome,
      'cat2': FaUtensils,
      'cat3': FaBus,
      'cat4': FaMedkit,
      'cat5': FaShoppingBag,
      'cat6': FaFilm,
    };
    const Icon = icons[categoryId] || FaBuilding;
    return <Icon className="text-blue-600" />;
  };

  const getCategoryName = (categoryId: string) => {
    const category = mockCategories.find(cat => cat.$id === categoryId);
    return category?.name || 'Unknown';
  };

  if (!state || !lga) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Location Not Found</h1>
            <p className="text-gray-600 mb-8">The location you're looking for doesn't exist.</p>
            <Link href="/admin/listings" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
              Back to States
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/admin/listings/states/${stateId}`} className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to {state.name} LGAs
          </Link>
          <div className="text-sm text-gray-500">
            <Link href="/admin/listings" className="hover:text-blue-600">All States</Link>
            <span className="mx-2">→</span>
            <Link href={`/admin/listings/states/${stateId}`} className="hover:text-blue-600">{state.name}</Link>
            <span className="mx-2">→</span>
            <span>{lga.name}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              {lga.name} Listings
            </h1>
            <p className="text-gray-600">
              Manage listings in {lga.name}, {state.name} {state.name === 'FCT' ? '' : 'State'}
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium"
            >
              <FaPlus />
              Add New Listing
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
              <FaDownload />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-3xl font-black text-gray-800">{listings.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaList className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-3xl font-black text-gray-800">{listings.filter(l => l.status === 'approved').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-black text-gray-800">{listings.filter(l => l.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Flagged</p>
              <p className="text-3xl font-black text-gray-800">{listings.filter(l => l.status === 'flagged').length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Rating</p>
              <p className="text-3xl font-black text-gray-800">
                {listings.length > 0 
                  ? (listings.reduce((sum, l) => sum + (l.rating || 0), 0) / listings.filter(l => l.rating).length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaStar className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings by name, address, or submitter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-4 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white min-w-40 text-gray-700"
            >
              <option value="All">All Categories</option>
              {mockCategories.map(category => (
                <option key={category.$id} value={category.$id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white min-w-32 text-gray-700"
            >
              <option value="All">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredListings.length} of {listings.length} listings in {lga.name}</span>
          {selectedListings.length > 0 && (
            <span className="text-blue-600 font-medium">
              {selectedListings.length} listing{selectedListings.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">Listing Details</th>
                <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                <th className="text-left p-4 font-semibold text-gray-700">Submitter</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Performance</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredListings.map((listing, index) => (
                <tr key={listing.$id} className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedListings.includes(listing.$id)}
                      onChange={() => toggleListingSelection(listing.$id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        {getCategoryIcon(listing.categoryId)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{listing.name || 'Unnamed Business'}</p>
                        <p className="text-sm text-gray-500 mt-1">{listing.address || 'Address not provided'}</p>
                        <p className="text-xs text-gray-400 mt-1">{listing.contactInfo || 'Contact not provided'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {getCategoryName(listing.categoryId)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">{listing.submittedBy || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">
                        {listing.submittedDate ? new Date(listing.submittedDate).toLocaleDateString() : 'No date'}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(listing.status)}
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="text-sm font-medium">{listing.rating || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="text-gray-400 text-xs" />
                        <span className="text-xs text-gray-500">{listing.views || 0} views</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        title="View Details"
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEye />
                      </button>
                      <button 
                        title="Edit Listing"
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      {listing.status === 'pending' && (
                        <button 
                          title="Approve"
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button 
                        title="Delete Listing"
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <FaList className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No listings found</h3>
            <p className="text-gray-500">
              {listings.length === 0 
                ? `No listings have been submitted for ${lga.name} yet.`
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedListings.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {selectedListings.length} listing{selectedListings.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                Approve All
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
                Reject All
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                Export Selected
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddListing}
        preselectedState={stateId}
        preselectedLga={lgaId}
      />
    </AdminLayout>
  );
};

export default AdminLgaListingsPage;
