'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaUserGraduate, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaDownload, FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaEnvelope, FaUniversity, FaIdCard } from 'react-icons/fa';

// Extended mock corps members data
const mockCorpsMembers = [
  {
    id: 'CM001',
    stateCode: 'NY/24A/001',
    firstName: 'Adebayo',
    lastName: 'Johnson',
    email: 'adebayo.johnson@email.com',
    phone: '+234 803 456 7890',
    batch: '2024 Batch A',
    stateOfDeployment: 'Kwara',
    lga: 'Ilorin West',
    ppa: 'Kwara State Ministry of Education',
    institution: 'University of Lagos',
    course: 'Computer Science',
    status: 'active',
    joinDate: '2024-03-01',
    profilePicture: null,
    address: '15 Stadium Road, Ilorin',
    allowanceStatus: 'current'
  },
  {
    id: 'CM002',
    stateCode: 'NY/24A/002',
    firstName: 'Chioma',
    lastName: 'Okwu',
    email: 'chioma.okwu@email.com',
    phone: '+234 905 678 1234',
    batch: '2024 Batch A',
    stateOfDeployment: 'Lagos',
    lga: 'Ikeja',
    ppa: 'Lagos State Teaching Hospital',
    institution: 'University of Nigeria, Nsukka',
    course: 'Medicine',
    status: 'active',
    joinDate: '2024-03-01',
    profilePicture: null,
    address: '7 Allen Avenue, Ikeja',
    allowanceStatus: 'current'
  },
  {
    id: 'CM003',
    stateCode: 'NY/24A/003',
    firstName: 'Kemi',
    lastName: 'Adebisi',
    email: 'kemi.adebisi@email.com',
    phone: '+234 812 345 6789',
    batch: '2024 Batch A',
    stateOfDeployment: 'Ogun',
    lga: 'Abeokuta South',
    ppa: 'Ogun State Broadcasting Corporation',
    institution: 'Obafemi Awolowo University',
    course: 'Mass Communication',
    status: 'completed',
    joinDate: '2023-03-01',
    profilePicture: null,
    address: '23 Sapon Road, Abeokuta',
    allowanceStatus: 'completed'
  }
];

const CorpsMembersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const filteredMembers = mockCorpsMembers.filter(member => {
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.stateCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = batchFilter === 'All' || member.batch === batchFilter;
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    const matchesState = stateFilter === 'All' || member.stateOfDeployment === stateFilter;
    return matchesSearch && matchesBatch && matchesStatus && matchesState;
  });

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedMembers(prev => 
      prev.length === filteredMembers.length ? [] : filteredMembers.map(member => member.id)
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-700' },
      'completed': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'suspended': { bg: 'bg-red-100', text: 'text-red-700' },
      'on-leave': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Corps Members</h1>
            <p className="text-gray-600">Manage NYSC corps members and their deployment details</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
              <FaPlus />
              Add Corps Member
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
              <FaDownload />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Corps Members</p>
              <p className="text-3xl font-black text-gray-800">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUserGraduate className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-3xl font-black text-gray-800">1,156</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaUserGraduate className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-3xl font-black text-gray-800">89</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUserGraduate className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">On Leave</p>
              <p className="text-3xl font-black text-gray-800">2</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaUserGraduate className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, state code, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Batches</option>
            <option value="2024 Batch A">2024 Batch A</option>
            <option value="2024 Batch B">2024 Batch B</option>
            <option value="2023 Batch A">2023 Batch A</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="suspended">Suspended</option>
            <option value="on-leave">On Leave</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All States</option>
            <option value="Kwara">Kwara</option>
            <option value="Lagos">Lagos</option>
            <option value="Ogun">Ogun</option>
          </select>
        </div>
      </div>

      {/* Corps Members Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">Corps Member</th>
                <th className="text-left p-4 font-semibold text-gray-700">State Code</th>
                <th className="text-left p-4 font-semibold text-gray-700">Deployment</th>
                <th className="text-left p-4 font-semibold text-gray-700">PPA</th>
                <th className="text-left p-4 font-semibold text-gray-700">Institution</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member.id} className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => toggleMemberSelection(member.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {getInitials(member.firstName, member.lastName)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{member.firstName} {member.lastName}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-xs text-gray-400">{member.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {member.stateCode}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">{member.stateOfDeployment}</p>
                      <p className="text-xs text-gray-500">{member.lga}</p>
                      <p className="text-xs text-gray-400">{member.batch}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-800">{member.ppa}</p>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">{member.institution}</p>
                      <p className="text-xs text-gray-500">{member.course}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        title="View Profile"
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEye />
                      </button>
                      <button 
                        title="Edit Member"
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        title="Delete Member"
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
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <FaUserGraduate className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No corps members found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CorpsMembersPage;
