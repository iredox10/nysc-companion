'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { mockStates, mockLgas } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const LocationsPage = () => {
  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Locations</h1>
            <p className="text-gray-600">Manage states and LGAs.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">States</h2>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center text-sm hover:bg-blue-600">
                <FaPlus className="mr-1" />
                Add State
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="border-b text-gray-600">
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
                </thead>
                <tbody>
                {mockStates.map((state, index) => (
                    <tr key={state.$id} className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-3">{state.name}</td>
                    <td className="p-3 flex space-x-2">
                        <button className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100">
                            <FaEdit size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-red-700 p-2 rounded-full hover:bg-gray-100">
                            <FaTrash size={16} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">LGAs</h2>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center text-sm hover:bg-blue-600">
                    <FaPlus className="mr-1" />
                    Add LGA
                </button>
            </div>
          <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="border-b text-gray-600">
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold">State</th>
                    <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
                </thead>
                <tbody>
                {mockLgas.map((lga, index) => (
                    <tr key={lga.$id} className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-3">{lga.name}</td>
                    <td className="p-3">{mockStates.find(s => s.$id === lga.stateId)?.name}</td>
                    <td className="p-3 flex space-x-2">
                        <button className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100">
                            <FaEdit size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-red-700 p-2 rounded-full hover:bg-gray-100">
                            <FaTrash size={16} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LocationsPage;
