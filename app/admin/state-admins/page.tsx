'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaUserTie, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes, FaBan, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa';

const mockStateAdmins = [
  {
    id: 'admin1',
    name: 'Adebayo Johnson',
    email: 'adebayo.j@nysccompanion.com',
    phone: '+234 803 456 7890',
    state: 'Lagos',
    region: 'South West',
    role: 'State Administrator',
    status: 'active',
    joinDate: '2023-08-15',
    lastLogin: '2024-02-21T10:30:00Z',
    totalGuides: 23,
    pendingApprovals: 5,
    completedTasks: 87,
    performanceRating: 4.8,
    corpsMembersManaged: 8500,
    permissions: ['content_management', 'user_moderation', 'analytics_view', 'announcement_create'],
    avatar: null
  },
  {
    id: 'admin2',
    name: 'Fatima Ahmed',
    email: 'fatima.a@nysccompanion.com',
    phone: '+234 803 567 8901',
    state: 'FCT',
    region: 'North Central',
    role: 'State Administrator',
    status: 'active',
    joinDate: '2023-09-20',
    lastLogin: '2024-02-20T15:45:00Z',
    totalGuides: 19,
    pendingApprovals: 3,
    completedTasks: 72,
    performanceRating: 4.6,
    corpsMembersManaged: 6200,
    permissions: ['content_management', 'user_moderation', 'analytics_view'],
    avatar: null
  },
  {
    id: 'admin3',
    name: 'Chukwudi Okafor',
    email: 'chukwudi.o@nysccompanion.com',
    phone: '+234 803 678 9012',
    state: 'Enugu',
    region: 'South East',
    role: 'State Administrator',
    status: 'pending',
    joinDate: '2024-01-10',
    lastLogin: '2024-02-19T09:20:00Z',
    totalGuides: 8,
    pendingApprovals: 12,
    completedTasks: 34,
    performanceRating: 3.9,
    corpsMembersManaged: 3200,
    permissions: ['content_management', 'analytics_view'],
    avatar: null
  },
  {
    id: 'admin4',
    name: 'Kemi Adeyemi',
    email: 'kemi.a@nysccompanion.com',
    phone: '+234 803 789 0123',
    state: 'Ogun',
    region: 'South West',
    role: 'State Administrator',
    status: 'active',
    joinDate: '2023-07-12',
    lastLogin: '2024-02-21T08:15:00Z',
    totalGuides: 31,
    pendingApprovals: 2,
    completedTasks: 95,
    performanceRating: 4.9,
    corpsMembersManaged: 5800,
    permissions: ['content_management', 'user_moderation', 'analytics_view', 'announcement_create'],
    avatar: null
  },
  {
    id: 'admin5',
    name: 'Aminu Bello',
    email: 'aminu.b@nysccompanion.com',
    phone: '+234 803 890 1234',
    state: 'Kano',
    region: 'North West',
    role: 'State Administrator',
    status: 'suspended',
    joinDate: '2023-11-05',
    lastLogin: '2024-02-10T14:30:00Z',
    totalGuides: 12,
    pendingApprovals: 8,
    completedTasks: 48,
    performanceRating: 3.2,
    corpsMembersManaged: 4100,
    permissions: ['content_management'],
    avatar: null
  },
  {
    id: 'admin6',
    name: 'Blessing Okonkwo',
    email: 'blessing.o@nysccompanion.com',
    phone: '+234 803 901 2345',
    state: 'Rivers',
    region: 'South South',
    role: 'State Administrator',
    status: 'active',
    joinDate: '2023-10-18',
    lastLogin: '2024-02-21T11:45:00Z',
    totalGuides: 26,
    pendingApprovals: 4,
    completedTasks: 78,
    performanceRating: 4.5,
    corpsMembersManaged: 4700,
    permissions: ['content_management', 'user_moderation', 'analytics_view'],
    avatar: null
  }
];

const StateAdminsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);

  const filteredAdmins = mockStateAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || admin.status === statusFilter;
    const matchesRegion = regionFilter === 'All' || admin.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const toggleAdminSelection = (adminId: string) => {
    setSelectedAdmins(prev => 
      prev.includes(adminId) 
        ? prev.filter(id => id !== adminId)
        : [...prev, adminId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedAdmins(prev => 
      prev.length === filteredAdmins.length ? [] : filteredAdmins.map(admin => admin.id)
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheck },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: FaExclamationTriangle },
      'suspended': { bg: 'bg-red-100', text: 'text-red-700', icon: FaBan },
      'inactive': { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaTimes },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1 text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const regions = Array.from(new Set(mockStateAdmins.map(admin => admin.region)));

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">State Administrators</h1>
            <p className="text-gray-600">Manage state-level administrators and their permissions</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
              <FaPlus />
              Add State Admin
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Admins</p>
              <p className="text-3xl font-black text-gray-800">{mockStateAdmins.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUserTie className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-3xl font-black text-gray-800">{mockStateAdmins.filter(a => a.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaUserCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approval</p>
              <p className="text-3xl font-black text-gray-800">{mockStateAdmins.filter(a => a.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Performance</p>
              <p className="text-3xl font-black text-gray-800">
                {(mockStateAdmins.reduce((sum, a) => sum + a.performanceRating, 0) / mockStateAdmins.length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins by name, email, or state..."
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
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAdmins.length === filteredAdmins.length && filteredAdmins.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State/Region</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAdmins.includes(admin.id)}
                      onChange={() => toggleAdminSelection(admin.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <FaUserTie className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                        <div className="text-sm text-gray-500">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{admin.state}</div>
                        <div className="text-sm text-gray-500">{admin.region}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className={`text-sm font-bold ${getPerformanceColor(admin.performanceRating)}`}>
                        {admin.performanceRating}/5.0
                      </div>
                      <div className="text-xs text-gray-500">
                        {admin.totalGuides} guides • {admin.completedTasks} tasks
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(admin.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatLastLogin(admin.lastLogin)}</div>
                    <div className="text-xs text-gray-500">
                      Joined {new Date(admin.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <FaEye />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAdmins.length === 0 && (
        <div className="text-center py-16">
          <FaUserTie className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No state admins found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default StateAdminsPage;
