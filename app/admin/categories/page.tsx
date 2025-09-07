'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockCategories, mockListings } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaHome, FaUtensils, FaBus, FaMedkit, FaShoppingBag, FaFilm, FaBuilding, FaEye, FaChartBar, FaSearch, FaPalette } from 'react-icons/fa';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    FaHome,
    FaUtensils,
    FaBus,
    FaMedkit,
    FaShoppingBag,
    FaFilm,
    FaBuilding
  };

  // Get listings count for each category
  const getCategoryListingsCount = (categoryId: string) => {
    return mockListings.filter(listing => listing.categoryId === categoryId).length;
  };

  // Filter categories based on search
  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mb-8">
        <div className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaPalette className="text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Category Management</h1>
              <p className="text-xl opacity-90">
                Organize and manage listing categories for better discoverability
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{mockCategories.length}</div>
              <div className="text-sm opacity-80">Total Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">{mockListings.length}</div>
              <div className="text-sm opacity-80">Total Listings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-black mb-1">
                {mockCategories.length > 0 ? Math.round(mockListings.length / mockCategories.length) : 0}
              </div>
              <div className="text-sm opacity-80">Avg per Category</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex gap-3 mb-4 lg:mb-0">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
            <FaPlus />
            Add New Category
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
            <FaChartBar />
            Analytics
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-20">
          <FaPalette className="text-6xl text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-4">No categories found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            {mockCategories.length === 0 
              ? "No categories have been created yet. Add your first category to get started."
              : "Try adjusting your search terms to find what you're looking for."
            }
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
          >
            {mockCategories.length === 0 ? 'Add First Category' : 'Clear Search'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || FaBuilding;
            const listingsCount = getCategoryListingsCount(category.$id);
            
            return (
              <div
                key={category.$id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Header with gradient background */}
                <div className={`h-28 ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 inline-block">
                      Category
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <IconComponent className="text-3xl" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                      {listingsCount} listings
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {listingsCount} business{listingsCount !== 1 ? 'es' : ''} listed in this category
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center bg-blue-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-600">{listingsCount}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                    <div className="text-center bg-green-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-600">
                        {mockListings.filter(l => l.categoryId === category.$id && l.status === 'approved').length}
                      </div>
                      <div className="text-xs text-gray-500">Approved</div>
                    </div>
                  </div>

                  {/* Performance indicator */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Activity Level</span>
                      <span className={`font-medium ${
                        listingsCount > 10 ? 'text-green-600' : 
                        listingsCount > 5 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {listingsCount > 10 ? 'High' : listingsCount > 5 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          listingsCount > 10 ? 'bg-green-500' : 
                          listingsCount > 5 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((listingsCount / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-sm flex items-center justify-center gap-2">
                      <FaEye />
                      View
                    </button>
                    <button className="flex-1 bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-sm flex items-center justify-center gap-2">
                      <FaEdit />
                      Edit
                    </button>
                    <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm flex items-center justify-center">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Overview Table for larger screens */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Category Overview</h2>
          <p className="text-gray-500">Detailed breakdown of all categories and their performance</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                <th className="text-left p-4 font-semibold text-gray-700">Total Listings</th>
                <th className="text-left p-4 font-semibold text-gray-700">Approved</th>
                <th className="text-left p-4 font-semibold text-gray-700">Pending</th>
                <th className="text-left p-4 font-semibold text-gray-700">Activity</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || FaBuilding;
                const total = getCategoryListingsCount(category.$id);
                const approved = mockListings.filter(l => l.categoryId === category.$id && l.status === 'approved').length;
                const pending = mockListings.filter(l => l.categoryId === category.$id && l.status === 'pending').length;
                
                return (
                  <tr key={category.$id} className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{category.name}</div>
                          <div className="text-sm text-gray-500">ID: {category.$id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-2xl font-bold text-gray-800">{total}</span>
                    </td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                        {approved}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm font-medium">
                        {pending}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              total > 10 ? 'bg-green-500' : 
                              total > 5 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((total / 20) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${
                          total > 10 ? 'text-green-600' : 
                          total > 5 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {total > 10 ? 'High' : total > 5 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          title="View Details"
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaEye />
                        </button>
                        <button 
                          title="Edit Category"
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          title="Delete Category"
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage;
