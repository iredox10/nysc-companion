'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockStates, mockLgas, mockListings, mockCategories } from '@/data/mock';
import { FaMapMarkerAlt, FaSearch, FaArrowLeft, FaBuilding, FaPhone, FaGlobe, FaChevronRight, FaStar, FaFilter, FaHeart, FaShare, FaDirections, FaEye } from 'react-icons/fa';

export default function LgaPage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [state, setState] = useState<any>(null);
  const [lga, setLga] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);

  const stateId = params.state as string;
  const lgaId = params.lga as string;

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

  // Filter and sort listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = (listing.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (listing.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || listing.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.title || '').localeCompare(b.title || '');
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'views':
        return (b.views || 0) - (a.views || 0);
      default:
        return 0;
    }
  });

  // Get category statistics
  const categoryStats = mockCategories.map(category => {
    const count = listings.filter(listing => listing.categoryId === category.$id).length;
    return { ...category, count };
  }).filter(cat => cat.count > 0);

  if (!state || !lga) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-8">The location you're looking for doesn't exist.</p>
          <Link href="/states" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
            Back to States
          </Link>
        </div>
      </div>
    );
  }

  const regionColors = {
    'North Central': 'from-blue-500 to-blue-600',
    'North East': 'from-green-500 to-green-600',
    'North West': 'from-purple-500 to-purple-600',
    'South East': 'from-red-500 to-red-600',
    'South South': 'from-yellow-500 to-yellow-600',
    'South West': 'from-pink-500 to-pink-600'
  };

  // Determine region based on state
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
    return 'North Central';
  };

  const region = getStateRegion(state.name);
  const regionGradient = regionColors[region as keyof typeof regionColors] || 'from-gray-400 to-gray-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${regionGradient} text-white`}>
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col gap-4 mb-8">
            <Link href={`/states/${stateId}`} className="inline-flex items-center text-white/80 hover:text-white transition-colors w-fit">
              <FaArrowLeft className="mr-2" />
              Back to {state.name} {state.name === 'FCT' ? '' : 'State'}
            </Link>
            
            <div className="text-sm opacity-80">
              <Link href="/states" className="hover:text-white">All States</Link>
              <span className="mx-2">→</span>
              <Link href={`/states/${stateId}`} className="hover:text-white">{state.name}</Link>
              <span className="mx-2">→</span>
              <span>{lga.name}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaBuilding className="text-4xl" />
            </div>
            <div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium inline-block mb-3">
                {region} Region • {state.name} {state.name === 'FCT' ? '' : 'State'}
              </div>
              <h1 className="text-5xl font-black mb-2">
                {lga.name}
              </h1>
              <p className="text-xl opacity-90">
                Local Government Area • {listings.length} Businesses Listed
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{listings.length}</div>
              <div className="text-xs opacity-80">Total Businesses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{categoryStats.length}</div>
              <div className="text-xs opacity-80">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-black mb-1">
                {listings.reduce((sum, listing) => sum + (listing.rating || 0), 0) > 0 
                  ? (listings.reduce((sum, listing) => sum + (listing.rating || 0), 0) / listings.filter(l => l.rating).length).toFixed(1)
                  : '0.0'}
              </div>
              <div className="text-xs opacity-80">Avg Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-black mb-1">
                {listings.reduce((sum, listing) => sum + (listing.views || 0), 0)}
              </div>
              <div className="text-xs opacity-80">Total Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
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
                All ({listings.length})
              </button>
              {categoryStats.map(category => (
                <button
                  key={category.$id}
                  onClick={() => setSelectedCategory(category.$id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.$id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="views">Sort by Views</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {sortedListings.length} result{sortedListings.length !== 1 ? 's' : ''} for "{searchQuery}"
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

      {/* Listings */}
      <div className="container mx-auto px-6 py-12">
        {sortedListings.length === 0 ? (
          <div className="text-center py-20">
            <FaBuilding className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No businesses found</h3>
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
            {sortedListings.map((listing) => {
              const category = mockCategories.find(c => c.$id === listing.categoryId);
              
              return (
                <div
                  key={listing.$id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                        <FaBuilding className="text-4xl text-gray-400" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                          {category.name}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                        <FaHeart className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors">
                        <FaShare className="text-sm" />
                      </button>
                    </div>

                    {/* Rating */}
                    {listing.rating && (
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-white text-sm">
                          <FaStar className="text-yellow-400" />
                          <span>{listing.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {listing.title || 'Unnamed Business'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {listing.description || 'No description available'}
                    </p>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-4">
                      <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{listing.address || 'Address not provided'}</span>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      {listing.phone && (
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600">{listing.phone}</span>
                        </div>
                      )}
                      {listing.website && (
                        <div className="flex items-center gap-2">
                          <FaGlobe className="text-gray-400 text-sm" />
                          <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <FaEye />
                        <span>{listing.views || 0} views</span>
                      </div>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                        ID: {listing.$id.slice(-6)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <FaDirections />
                        <span>Directions</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <FaEye />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LGA Info Section */}
      {listings.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">About {lga.name}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover local businesses and services in {lga.name} Local Government Area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryStats.slice(0, 4).map((category, index) => (
                <div key={category.$id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    index === 0 ? 'bg-blue-100 text-blue-600' :
                    index === 1 ? 'bg-green-100 text-green-600' :
                    index === 2 ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <FaBuilding />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{category.name}</h4>
                  <p className="text-2xl font-black text-gray-900 mb-1">{category.count}</p>
                  <p className="text-gray-600 text-sm">
                    {category.count === 1 ? 'Business' : 'Businesses'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
