'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaBuilding, FaCar, FaUtensils, FaStethoscope, FaGraduationCap, FaGamepad, FaPlus, FaEdit, FaTrash, FaEye, FaChartBar, FaSave, FaTimes } from 'react-icons/fa';

const StateAdminCategories = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'FaBuilding',
    color: '#3B82F6'
  });

  // Mock categories data for Lagos State
  const [categories, setCategories] = useState([
    {
      id: 'CAT001',
      name: 'Accommodation',
      description: 'Housing and lodging services for corps members',
      icon: 'FaBuilding',
      color: '#3B82F6',
      totalListings: 445,
      approvedListings: 398,
      pendingListings: 32,
      flaggedListings: 15,
      avgRating: 4.2,
      totalViews: 25640,
      lastUpdated: '2025-09-07T10:30:00',
      status: 'active',
      subcategories: ['Hotels', 'Hostels', 'Apartments', 'Shared Rooms']
    },
    {
      id: 'CAT002',
      name: 'Transportation',
      description: 'Transport services and mobility solutions',
      icon: 'FaCar',
      color: '#10B981',
      totalListings: 378,
      approvedListings: 334,
      pendingListings: 28,
      flaggedListings: 16,
      avgRating: 4.0,
      totalViews: 19875,
      lastUpdated: '2025-09-06T14:15:00',
      status: 'active',
      subcategories: ['Buses', 'Taxis', 'Motorcycles', 'Car Rentals']
    },
    {
      id: 'CAT003',
      name: 'Food & Dining',
      description: 'Restaurants, cafes, and food services',
      icon: 'FaUtensils',
      color: '#F59E0B',
      totalListings: 298,
      approvedListings: 267,
      pendingListings: 21,
      flaggedListings: 10,
      avgRating: 4.3,
      totalViews: 18450,
      lastUpdated: '2025-09-07T09:20:00',
      status: 'active',
      subcategories: ['Fast Food', 'Local Cuisine', 'Cafes', 'Catering']
    },
    {
      id: 'CAT004',
      name: 'Healthcare',
      description: 'Medical services and health facilities',
      icon: 'FaStethoscope',
      color: '#EF4444',
      totalListings: 187,
      approvedListings: 172,
      pendingListings: 12,
      flaggedListings: 3,
      avgRating: 4.5,
      totalViews: 15230,
      lastUpdated: '2025-09-05T16:45:00',
      status: 'active',
      subcategories: ['Hospitals', 'Clinics', 'Pharmacies', 'Specialists']
    },
    {
      id: 'CAT005',
      name: 'Education',
      description: 'Educational institutions and learning centers',
      icon: 'FaGraduationCap',
      color: '#8B5CF6',
      totalListings: 156,
      approvedListings: 142,
      pendingListings: 9,
      flaggedListings: 5,
      avgRating: 4.4,
      totalViews: 12890,
      lastUpdated: '2025-09-04T11:30:00',
      status: 'active',
      subcategories: ['Libraries', 'Training Centers', 'Universities', 'Online Courses']
    },
    {
      id: 'CAT006',
      name: 'Entertainment',
      description: 'Recreational activities and entertainment venues',
      icon: 'FaGamepad',
      color: '#EC4899',
      totalListings: 103,
      approvedListings: 89,
      pendingListings: 8,
      flaggedListings: 6,
      avgRating: 4.1,
      totalViews: 9780,
      lastUpdated: '2025-09-03T13:20:00',
      status: 'active',
      subcategories: ['Cinemas', 'Gaming Centers', 'Sports', 'Events']
    }
  ]);

  const iconOptions = [
    { value: 'FaBuilding', label: 'Building', icon: FaBuilding },
    { value: 'FaCar', label: 'Car', icon: FaCar },
    { value: 'FaUtensils', label: 'Utensils', icon: FaUtensils },
    { value: 'FaStethoscope', label: 'Stethoscope', icon: FaStethoscope },
    { value: 'FaGraduationCap', label: 'Graduation Cap', icon: FaGraduationCap },
    { value: 'FaGamepad', label: 'Gamepad', icon: FaGamepad },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaCar': return FaCar;
      case 'FaUtensils': return FaUtensils;
      case 'FaStethoscope': return FaStethoscope;
      case 'FaGraduationCap': return FaGraduationCap;
      case 'FaGamepad': return FaGamepad;
      default: return FaBuilding;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCategory = () => {
    const newCat = {
      id: `CAT${String(categories.length + 1).padStart(3, '0')}`,
      ...newCategory,
      totalListings: 0,
      approvedListings: 0,
      pendingListings: 0,
      flaggedListings: 0,
      avgRating: 0,
      totalViews: 0,
      lastUpdated: new Date().toISOString(),
      status: 'active',
      subcategories: []
    };
    setCategories([...categories, newCat]);
    setShowAddModal(false);
    setNewCategory({ name: '', description: '', icon: 'FaBuilding', color: '#3B82F6' });
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color
    });
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, ...newCategory, lastUpdated: new Date().toISOString() }
        : cat
    ));
    setEditingCategory(null);
    setNewCategory({ name: '', description: '', icon: 'FaBuilding', color: '#3B82F6' });
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const totalStats = {
    totalListings: categories.reduce((sum, cat) => sum + cat.totalListings, 0),
    totalViews: categories.reduce((sum, cat) => sum + cat.totalViews, 0),
    avgRating: categories.reduce((sum, cat) => sum + cat.avgRating, 0) / categories.length
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
              <p className="text-gray-600 mt-2">Manage listing categories for Lagos State</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaBuilding className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaChartBar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalListings.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaEye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaChartBar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <IconComponent 
                          className="w-6 h-6" 
                          style={{ color: category.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">ID: {category.id}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(category.status)}`}>
                      {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4">{category.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-blue-600">{category.totalListings}</p>
                      <p className="text-xs text-gray-600">Total Listings</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-green-600">{category.approvedListings}</p>
                      <p className="text-xs text-gray-600">Approved</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-yellow-600">{category.pendingListings}</p>
                      <p className="text-xs text-gray-600">Pending</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-red-600">{category.flaggedListings}</p>
                      <p className="text-xs text-gray-600">Flagged</p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{category.avgRating}</p>
                      <p className="text-xs text-gray-600">Avg Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{category.totalViews.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Total Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{category.subcategories.length}</p>
                      <p className="text-xs text-gray-600">Subcategories</p>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-2">Subcategories:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((sub, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FaEye className="w-4 h-4" />
                      View
                    </button>
                    <button 
                      onClick={() => handleEditCategory(category)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Category Modal */}
        {(showAddModal || editingCategory) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', icon: 'FaBuilding', color: '#3B82F6' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', icon: 'FaBuilding', color: '#3B82F6' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaSave className="w-4 h-4" />
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminCategories;
