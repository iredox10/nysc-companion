'use client';

import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockStates, mockListings, mockLgas } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaList } from 'react-icons/fa';

const ListingsPage = () => {
  // Count listings per state
  const getListingsCountForState = (stateId: string) => {
    const stateLgas = mockLgas.filter(lga => lga.stateId === stateId);
    const lgaIds = stateLgas.map(lga => lga.$id);
    return mockListings.filter(listing => lgaIds.includes(listing.lgaId)).length;
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Listings by State</h1>
            <p className="text-gray-600">Select a state to view and manage listings in that area.</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <FaPlus className="mr-2" />
            Add New State
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStates.map((state, index) => {
          const listingsCount = getListingsCountForState(state.$id);
          const lgasCount = mockLgas.filter(lga => lga.stateId === state.$id).length;
          
          return (
            <div key={state.$id} className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 ${index % 2 === 0 ? 'hover:bg-gray-50' : 'hover:bg-blue-50'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 mr-3" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{state.name}</h3>
                    <p className="text-gray-600 text-sm">State</p>
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
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{listingsCount}</div>
                  <div className="text-sm text-gray-600">Listings</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{lgasCount}</div>
                  <div className="text-sm text-gray-600">LGAs</div>
                </div>
              </div>
              
              <Link 
                href={`/admin/listings/state/${state.$id}`}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FaList className="mr-2" />
                View Listings
              </Link>
            </div>
          );
        })}
      </div>

      {/* Empty state message if no states */}
      {mockStates.length === 0 && (
        <div className="text-center py-12">
          <FaMapMarkerAlt className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No States Added Yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first state to manage listings.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto hover:bg-blue-700">
            <FaPlus className="mr-2" />
            Add First State
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default ListingsPage;
