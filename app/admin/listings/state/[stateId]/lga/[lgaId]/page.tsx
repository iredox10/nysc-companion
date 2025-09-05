'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockListings, mockCategories, mockLgas, mockStates } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaEye, FaArrowLeft, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const LgaListingsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [state, setState] = useState<any>(null);
  const [lga, setLga] = useState<any>(null);
  const [lgaListings, setLgaListings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const stateId = params.stateId as string;
    const lgaId = params.lgaId as string;
    
    // Find the state and LGA
    const foundState = mockStates.find(s => s.$id === stateId);
    const foundLga = mockLgas.find(l => l.$id === lgaId);
    
    if (foundState && foundLga) {
      setState(foundState);
      setLga(foundLga);
      
      // Get listings for this LGA
      const listingsInLga = mockListings.filter(listing => listing.lgaId === lgaId);
      setLgaListings(listingsInLga);
    }
  }, [params.stateId, params.lgaId]);

  // Filter listings based on search term and category
  const filteredListings = lgaListings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.phone.includes(searchTerm);
    const matchesCategory = !selectedCategory || listing.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!state || !lga) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">LGA not found</div>
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
          Back to {state.name} LGAs
        </button>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-green-500 mr-3" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{lga.name}, {state.name}</h1>
              <p className="text-gray-600">Manage listings in {lga.name} LGA ({lgaListings.length} listings)</p>
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
              <p className="text-3xl font-bold text-blue-600">{lgaListings.length}</p>
            </div>
            <FaMapMarkerAlt className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-green-600">{new Set(lgaListings.map(l => l.categoryId)).size}</p>
            </div>
            <FaMapMarkerAlt className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-purple-600">{lgaListings.length}</p>
            </div>
            <FaMapMarkerAlt className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Listings in {lga.name}</h2>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings by name, address, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {mockCategories.map(category => (
              <option key={category.$id} value={category.$id}>{category.name}</option>
            ))}
          </select>
        </div>
        
        {filteredListings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Phone</th>
                  <th className="text-left p-4 font-semibold">Address</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((listing, index) => (
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
                    <td className="p-4 text-gray-800">{listing.phone}</td>
                    <td className="p-4 text-gray-800">{listing.address}</td>
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
        ) : searchTerm || selectedCategory ? (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaMapMarkerAlt className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Listings in {lga.name} Yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first listing for this LGA.</p>
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

export default LgaListingsPage;
