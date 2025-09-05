'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockListings, mockCategories, mockStates, mockLgas } from '@/data/mock';
import { FaSave, FaArrowLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import type { Listing, State, LGA } from '@/types';

const ListingDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedLgaId, setSelectedLgaId] = useState('');
  const [availableLgas, setAvailableLgas] = useState<LGA[]>([]);

  useEffect(() => {
    // Find the listing by ID
    const foundListing = mockListings.find(l => l.$id === params.id);
    if (foundListing) {
      setListing(foundListing);
      setSelectedLgaId(foundListing.lgaId);
      
      // Find the state for this LGA
      const lga = mockLgas.find(l => l.$id === foundListing.lgaId);
      if (lga) {
        setSelectedStateId(lga.stateId);
        setAvailableLgas(mockLgas.filter(l => l.stateId === lga.stateId));
      }
    }
  }, [params.id]);

  useEffect(() => {
    // Update available LGAs when state changes
    if (selectedStateId) {
      const lgasForState = mockLgas.filter(lga => lga.stateId === selectedStateId);
      setAvailableLgas(lgasForState);
      // Reset LGA selection if current LGA doesn't belong to selected state
      const currentLga = mockLgas.find(l => l.$id === selectedLgaId);
      if (!currentLga || currentLga.stateId !== selectedStateId) {
        setSelectedLgaId('');
      }
    }
  }, [selectedStateId, selectedLgaId]);

  const handleSave = () => {
    if (listing && selectedLgaId) {
      // Here you would typically save to your backend
      console.log('Saving listing:', {
        ...listing,
        lgaId: selectedLgaId
      });
      alert('Listing updated successfully!');
    }
  };

  if (!listing) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">Listing not found</div>
        </div>
      </AdminLayout>
    );
  }

  const category = mockCategories.find(c => c.$id === listing.categoryId);
  const currentLga = mockLgas.find(l => l.$id === selectedLgaId);
  const currentState = mockStates.find(s => s.$id === selectedStateId);

  return (
    <AdminLayout>
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Listings
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{listing.name}</h1>
            <p className="text-gray-600">Edit listing details and location assignment</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Listing Details */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Listing Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={listing.name}
                onChange={(e) => setListing({...listing, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={listing.categoryId}
                onChange={(e) => setListing({...listing, categoryId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {mockCategories.map(category => (
                  <option key={category.$id} value={category.$id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={listing.description}
                onChange={(e) => setListing({...listing, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={listing.address}
                onChange={(e) => setListing({...listing, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={listing.phone}
                  onChange={(e) => setListing({...listing, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={listing.email || ''}
                  onChange={(e) => setListing({...listing, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Hours
              </label>
              <input
                type="text"
                value={listing.hours || ''}
                onChange={(e) => setListing({...listing, hours: e.target.value})}
                placeholder="e.g., Mon-Fri: 9AM-5PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Location Assignment */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Location Assignment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a state</option>
                {mockStates.map(state => (
                  <option key={state.$id} value={state.$id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Government Area (LGA)
              </label>
              <select
                value={selectedLgaId}
                onChange={(e) => setSelectedLgaId(e.target.value)}
                disabled={!selectedStateId}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select an LGA</option>
                {availableLgas.map(lga => (
                  <option key={lga.$id} value={lga.$id}>
                    {lga.name}
                  </option>
                ))}
              </select>
            </div>

            {currentState && currentLga && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Current Assignment</h3>
                <div className="flex items-center text-blue-700">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{currentLga.name}, {currentState.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Info Display */}
          <div className="mt-8 space-y-3">
            <h3 className="font-semibold text-gray-800">Quick Info</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <FaPhone className="mr-2 text-gray-400" />
                <span>{listing.phone}</span>
              </div>
              {listing.email && (
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  <span>{listing.email}</span>
                </div>
              )}
              {listing.hours && (
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-400" />
                  <span>{listing.hours}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListingDetailPage;
