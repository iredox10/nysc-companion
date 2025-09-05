'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockListings, mockLgas, mockStates } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaMapMarkerAlt, FaList, FaSearch } from 'react-icons/fa';

const StateLgasPage = () => {
  const params = useParams();
  const router = useRouter();
  const [state, setState] = useState<any>(null);
  const [stateLgas, setStateLgas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stateId = params.stateId as string;
    
    // Find the state
    const foundState = mockStates.find(s => s.$id === stateId);
    if (foundState) {
      setState(foundState);
      
      // Get LGAs for this state
      const lgasInState = mockLgas.filter(lga => lga.stateId === stateId);
      setStateLgas(lgasInState);
    }
  }, [params.stateId]);

  // Count listings per LGA
  const getListingsCountForLga = (lgaId: string) => {
    return mockListings.filter(listing => listing.lgaId === lgaId).length;
  };

  // Filter LGAs based on search term
  const filteredLgas = stateLgas.filter(lga =>
    lga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-gray-800">{state.name} State - LGAs</h1>
              <p className="text-gray-600">Select an LGA to view and manage listings in that area ({stateLgas.length} LGAs)</p>
            </div>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <FaPlus className="mr-2" />
            Add New LGA
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-l-4 border-blue-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stateLgas.length}</div>
            <div className="text-sm text-gray-600">Total LGAs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {stateLgas.reduce((total, lga) => total + getListingsCountForLga(lga.$id), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {Math.round(stateLgas.reduce((total, lga) => total + getListingsCountForLga(lga.$id), 0) / stateLgas.length) || 0}
            </div>
            <div className="text-sm text-gray-600">Avg Listings per LGA</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-lg">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search LGAs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* LGAs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLgas.map((lga, index) => {
          const listingsCount = getListingsCountForLga(lga.$id);
          
          return (
            <div key={lga.$id} className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500 ${index % 2 === 0 ? 'hover:bg-gray-50' : 'hover:bg-green-50'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-green-500 mr-3" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{lga.name}</h3>
                    <p className="text-gray-600 text-sm">LGA in {state.name}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100">
                    <FaEdit size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-gray-100">
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg mb-4">
                <div className="text-3xl font-bold text-blue-600">{listingsCount}</div>
                <div className="text-sm text-gray-600">
                  {listingsCount === 1 ? 'Listing' : 'Listings'}
                </div>
              </div>
              
              <Link 
                href={`/admin/listings/state/${state.$id}/lga/${lga.$id}`}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <FaList className="mr-2" />
                View Listings
              </Link>
            </div>
          );
        })}
      </div>

      {/* Empty state message if no LGAs */}
      {filteredLgas.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <FaSearch className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No LGAs found for "{searchTerm}"</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search terms.</p>
        </div>
      )}

      {filteredLgas.length === 0 && !searchTerm && (
        <div className="text-center py-12">
          <FaMapMarkerAlt className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No LGAs Added for {state.name} Yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first LGA for this state.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto hover:bg-blue-700">
            <FaPlus className="mr-2" />
            Add First LGA
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default StateLgasPage;
