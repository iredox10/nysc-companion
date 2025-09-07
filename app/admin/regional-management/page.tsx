'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaMapMarkerAlt, FaUsers, FaBook, FaChartLine, FaPlus, FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa';

const mockRegions = [
  {
    id: 'region1',
    name: 'South West',
    states: ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'],
    coordinator: 'Adebayo Johnson',
    coordinatorEmail: 'adebayo.j@nysccompanion.com',
    totalCorpMembers: 15420,
    activeGuides: 47,
    pendingApprovals: 12,
    issues: 3,
    performanceScore: 92,
    lastUpdate: '2024-02-20',
    status: 'active'
  },
  {
    id: 'region2',
    name: 'North Central',
    states: ['FCT', 'Kwara', 'Kogi', 'Nasarawa', 'Niger', 'Plateau', 'Benue'],
    coordinator: 'Fatima Ahmed',
    coordinatorEmail: 'fatima.a@nysccompanion.com',
    totalCorpMembers: 12380,
    activeGuides: 38,
    pendingApprovals: 8,
    issues: 1,
    performanceScore: 88,
    lastUpdate: '2024-02-19',
    status: 'active'
  },
  {
    id: 'region3',
    name: 'South East',
    states: ['Enugu', 'Anambra', 'Imo', 'Abia', 'Ebonyi'],
    coordinator: 'Chukwudi Okafor',
    coordinatorEmail: 'chukwudi.o@nysccompanion.com',
    totalCorpMembers: 9850,
    activeGuides: 31,
    pendingApprovals: 15,
    issues: 5,
    performanceScore: 78,
    lastUpdate: '2024-02-18',
    status: 'needs_attention'
  },
  {
    id: 'region4',
    name: 'North West',
    states: ['Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara', 'Jigawa'],
    coordinator: 'Aminu Bello',
    coordinatorEmail: 'aminu.b@nysccompanion.com',
    totalCorpMembers: 11200,
    activeGuides: 25,
    pendingApprovals: 20,
    issues: 8,
    performanceScore: 65,
    lastUpdate: '2024-02-15',
    status: 'needs_attention'
  },
  {
    id: 'region5',
    name: 'South South',
    states: ['Rivers', 'Delta', 'Cross River', 'Akwa Ibom', 'Bayelsa', 'Edo'],
    coordinator: 'Emeka Nwosu',
    coordinatorEmail: 'emeka.n@nysccompanion.com',
    totalCorpMembers: 8950,
    activeGuides: 29,
    pendingApprovals: 6,
    issues: 2,
    performanceScore: 85,
    lastUpdate: '2024-02-21',
    status: 'active'
  },
  {
    id: 'region6',
    name: 'North East',
    states: ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    coordinator: 'Aisha Musa',
    coordinatorEmail: 'aisha.m@nysccompanion.com',
    totalCorpMembers: 7600,
    activeGuides: 18,
    pendingApprovals: 11,
    issues: 4,
    performanceScore: 72,
    lastUpdate: '2024-02-17',
    status: 'needs_attention'
  }
];

const RegionalManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredRegions = mockRegions.filter(region => {
    const matchesSearch = region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.states.some(state => state.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || region.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' },
      'needs_attention': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Needs Attention' },
      'inactive': { bg: 'bg-red-100', text: 'text-red-700', label: 'Inactive' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalStats = {
    totalCorpMembers: mockRegions.reduce((sum, r) => sum + r.totalCorpMembers, 0),
    totalGuides: mockRegions.reduce((sum, r) => sum + r.activeGuides, 0),
    totalPending: mockRegions.reduce((sum, r) => sum + r.pendingApprovals, 0),
    totalIssues: mockRegions.reduce((sum, r) => sum + r.issues, 0),
    avgPerformance: Math.round(mockRegions.reduce((sum, r) => sum + r.performanceScore, 0) / mockRegions.length)
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Regional Management</h1>
            <p className="text-gray-600">Manage regions, coordinators, and regional performance</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
              <FaPlus />
              Add Region
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Corps Members</p>
              <p className="text-3xl font-black text-gray-800">{totalStats.totalCorpMembers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Guides</p>
              <p className="text-3xl font-black text-gray-800">{totalStats.totalGuides}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaBook className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p className="text-3xl font-black text-gray-800">{totalStats.totalPending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaUserCheck className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Issues</p>
              <p className="text-3xl font-black text-gray-800">{totalStats.totalIssues}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Performance</p>
              <p className={`text-3xl font-black ${getPerformanceColor(totalStats.avgPerformance)}`}>
                {totalStats.avgPerformance}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search regions, coordinators, or states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="needs_attention">Needs Attention</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredRegions.map((region) => (
          <div key={region.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{region.name}</h3>
                {getStatusBadge(region.status)}
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <FaMapMarkerAlt />
                <span className="text-sm">{region.states.length} states</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* States */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">States Covered</h4>
                <div className="flex flex-wrap gap-1">
                  {region.states.map((state, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {state}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coordinator */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Regional Coordinator</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{region.coordinator}</p>
                    <p className="text-sm text-gray-500">{region.coordinatorEmail}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{region.totalCorpMembers.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Corps Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{region.activeGuides}</p>
                  <p className="text-xs text-gray-500">Active Guides</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{region.pendingApprovals}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${getPerformanceColor(region.performanceScore)}`}>
                    {region.performanceScore}%
                  </p>
                  <p className="text-xs text-gray-500">Performance</p>
                </div>
              </div>

              {/* Issues */}
              {region.issues > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    <span className="text-sm font-medium text-red-700">
                      {region.issues} issue{region.issues > 1 ? 's' : ''} requiring attention
                    </span>
                  </div>
                </div>
              )}

              {/* Last Update */}
              <div className="text-xs text-gray-500 mb-4">
                Last updated: {new Date(region.lastUpdate).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  <FaEye className="inline mr-2" />
                  View Details
                </button>
                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRegions.length === 0 && (
        <div className="text-center py-16">
          <FaMapMarkerAlt className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No regions found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default RegionalManagementPage;
