'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaUsers, FaMapMarkerAlt, FaCalendarCheck, FaCalendarTimes, FaClock } from 'react-icons/fa';

const mockBatches = [
  {
    id: 'batch1',
    name: '2024 Batch A',
    year: 2024,
    batchLetter: 'A',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    orientation: {
      startDate: '2024-03-01',
      endDate: '2024-03-21',
      status: 'completed'
    },
    membersCount: 1156,
    status: 'active',
    deploymentStates: ['Kwara', 'Lagos', 'Ogun', 'Oyo', 'Osun'],
    allowanceStatus: 'current'
  },
  {
    id: 'batch2',
    name: '2024 Batch B',
    year: 2024,
    batchLetter: 'B',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    orientation: {
      startDate: '2024-09-01',
      endDate: '2024-09-21',
      status: 'ongoing'
    },
    membersCount: 892,
    status: 'registration',
    deploymentStates: ['FCT', 'Nasarawa', 'Niger', 'Kogi'],
    allowanceStatus: 'pending'
  },
  {
    id: 'batch3',
    name: '2023 Batch A',
    year: 2023,
    batchLetter: 'A',
    startDate: '2023-03-01',
    endDate: '2024-02-29',
    orientation: {
      startDate: '2023-03-01',
      endDate: '2023-03-21',
      status: 'completed'
    },
    membersCount: 1089,
    status: 'completed',
    deploymentStates: ['Rivers', 'Bayelsa', 'Cross River', 'Akwa Ibom'],
    allowanceStatus: 'completed'
  }
];

const BatchManagementPage = () => {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-700', icon: FaCalendarCheck },
      'registration': { bg: 'bg-blue-100', text: 'text-blue-700', icon: FaClock },
      'completed': { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaCalendarTimes },
      'suspended': { bg: 'bg-red-100', text: 'text-red-700', icon: FaCalendarTimes },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getOrientationStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { bg: 'bg-green-100', text: 'text-green-700' },
      'ongoing': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Batch Management</h1>
            <p className="text-gray-600">Manage NYSC service year batches and deployment schedules</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium"
            >
              <FaPlus />
              Create New Batch
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Batches</p>
              <p className="text-3xl font-black text-gray-800">{mockBatches.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaCalendarAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Batches</p>
              <p className="text-3xl font-black text-gray-800">{mockBatches.filter(b => b.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCalendarCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Corps Members</p>
              <p className="text-3xl font-black text-gray-800">{mockBatches.reduce((sum, batch) => sum + batch.membersCount, 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Deployment States</p>
              <p className="text-3xl font-black text-gray-800">36</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaMapMarkerAlt className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockBatches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            {/* Batch Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{batch.name}</h3>
                <p className="text-sm text-gray-500">{batch.year} Service Year</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaEdit />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              {getStatusBadge(batch.status)}
            </div>

            {/* Key Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm font-medium text-gray-800">
                  {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Corps Members</span>
                <span className="text-sm font-medium text-gray-800">{batch.membersCount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Deployment States</span>
                <span className="text-sm font-medium text-gray-800">{batch.deploymentStates.length}</span>
              </div>
            </div>

            {/* Orientation Camp */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Orientation Camp</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Period</span>
                  <span className="text-xs font-medium text-gray-800">
                    {new Date(batch.orientation.startDate).toLocaleDateString()} - {new Date(batch.orientation.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Status</span>
                  {getOrientationStatusBadge(batch.orientation.status)}
                </div>
              </div>
            </div>

            {/* Deployment States */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Deployment States</h4>
              <div className="flex flex-wrap gap-1">
                {batch.deploymentStates.slice(0, 3).map((state, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {state}
                  </span>
                ))}
                {batch.deploymentStates.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{batch.deploymentStates.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Batch Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Batch</h3>
            <p className="text-gray-600 mb-6">This feature will be implemented to create new service year batches.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BatchManagementPage;
