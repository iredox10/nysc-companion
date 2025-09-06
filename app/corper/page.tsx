'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBuilding, FaHome, FaUtensils, FaInfoCircle, FaSearch, FaMapMarkerAlt, FaList, FaPlusCircle, FaStar } from 'react-icons/fa';
import { mockUser, mockProfile, mockListings, mockCategories } from '@/data/mock';

// Dynamic import for icon components based on string names
import * as FaIcons from 'react-icons/fa';
const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = (FaIcons as any)[name];
  if (!IconComponent) return <FaInfoCircle />;
  return <IconComponent />;
};

const CorperPage = () => {
  const [user, setUser] = useState<any>(mockUser);
  const [profile, setProfile] = useState<any>(mockProfile);
  const [listings, setListings] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Mocking user and profile fetching
  }, [router]);

  useEffect(() => {
    let filtered = [...mockListings];
    
    // Apply category filter if selected
    if (selectedCategory) {
      filtered = filtered.filter(listing => listing.categoryId === selectedCategory);
    }
    
    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(listing => 
        listing.name.toLowerCase().includes(query) || 
        listing.description.toLowerCase().includes(query) ||
        listing.address.toLowerCase().includes(query)
      );
    }
    
    setListings(filtered);
  }, [selectedCategory, searchQuery]);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-green-200 rounded-full mb-4"></div>
          <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-lg mb-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
                Welcome, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Serving in <span className="font-bold">Ilorin, Kwara State</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/corper/listings/new" className="bg-white text-green-600 font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-lg inline-flex items-center gap-2">
                  <FaPlusCircle />
                  <span>Add New Listing</span>
                </Link>
                <Link href="/guides" className="bg-green-700 bg-opacity-40 border border-white border-opacity-30 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-full hover:bg-opacity-60 transition inline-flex items-center gap-2">
                  <FaInfoCircle />
                  <span>NYSC Guides</span>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block mt-6 md:mt-0">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-5 rounded-2xl shadow-lg">
                <div className="text-center">
                  <p className="font-black text-4xl">{new Date().toLocaleDateString('en-NG', { day: 'numeric' })}</p>
                  <p className="uppercase tracking-wider">{new Date().toLocaleDateString('en-NG', { month: 'short' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {mockCategories.map(category => (
          <button
            key={category.$id}
            onClick={() => setSelectedCategory(category.$id === selectedCategory ? '' : category.$id)}
            className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition flex flex-col items-center text-center group
              ${category.$id === selectedCategory ? 'ring-2 ring-green-500' : ''}`}
          >
            <div className={`p-3 ${category.color} rounded-full mb-3 group-hover:-translate-y-1 transition-transform`}>
              <DynamicIcon name={category.icon} className="text-xl text-white" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm">{category.name}</h3>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for accommodations, restaurants, etc..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Featured Listings */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Places</h2>
          <Link href="/corper/listings" className="text-green-600 hover:underline font-medium inline-flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings
            .filter(listing => listing.rating >= 4.5)
            .slice(0, 3)
            .map(listing => (
              <Link 
                href={`/corper/listings/${listing.$id}`} 
                key={listing.$id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                      <DynamicIcon name={mockCategories.find(c => c.$id === listing.categoryId)?.icon || 'FaInfoCircle'} className="text-white text-4xl" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 m-4">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-bold">{listing.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white font-bold">{mockCategories.find(c => c.$id === listing.categoryId)?.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center mb-4">
                    <FaMapMarkerAlt className="mr-1" /> {listing.address}
                  </p>
                  <p className="text-gray-600 line-clamp-3 mb-4">{listing.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Listings Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Listings</h2>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory('')}
              className="text-gray-600 hover:text-gray-800 inline-flex items-center text-sm"
            >
              Clear Filter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <Link 
              href={`/corper/listings/${listing.$id}`} 
              key={listing.$id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                    <DynamicIcon name={mockCategories.find(c => c.$id === listing.categoryId)?.icon || 'FaInfoCircle'} className="text-white text-4xl" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 m-4">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-bold">{listing.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white font-bold">{mockCategories.find(c => c.$id === listing.categoryId)?.name}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{listing.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mb-4">
                  <FaMapMarkerAlt className="mr-1" /> {listing.address}
                </p>
                <p className="text-gray-600 line-clamp-3 mb-4">{listing.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Contact:</span> {listing.contactInfo.substring(0, 14)}...
                  </p>
                  <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {listings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No Listings Found</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">There are no listings matching your search criteria. Try adjusting your filters or create a new listing.</p>
            <Link href="/corper/listings/new" className="inline-flex items-center gap-2 mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
              <FaPlusCircle />
              <span>Create New Listing</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorperPage;
