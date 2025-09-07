'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { mockUser } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaUserShield, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaBan, FaCheck, FaDownload, FaUserPlus, FaUsers } from 'react-icons/fa';

const mockUsers = [
  {...mockUser, $id: '1', deployment: 'Lagos/Ikeja', role: 'Corper', status: 'Active', joinDate: '2024-08-15', batch: 'Batch C 2024', phone: '+234 803 456 7890' },
  { $id: '2', name: 'Jane Smith', email: 'jane@example.com', deployment: 'Abia/Aba North', role: 'Corper', status: 'Active', joinDate: '2024-08-20', batch: 'Batch C 2024', phone: '+234 805 678 9012' },
  { $id: '3', name: 'Admin User', email: 'admin@nysc.com', deployment: 'FCT/Abuja', role: 'Admin', status: 'Active', joinDate: '2024-01-10', batch: 'N/A', phone: '+234 807 123 4567' },
  { $id: '4', name: 'Peter Johnson', email: 'peter@example.com', deployment: 'Kano/Kano Municipal', role: 'Corper', status: 'Inactive', joinDate: '2024-08-18', batch: 'Batch C 2024', phone: '+234 809 234 5678' },
  { $id: '5', name: 'Mary Williams', email: 'mary@example.com', deployment: 'Rivers/Port Harcourt', role: 'Corper', status: 'Active', joinDate: '2024-08-22', batch: 'Batch C 2024', phone: '+234 811 345 6789' },
  { $id: '6', name: 'David Brown', email: 'david@example.com', deployment: 'Ogun/Abeokuta South', role: 'Corper', status: 'Suspended', joinDate: '2024-08-12', batch: 'Batch C 2024', phone: '+234 813 456 7890' },
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.deployment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(prev => 
      prev.length === filteredUsers.length ? [] : filteredUsers.map(user => user.$id)
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheck },
      'Inactive': { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaUser },
      'Suspended': { bg: 'bg-red-100', text: 'text-red-700', icon: FaBan },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Active;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="text-xs" />
        {status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
      }`}>
        {role === 'Admin' ? <FaUserShield className="text-xs" /> : <FaUser className="text-xs" />}
        {role}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">User Management</h1>
            <p className="text-gray-600">Manage corps members and administrators across the platform</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
              <FaUserPlus />
              Add New User
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
              <FaDownload />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-black text-gray-800">{mockUsers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Corps Members</p>
              <p className="text-3xl font-black text-gray-800">{mockUsers.filter(u => u.role === 'Corper' && u.status === 'Active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaUser className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Administrators</p>
              <p className="text-3xl font-black text-gray-800">{mockUsers.filter(u => u.role === 'Admin').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaUserShield className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New This Month</p>
              <p className="text-3xl font-black text-gray-800">{mockUsers.filter(u => new Date(u.joinDate) > new Date('2024-08-01')).length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or deployment location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-4 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white min-w-32"
            >
              <option value="All">All Roles</option>
              <option value="Corper">Corps Members</option>
              <option value="Admin">Administrators</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white min-w-32"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredUsers.length} of {mockUsers.length} users</span>
          {selectedUsers.length > 0 && (
            <span className="text-blue-600 font-medium">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">User</th>
                <th className="text-left p-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left p-4 font-semibold text-gray-700">Deployment</th>
                <th className="text-left p-4 font-semibold text-gray-700">Role & Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Batch Info</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.$id} className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.$id)}
                      onChange={() => toggleUserSelection(user.$id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">ID: {user.$id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-800">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-gray-400" />
                      {user.deployment}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">{user.batch}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaCalendarAlt />
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </div>
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
                        title="Edit User"
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        title="Delete User"
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <FaUsers className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                Activate
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
                Suspend
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium">
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UsersPage;
