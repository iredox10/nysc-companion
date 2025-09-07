'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockStates, mockLgas, mockListings } from '@/data/mock';
import { FaMapMarkerAlt, FaSearch, FaUsers, FaBuilding, FaArrowRight, FaChevronRight, FaGlobe } from 'react-icons/fa';

export default function StatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Nigerian regions mapping
  const regions = {
    'North Central': ['FCT', 'Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
    'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
    'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
    'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
    'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
  };

  // Get states by region
  const getStatesByRegion = (region: string) => {
    return mockStates.filter(state => 
      regions[region as keyof typeof regions]?.includes(state.name) || false
    );
  };

  // Filter states based on search and region
  const filteredStates = mockStates.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase());
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
    return { lgaCount, listingsCount };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaMapMarkerAlt className="text-4xl" />
            </div>
            <h1 className="text-5xl font-black mb-4">Explore Nigeria</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover local businesses, services, and opportunities across all 36 states and FCT
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-black mb-2">{mockStates.length}</div>
              <div className="text-sm opacity-80">States & FCT</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-black mb-2">{mockLgas.length}</div>
              <div className="text-sm opacity-80">Local Governments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-black mb-2">{mockListings.length}+</div>
              <div className="text-sm opacity-80">Local Businesses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {filteredStates.length} result{filteredStates.length !== 1 ? 's' : ''} for "{searchQuery}"
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

      {/* States Grid */}
      <div className="container mx-auto px-6 py-12">
        {filteredStates.length === 0 ? (
          <div className="text-center py-20">
            <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No states found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Try adjusting your search terms or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStates.map((state) => {
              const stats = getStateStats(state.$id);
              const region = getStateRegion(state.name);
              const regionGradient = regionColors[region as keyof typeof regionColors] || 'from-gray-400 to-gray-500';

              return (
                <Link
                  key={state.$id}
                  href={`/states/${state.$id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Header */}
                  <div className={`h-32 bg-gradient-to-r ${regionGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 inline-block">
                        {region}
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

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">{stats.lgaCount}</div>
                        <div className="text-xs text-gray-500">LGAs</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">{stats.listingsCount}</div>
                        <div className="text-xs text-gray-500">Businesses</div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Explore {state.name}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Regional Overview */}
      {selectedRegion === 'All' && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-6 py-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore by Region</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(regions).map(([region, states]) => {
                const gradient = regionColors[region as keyof typeof regionColors];
                const totalStatesInRegion = states.length;
                const totalLGAs = states.reduce((count, stateName) => {
                  const state = mockStates.find(s => s.name === stateName);
                  if (state) {
                    return count + mockLgas.filter(lga => lga.stateId === state.$id).length;
                  }
                  return count;
                }, 0);

                return (
                  <div
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}>
                        <FaGlobe />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {region}
                        </h4>
                        <p className="text-sm text-gray-500">{totalStatesInRegion} states</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">{totalStatesInRegion}</div>
                        <div className="text-xs text-gray-500">States</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">{totalLGAs}</div>
                        <div className="text-xs text-gray-500">LGAs</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {states.slice(0, 4).map(stateName => (
                        <span key={stateName} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {stateName}
                        </span>
                      ))}
                      {states.length > 4 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{states.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
