'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Models } from 'appwrite';
import { UserProfile, Listing, Category } from '@/types';
import { mockUser, mockProfile, mockListings, mockCategories } from '@/data/mock';
import { FaBuilding, FaHome, FaUtensils, FaInfoCircle } from 'react-icons/fa';

const categoryIcons: { [key: string]: JSX.Element } = {
    'Accommodation': <FaHome className="mr-2" />,
    'NYSC Offices': <FaBuilding className="mr-2" />,
    'Restaurants': <FaUtensils className="mr-2" />,
};

const CorperPage = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(mockUser);
  const [profile, setProfile] = useState<(Models.Document & UserProfile) | null>(mockProfile as any);
  const [listings, setListings] = useState<(Models.Document & Listing)[]>([]);
  const [categories, setCategories] = useState<(Models.Document & Category)[]>(mockCategories as any);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Mocking user and profile fetching
  }, [router]);

  useEffect(() => {
    if (profile) {
      fetchListings(profile.deploymentLgaId, selectedCategory);
    }
  }, [profile, selectedCategory]);

  const fetchListings = (lgaId: string, categoryId: string) => {
    let filteredListings = mockListings.filter(listing => listing.lgaId === lgaId);
    if (categoryId) {
        filteredListings = filteredListings.filter(listing => listing.categoryId === categoryId);
    }
    setListings(filteredListings as any);
  };

  if (!user || !profile) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div>Loading...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">NYSC Companion</h1>
                <div className="flex items-center">
                    <span className="text-gray-600 mr-4">Welcome, {user.name}!</span>
                    <button onClick={() => router.push('/profile')} className="text-gray-600 hover:text-gray-800">
                        Profile
                    </button>
                </div>
            </div>
        </header>
      <main className="container mx-auto p-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Your Area</h2>
            <p className="text-lg text-gray-600">Find the best places and services around you.</p>
        </div>

        <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setSelectedCategory('')} className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${!selectedCategory ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>
                    All
                </button>
                {categories.map(category => (
                    <button 
                        key={category.$id} 
                        onClick={() => setSelectedCategory(category.$id)}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.$id ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                    >
                        {categoryIcons[category.name] || <FaInfoCircle className="mr-2" />}
                        {category.name}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map(listing => (
            <div key={listing.$id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-100 rounded-full">
                        {categoryIcons[categories.find(c => c.$id === listing.categoryId)?.name || ''] || <FaInfoCircle className="text-green-600" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 ml-3">{listing.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{listing.description}</p>
                <div className="text-sm text-gray-500">
                    <p><strong>Address:</strong> {listing.address}</p>
                    <p><strong>Contact:</strong> {listing.contactInfo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CorperPage;
