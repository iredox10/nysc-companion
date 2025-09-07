'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AddListingModal from '@/components/admin/AddListingModal';
import { mockStates, mockLgas, mockListings, mockCategories } from '@/data/mock';
import { FaPlus, FaMapMarkerAlt, FaSearch, FaBuilding, FaArrowRight, FaChevronRight, FaUsers, FaList, FaDownload } from 'react-icons/fa';

const AdminStatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddListing = (listing: any) => {
    console.log('New listing added:', listing);
    // Here you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    alert('Listing created successfully! It will be reviewed before being published.');
  };

  // Nigerian regions mapping
  const regions = {
    'North Central': ['FCT', 'Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
    'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
    'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
    'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
    'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
  };

  const regionColors = {
    'North Central': 'from-blue-500 to-blue-600',
    'North East': 'from-green-500 to-green-600',
    'North West': 'from-purple-500 to-purple-600',
    'South East': 'from-red-500 to-red-600',
    'South South': 'from-yellow-500 to-yellow-600',
    'South West': 'from-pink-500 to-pink-600'
  };

  const getStateRegion = (stateName: string) => {
    for (const [region, states] of Object.entries(regions)) {
      if (states.includes(stateName)) {
        return region;
      }
    }
    return 'Unknown';
  };

  // Filter states based on search and region
  const filteredStates = mockStates.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || 
      regions[selectedRegion as keyof typeof regions]?.includes(state.name);
    return matchesSearch && matchesRegion;
  });

  // Count LGAs and listings for each state
  const getStateStats = (stateId: string) => {
    const lgaCount = mockLgas.filter(lga => lga.stateId === stateId).length;
    const listingsCount = mockListings.filter(listing => {
      const lga = mockLgas.find(l => l.$id === listing.lgaId);
      return lga?.stateId === stateId;
    }).length;
    
    // Count by status
    const pendingCount = mockListings.filter(listing => {
      const lga = mockLgas.find(l => l.$id === listing.lgaId);
      return lga?.stateId === stateId && listing.status === 'pending';
    }).length;
    
    return { lgaCount, listingsCount, pendingCount };
  };

  const totalListings = mockListings.length;
  const totalPending = mockListings.filter(l => l.status === 'pending').length;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Listings by Location</h1>
            <p className="text-gray-600">Manage listings organized by states and local governments</p>
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
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total States</p>
              <p className="text-3xl font-black text-gray-800">{mockStates.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total LGAs</p>
              <p className="text-3xl font-black text-gray-800">{mockLgas.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-3xl font-black text-gray-800">{totalListings}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaList className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-3xl font-black text-gray-800">{totalPending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaUsers className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion('All')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedRegion === 'All'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Regions
            </button>
            {Object.keys(regions).map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedRegion === region
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600">
            Showing {filteredStates.length} result{filteredStates.length !== 1 ? 's' : ''} for "{searchTerm}"
            <button 
              onClick={() => setSearchTerm('')}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStates.map((state) => {
          const stats = getStateStats(state.$id);
          const region = getStateRegion(state.name);
          const regionGradient = regionColors[region as keyof typeof regionColors] || 'from-gray-400 to-gray-500';
          
          return (
            <Link
              key={state.$id}
              href={`/admin/listings/states/${state.$id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className={`h-32 bg-gradient-to-r ${regionGradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 inline-block">
                    {region} Region
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div className="absolute bottom-4 right-4 text-white/80">
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {state.name} {state.name === 'FCT' ? '' : 'State'}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Manage listings and local governments
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{stats.lgaCount}</div>
                    <div className="text-xs text-gray-500">LGAs</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-600">{stats.listingsCount}</div>
                    <div className="text-xs text-gray-500">Listings</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-orange-600">{stats.pendingCount}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Manage state listings</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredStates.length === 0 && (
        <div className="text-center py-20">
          <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-4">No states found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Try adjusting your search terms or filter to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('All');
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddListing}
      />
    </AdminLayout>
  );
};

export default AdminStatesPage;


