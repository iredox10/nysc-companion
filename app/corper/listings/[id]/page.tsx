'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockListings, mockCategories } from '@/data/mock';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaGlobe, FaRegClock, FaStar, FaRegStar } from 'react-icons/fa';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (params.id) {
      const foundListing = mockListings.find(l => l.$id === params.id);
      if (foundListing) {
        setListing(foundListing);
        const relatedCategory = mockCategories.find(c => c.$id === foundListing.categoryId);
        setCategory(relatedCategory);
      }
    }
  }, [params.id]);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
          <Link href="/corper" className="text-green-600 hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Back Navigation */}
      <div className="mb-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-green-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back to Listings
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl overflow-hidden mb-10">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative p-8 md:p-12 text-white">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-bold">{category?.name || 'Listing'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{listing.name}</h1>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{listing.address}</span>
            </div>
            <div className="flex items-center">
              <FaRegClock className="mr-2" />
              <span>Added 2 weeks ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Place</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Location</h2>
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-4">
              <p className="text-gray-500">Interactive map will be available soon</p>
            </div>
            <p className="text-gray-700">{listing.address}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ratings & Reviews</h2>
            <div className="flex items-center mb-6">
              <div className="text-4xl font-bold text-gray-800 mr-4">4.5</div>
              <div>
                <div className="flex text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
                <p className="text-sm text-gray-500">Based on 12 reviews</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-t pt-6">
                <div className="flex justify-between mb-2">
                  <div className="font-bold text-gray-800">John D.</div>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <p className="text-gray-600">Great place! Highly recommended for all corps members.</p>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-between mb-2">
                  <div className="font-bold text-gray-800">Sarah M.</div>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                  </div>
                </div>
                <p className="text-gray-600">Very helpful staff and good facilities. A bit far from the secretariat though.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FaPhone className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{listing.contactInfo}</p>
                </div>
              </div>
              
              {listing.website && (
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <FaGlobe className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a href={listing.website} className="font-medium text-green-600 hover:underline">{listing.website}</a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <button className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 transition">
                Contact Now
              </button>
            </div>
          </div>
          
          {/* Similar Listings */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Similar Listings</h3>
            <div className="space-y-4">
              {mockListings
                .filter(l => l.categoryId === listing.categoryId && l.$id !== listing.$id)
                .slice(0, 3)
                .map(similar => (
                  <Link href={`/corper/listings/${similar.$id}`} key={similar.$id} className="block">
                    <div className="flex items-start hover:bg-gray-50 p-2 rounded-lg transition">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center text-gray-400">
                        {similar.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{similar.name}</h4>
                        <p className="text-sm text-gray-500 truncate">{similar.address}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
