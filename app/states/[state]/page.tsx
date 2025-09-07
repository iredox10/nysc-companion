'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockStates, mockLgas, mockListings, mockCategories } from '@/data/mock';
import { FaMapMarkerAlt, FaSearch, FaArrowLeft, FaBuilding, FaUsers, FaChevronRight, FaGlobe, FaArrowRight } from 'react-icons/fa';

export default function StatePage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [state, setState] = useState<any>(null);
  const [stateLgas, setStateLgas] = useState<any[]>([]);

  const stateId = params.state as string;

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
    const categoriesUsed = new Set(lgaListings.map(listing => listing.categoryId));
    return {
      listingsCount: lgaListings.length,
      categoriesCount: categoriesUsed.size,
      listings: lgaListings
    };
  };

  // Filter LGAs based on search and category
  const filteredLgas = stateLgas.filter(lga => {
    const matchesSearch = lga.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'All') return matchesSearch;
    
    const lgaStats = getLgaStats(lga.$id);
    const hasCategory = lgaStats.listings.some(listing => listing.categoryId === selectedCategory);
    return matchesSearch && hasCategory;
  });

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">State Not Found</h1>
          <p className="text-gray-600 mb-8">The state you're looking for doesn't exist.</p>
          <Link href="/states" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
            Back to States
          </Link>
        </div>
      </div>
    );
  }

  const region = getStateRegion(state.name);
  const regionGradient = regionColors[region as keyof typeof regionColors] || 'from-gray-400 to-gray-500';
  const totalListings = stateLgas.reduce((total, lga) => total + getLgaStats(lga.$id).listingsCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${regionGradient} text-white`}>
        <div className="container mx-auto px-6 py-12">
          <Link href="/states" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to All States
          </Link>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaMapMarkerAlt className="text-4xl" />
            </div>
            <div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium inline-block mb-3">
                {region} Region
              </div>
              <h1 className="text-5xl font-black mb-2">
                {state.name} {state.name === 'FCT' ? '' : 'State'}
              </h1>
              <p className="text-xl opacity-90">
                Explore local governments and discover businesses in {state.name}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-black mb-2">{stateLgas.length}</div>
              <div className="text-sm opacity-80">Local Governments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-black mb-2">{totalListings}</div>
              <div className="text-sm opacity-80">Local Businesses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-black mb-2">{mockCategories.length}</div>
              <div className="text-sm opacity-80">Business Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search local governments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Categories
              </button>
              {mockCategories.map(category => (
                <button
                  key={category.$id}
                  onClick={() => setSelectedCategory(category.$id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.$id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {filteredLgas.length} result{filteredLgas.length !== 1 ? 's' : ''} for "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* LGAs Grid */}
      <div className="container mx-auto px-6 py-12">
        {filteredLgas.length === 0 ? (
          <div className="text-center py-20">
            <FaGlobe className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No local governments found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Try adjusting your search terms or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLgas.map((lga) => {
              const stats = getLgaStats(lga.$id);
              
              return (
                <Link
                  key={lga.$id}
                  href={`/states/${stateId}/lgas/${lga.$id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Header */}
                  <div className={`h-32 bg-gradient-to-r ${regionGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 inline-block">
                        Local Government
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
                    <p className="text-gray-500 text-sm mb-4">Local Government Area</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">{stats.listingsCount}</div>
                        <div className="text-xs text-gray-500">Businesses</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">{stats.categoriesCount}</div>
                        <div className="text-xs text-gray-500">Categories</div>
                      </div>
                    </div>

                    {/* Top Categories */}
                    {stats.listings.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Popular Categories:</div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(new Set(stats.listings.map(listing => listing.categoryId)))
                            .slice(0, 3)
                            .map(categoryId => {
                              const category = mockCategories.find(c => c.$id === categoryId);
                              return category ? (
                                <span key={categoryId} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                  {category.name}
                                </span>
                              ) : null;
                            })}
                        </div>
                      </div>
                    )}

                    {/* Action */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Explore {lga.name}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* State Info Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">About {state.name} {state.name === 'FCT' ? '' : 'State'}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more about the local governments and business opportunities in {state.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Geographic Coverage</h4>
              <p className="text-gray-600 text-sm">
                {stateLgas.length} local government areas with diverse business opportunities
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <FaBuilding className="text-3xl text-green-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Business Directory</h4>
              <p className="text-gray-600 text-sm">
                {totalListings} verified businesses across multiple categories
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <FaUsers className="text-3xl text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-800 mb-2">Corps Member Hub</h4>
              <p className="text-gray-600 text-sm">
                Find accommodation, services, and networking opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
