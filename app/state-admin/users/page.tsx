'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaUsers, FaUserGraduate, FaUserTie, FaUserShield, FaSearch, FaEye, FaEnvelope, FaBan, FaUserCheck, FaCalendar, FaMapMarkerAlt, FaPhone, FaBuilding, FaDownload } from 'react-icons/fa';

const StateAdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLGA, setSelectedLGA] = useState('all');

  // Mock users data for Lagos State
  const users = [
    {
      id: 'USR001',
      name: 'Adebayo Johnson',
      email: 'adebayo.johnson@email.com',
      phone: '+234 803 123 4567',
      userType: 'corps-member',
      status: 'active',
      joinDate: '2025-03-15',
      lastActive: '2025-09-07T10:30:00',
      lga: 'Lagos Island',
      profileComplete: 95,
      listingsCount: 3,
      reviewsCount: 12,
      avatar: null,
      verified: true,
      location: 'Marina, Lagos Island'
    },
    {
      id: 'USR002',
      name: 'Funmi Adebayo',
      email: 'funmi.adebayo@email.com',
      phone: '+234 804 234 5678',
      userType: 'corps-member',
      status: 'active',
      joinDate: '2025-03-15',
      lastActive: '2025-09-07T09:15:00',
      lga: 'Ikeja',
      profileComplete: 88,
      listingsCount: 1,
      reviewsCount: 8,
      avatar: null,
      verified: true,
      location: 'GRA Ikeja'
    },
    {
      id: 'USR003',
      name: 'Chief Kemi Okafor',
      email: 'kemi.okafor@business.com',
      phone: '+234 805 345 6789',
      userType: 'business-owner',
      status: 'active',
      joinDate: '2024-12-10',
      lastActive: '2025-09-07T11:45:00',
      lga: 'Victoria Island',
      profileComplete: 100,
      listingsCount: 8,
      reviewsCount: 45,
      avatar: null,
      verified: true,
      location: 'Adeola Odeku Street, VI'
    },
    {
      id: 'USR004',
      name: 'Dr. Olumide Adeyemi',
      email: 'olumide.adeyemi@hospital.com',
      phone: '+234 806 456 7890',
      userType: 'professional',
      status: 'active',
      joinDate: '2024-08-20',
      lastActive: '2025-09-06T16:20:00',
      lga: 'Surulere',
      profileComplete: 92,
      listingsCount: 2,
      reviewsCount: 23,
      avatar: null,
      verified: true,
      location: 'National Stadium Area'
    },
    {
      id: 'USR005',
      name: 'Sarah Okonkwo',
      email: 'sarah.okonkwo@gmail.com',
      phone: '+234 807 567 8901',
      userType: 'regular-user',
      status: 'suspended',
      joinDate: '2025-01-05',
      lastActive: '2025-08-30T14:10:00',
      lga: 'Yaba',
      profileComplete: 75,
      listingsCount: 0,
      reviewsCount: 3,
      avatar: null,
      verified: false,
      location: 'University of Lagos Area'
    },
    {
      id: 'USR006',
      name: 'Ibrahim Musa',
      email: 'ibrahim.musa@transport.com',
      phone: '+234 808 678 9012',
      userType: 'business-owner',
      status: 'active',
      joinDate: '2024-11-15',
      lastActive: '2025-09-07T08:30:00',
      lga: 'Alimosho',
      profileComplete: 85,
      listingsCount: 4,
      reviewsCount: 18,
      avatar: null,
      verified: true,
      location: 'Ikeja - Mainland Routes'
    },
    {
      id: 'USR007',
      name: 'Admin Lagos Central',
      email: 'admin.central@lagosstate.gov.ng',
      phone: '+234 809 789 0123',
      userType: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      lastActive: '2025-09-07T12:00:00',
      lga: 'Lagos Island',
      profileComplete: 100,
      listingsCount: 0,
      reviewsCount: 0,
      avatar: null,
      verified: true,
      location: 'NYSC Secretariat'
    }
  ];

  const userTypes = ['all', 'corps-member', 'business-owner', 'professional', 'regular-user', 'admin'];
  const statuses = ['all', 'active', 'suspended', 'banned', 'pending-verification'];
  const lgas = ['all', 'Lagos Island', 'Ikeja', 'Victoria Island', 'Surulere', 'Yaba', 'Alimosho'];

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'corps-member': return FaUserGraduate;
      case 'business-owner': return FaUserTie;
      case 'professional': return FaBuilding;
      case 'admin': return FaUserShield;
      default: return FaUsers;
    }
  };

  const getUserTypeBadge = (userType: string) => {
    switch (userType) {
      case 'corps-member':
        return 'bg-green-100 text-green-800';
      case 'business-owner':
        return 'bg-blue-100 text-blue-800';
      case 'professional':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      case 'pending-verification':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      (searchTerm === '' || 
       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.phone.includes(searchTerm)) &&
      (selectedUserType === 'all' || user.userType === selectedUserType) &&
      (selectedStatus === 'all' || user.status === selectedStatus) &&
      (selectedLGA === 'all' || user.lga === selectedLGA)
    );
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    corpsMembers: users.filter(u => u.userType === 'corps-member').length,
    businessOwners: users.filter(u => u.userType === 'business-owner').length,
    verified: users.filter(u => u.verified).length
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
              <p className="text-gray-600 mt-2">Manage all users in Lagos State</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FaDownload className="w-4 h-4" />
              Export Users
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaUsers className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaUserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaBan className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">{stats.suspended}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaUserGraduate className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Corps Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.corpsMembers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaUserTie className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Business</p>
                <p className="text-2xl font-bold text-gray-900">{stats.businessOwners}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaUserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* User Type Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
            >
              {userTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All User Types' : type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            {/* LGA Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedLGA}
              onChange={(e) => setSelectedLGA(e.target.value)}
            >
              {lgas.map(lga => (
                <option key={lga} value={lga}>
                  {lga === 'all' ? 'All LGAs' : lga}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">User</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Contact</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Type</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Location</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Activity</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const UserTypeIcon = getUserTypeIcon(user.userType);
                  return (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                              {user.name}
                              {user.verified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <FaUserCheck className="w-2 h-2 text-white" />
                                </div>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">ID: {user.id}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-green-600 h-1.5 rounded-full"
                                  style={{ width: `${user.profileComplete}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{user.profileComplete}%</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm text-gray-900">{user.email}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaPhone className="w-3 h-3" />
                            {user.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <UserTypeIcon className="w-4 h-4 text-gray-500" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeBadge(user.userType)}`}>
                            {user.userType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.lga}</p>
                            <p className="text-xs text-gray-600">{user.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm text-gray-900">{user.listingsCount} listings</p>
                          <p className="text-sm text-gray-600">{user.reviewsCount} reviews</p>
                          <p className="text-xs text-gray-500">
                            <FaCalendar className="w-3 h-3 inline mr-1" />
                            {getTimeAgo(user.lastActive)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                          {user.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <FaEnvelope className="w-4 h-4" />
                          </button>
                          {user.status === 'active' ? (
                            <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                              <FaBan className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <FaUserCheck className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <FaUsers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminUsers;
