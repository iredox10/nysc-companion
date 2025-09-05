'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockListings, mockCategories, mockLgas, mockStates } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaEye, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import type { Listing, State, LGA } from '@/types';

const StateListingsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [state, setState] = useState<State | null>(null);
  const [stateListings, setStateListings] = useState<Listing[]>([]);
  const [stateLgas, setStateLgas] = useState<LGA[]>([]);

  useEffect(() => {
    const stateId = params.stateId as string;
    
    // Find the state
    const foundState = mockStates.find(s => s.$id === stateId);
    if (foundState) {
      setState(foundState);
      
      // Get LGAs for this state
      const lgasInState = mockLgas.filter(lga => lga.stateId === stateId);
      setStateLgas(lgasInState);
      
      // Get listings for this state
      const lgaIds = lgasInState.map(lga => lga.$id);
      const listingsInState = mockListings.filter(listing => lgaIds.includes(listing.lgaId));
      setStateListings(listingsInState);
    }
  }, [params.stateId]);

  if (!state) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">State not found</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to States
        </button>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-500 mr-3" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{state.name} State</h1>
              <p className="text-gray-600">Manage listings in {state.name} state ({stateListings.length} listings across {stateLgas.length} LGAs)</p>
            </div>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <FaPlus className="mr-2" />
            Add Listing
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-3xl font-bold text-blue-600">{stateListings.length}</p>
            </div>
            <FaMapMarkerAlt className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total LGAs</p>
              <p className="text-3xl font-bold text-green-600">{stateLgas.length}</p>
            </div>
            <FaMapMarkerAlt className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-purple-600">{new Set(stateListings.map(l => l.categoryId)).size}</p>
            </div>
            <FaMapMarkerAlt className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Listings in {state.name}</h2>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All LGAs</option>
              {stateLgas.map(lga => (
                <option key={lga.$id} value={lga.$id}>{lga.name}</option>
              ))}
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Categories</option>
              {mockCategories.map(category => (
                <option key={category.$id} value={category.$id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {stateListings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">LGA</th>
                  <th className="text-left p-4 font-semibold">Phone</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stateListings.map((listing, index) => (
                  <tr key={listing.$id} className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4">
                      <Link 
                        href={`/admin/listings/${listing.$id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {listing.name}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-800">{mockCategories.find(c => c.$id === listing.categoryId)?.name}</td>
                    <td className="p-4 text-gray-800">{mockLgas.find(l => l.$id === listing.lgaId)?.name}</td>
                    <td className="p-4 text-gray-800">{listing.phone}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                        Approved
                      </span>
                    </td>
                    <td className="p-4 flex space-x-2">
                      <Link 
                        href={`/admin/listings/${listing.$id}`}
                        className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100"
                        title="View Details"
                      >
                        <FaEye size={18} />
                      </Link>
                      <button className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100">
                        <FaEdit size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-red-700 p-2 rounded-full hover:bg-gray-100">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaMapMarkerAlt className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Listings in {state.name} Yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first listing for this state.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto hover:bg-blue-700">
              <FaPlus className="mr-2" />
              Add First Listing
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default StateListingsPage;
