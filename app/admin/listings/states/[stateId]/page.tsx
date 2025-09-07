'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AddListingModal from '@/components/admin/AddListingModal';
import { mockStates, mockLgas, mockListings } from '@/data/mock';
import { FaPlus, FaMapMarkerAlt, FaSearch, FaBuilding, FaArrowRight, FaChevronRight, FaList, FaDownload, FaArrowLeft, FaGlobe, FaCheck, FaClock, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const AdminStatePage = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState<any>(null);
  const [stateLgas, setStateLgas] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stateId = params.stateId as string;

  const handleAddListing = (listing: any) => {
    console.log('New listing added:', listing);
    alert('Listing created successfully! It will be reviewed before being published.');
  };

  useEffect(() => {
    // Find the state
    const foundState = mockStates.find(s => s.$id === stateId);
    if (foundState) {
      setState(foundState);
      
      // Get LGAs for this state
      const lgasInState = mockLgas.filter(lga => lga.stateId === stateId);
      setStateLgas(lgasInState);
    }
  }, [stateId]);

  // Nigerian regions mapping
  const regions = {
    'North Central': ['FCT', 'Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
    'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
    'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
    'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
    'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
  };

  const getStateRegion = (stateName: string) => {
    for (const [region, states] of Object.entries(regions)) {
      if (states.includes(stateName)) {
        return region;
      }
    }
    return 'Unknown';
  };

  const regionColors = {
    'North Central': 'from-blue-500 to-blue-600',
    'North East': 'from-green-500 to-green-600',
    'North West': 'from-purple-500 to-purple-600',
    'South East': 'from-red-500 to-red-600',
    'South South': 'from-yellow-500 to-yellow-600',
    'South West': 'from-pink-500 to-pink-600'
  };

  // Count listings and categories for each LGA
  const getLgaStats = (lgaId: string) => {
    const lgaListings = mockListings.filter(listing => listing.lgaId === lgaId);
    const approvedCount = lgaListings.filter(l => l.status === 'approved').length;
    const pendingCount = lgaListings.filter(l => l.status === 'pending').length;
    const flaggedCount = lgaListings.filter(l => l.status === 'flagged').length;
    
    return {
      total: lgaListings.length,
      approved: approvedCount,
      pending: pendingCount,
      flagged: flaggedCount
    };
  };

  // Filter LGAs based on search
  const filteredLgas = stateLgas.filter(lga =>
    lga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!state) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">State Not Found</h1>
            <p className="text-gray-600 mb-8">The state you're looking for doesn't exist.</p>
            <Link href="/admin/listings" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
              Back to States
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const region = getStateRegion(state.name);
  const regionGradient = regionColors[region as keyof typeof regionColors] || 'from-gray-400 to-gray-500';
  const totalListings = stateLgas.reduce((total, lga) => total + getLgaStats(lga.$id).total, 0);
  const totalPending = stateLgas.reduce((total, lga) => total + getLgaStats(lga.$id).pending, 0);

  return (
    <AdminLayout>
      {/* Header */}
      <div className={`bg-gradient-to-r ${regionGradient} text-white rounded-2xl mb-8`}>
        <div className="p-8">
          <Link href="/admin/listings" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to All States
          </Link>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaMapMarkerAlt className="text-3xl" />
            </div>
            <div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium inline-block mb-3">
                {region} Region
              </div>
              <h1 className="text-4xl font-black mb-2">
                {state.name} {state.name === 'FCT' ? '' : 'State'} - Local Governments
              </h1>
              <p className="text-xl opacity-90">
                Manage listings across {stateLgas.length} local government areas
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{stateLgas.length}</div>
              <div className="text-sm opacity-80">LGAs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{totalListings}</div>
              <div className="text-sm opacity-80">Total Listings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{totalPending}</div>
              <div className="text-sm opacity-80">Pending Review</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">
                {totalListings > 0 ? Math.round((stateLgas.reduce((total, lga) => total + getLgaStats(lga.$id).approved, 0) / totalListings) * 100) : 0}%
              </div>
              <div className="text-sm opacity-80">Approval Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex gap-3 mb-4 lg:mb-0">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium"
          >
            <FaPlus />
            Add New Listing
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
            <FaDownload />
            Export State Data
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search local governments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* LGAs Grid */}
      {filteredLgas.length === 0 ? (
        <div className="text-center py-20">
          <FaGlobe className="text-6xl text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-4">No local governments found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Try adjusting your search terms to find what you're looking for.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLgas.map((lga) => {
            const stats = getLgaStats(lga.$id);
            
            return (
              <Link
                key={lga.$id}
                href={`/admin/listings/states/${stateId}/lgas/${lga.$id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Header */}
                <div className={`h-28 bg-gradient-to-r ${regionGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 inline-block">
                      Local Government Area
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <FaGlobe className="text-2xl" />
                  </div>
                  <div className="absolute bottom-4 right-4 text-white/80">
                    <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {lga.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Manage {stats.total} listing{stats.total !== 1 ? 's' : ''}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center bg-blue-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-600">{stats.total}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                    <div className="text-center bg-green-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-600">{stats.approved}</div>
                      <div className="text-xs text-gray-500">Approved</div>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex gap-2 mb-4">
                    {stats.pending > 0 && (
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                        <FaClock className="text-xs" />
                        {stats.pending} pending
                      </div>
                    )}
                    {stats.flagged > 0 && (
                      <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                        <FaExclamationTriangle className="text-xs" />
                        {stats.flagged} flagged
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Manage listings</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddListing}
        preselectedState={stateId}
      />
    </AdminLayout>
  );
};

export default AdminStatePage;
