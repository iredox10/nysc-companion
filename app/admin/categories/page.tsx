'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { mockCategories } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const CategoriesPage = () => {
  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
            <p className="text-gray-600">Add, edit, or delete listing categories.</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <FaPlus className="mr-2" />
            Add Category
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="border-b text-gray-600">
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Listings Count</th>
                <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {mockCategories.map((category, index) => (
                <tr key={category.$id} className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4">{category.name}</td>
                    <td className="p-4 text-gray-800">123</td>
                    <td className="p-4 flex space-x-2">
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
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage;
