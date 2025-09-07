'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaUserGraduate, FaSearch, FaFilter, FaEye, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUniversity, FaIdCard, FaDownload, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa';

const StateAdminCorpsMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock corps members data for Lagos State
  const corpsMembers = [
    {
      id: 'LS/25A/1234',
      stateCode: 'LS/25A/1234',
      firstName: 'Adebayo',
      lastName: 'Johnson',
      email: 'adebayo.johnson@nysc.gov.ng',
      phone: '+234 803 123 4567',
      institution: 'University of Lagos',
      qualification: 'B.Sc Computer Science',
      deploymentLGA: 'Lagos Island',
      ppa: 'First Bank Nigeria Limited',
      batch: '2025 Batch A',
      dateOfDeployment: '2025-03-15',
      status: 'active',
      accommodation: 'Lodge Valley Hotel',
      emergencyContact: '+234 801 987 6543',
      stateOfOrigin: 'Ogun State',
      age: 24,
      gender: 'Male',
      maritalStatus: 'Single',
      serviceYear: '2025/2026'
    },
    {
      id: 'LS/25A/2345',
      stateCode: 'LS/25A/2345',
      firstName: 'Funmi',
      lastName: 'Adebayo',
      email: 'funmi.adebayo@nysc.gov.ng',
      phone: '+234 804 234 5678',
      institution: 'Obafemi Awolowo University',
      qualification: 'B.A English Language',
      deploymentLGA: 'Ikeja',
      ppa: 'Government Secondary School',
      batch: '2025 Batch A',
      dateOfDeployment: '2025-03-15',
      status: 'active',
      accommodation: 'NYSC Lodge Ikeja',
      emergencyContact: '+234 802 876 5432',
      stateOfOrigin: 'Osun State',
      age: 23,
      gender: 'Female',
      maritalStatus: 'Single',
      serviceYear: '2025/2026'
    },
    {
      id: 'LS/25A/3456',
      stateCode: 'LS/25A/3456',
      firstName: 'Kemi',
      lastName: 'Okafor',
      email: 'kemi.okafor@nysc.gov.ng',
      phone: '+234 805 345 6789',
      institution: 'University of Ibadan',
      qualification: 'B.Sc Economics',
      deploymentLGA: 'Victoria Island',
      ppa: 'Central Bank of Nigeria',
      batch: '2025 Batch A',
      dateOfDeployment: '2025-03-15',
      status: 'active',
      accommodation: 'Private Lodge VI',
      emergencyContact: '+234 803 765 4321',
      stateOfOrigin: 'Anambra State',
      age: 25,
      gender: 'Female',
      maritalStatus: 'Single',
      serviceYear: '2025/2026'
    },
    {
      id: 'LS/24C/9876',
      stateCode: 'LS/24C/9876',
      firstName: 'Olumide',
      lastName: 'Adeyemi',
      email: 'olumide.adeyemi@nysc.gov.ng',
      phone: '+234 806 456 7890',
      institution: 'Lagos State University',
      qualification: 'B.Eng Mechanical Engineering',
      deploymentLGA: 'Surulere',
      ppa: 'Nigerian Breweries Plc',
      batch: '2024 Batch C',
      dateOfDeployment: '2024-11-15',
      status: 'completing',
      accommodation: 'Surulere Lodge',
      emergencyContact: '+234 804 654 3210',
      stateOfOrigin: 'Lagos State',
      age: 26,
      gender: 'Male',
      maritalStatus: 'Married',
      serviceYear: '2024/2025'
    },
    {
      id: 'LS/25A/4567',
      stateCode: 'LS/25A/4567',
      firstName: 'Sarah',
      lastName: 'Okonkwo',
      email: 'sarah.okonkwo@nysc.gov.ng',
      phone: '+234 807 567 8901',
      institution: 'University of Nigeria Nsukka',
      qualification: 'B.Sc Biology',
      deploymentLGA: 'Yaba',
      ppa: 'Lagos University Teaching Hospital',
      batch: '2025 Batch A',
      dateOfDeployment: '2025-03-15',
      status: 'absconded',
      accommodation: 'Yaba Medical Lodge',
      emergencyContact: '+234 805 543 2109',
      stateOfOrigin: 'Enugu State',
      age: 24,
      gender: 'Female',
      maritalStatus: 'Single',
      serviceYear: '2025/2026'
    },
    {
      id: 'LS/25A/5678',
      stateCode: 'LS/25A/5678',
      firstName: 'Ibrahim',
      lastName: 'Musa',
      email: 'ibrahim.musa@nysc.gov.ng',
      phone: '+234 808 678 9012',
      institution: 'Ahmadu Bello University',
      qualification: 'B.Sc Agriculture',
      deploymentLGA: 'Alimosho',
      ppa: 'Lagos State Ministry of Agriculture',
      batch: '2025 Batch A',
      dateOfDeployment: '2025-03-15',
      status: 'active',
      accommodation: 'Alimosho Hostel',
      emergencyContact: '+234 806 432 1098',
      stateOfOrigin: 'Kaduna State',
      age: 25,
      gender: 'Male',
      maritalStatus: 'Single',
      serviceYear: '2025/2026'
    }
  ];

  const lgas = ['all', 'Lagos Island', 'Ikeja', 'Victoria Island', 'Surulere', 'Yaba', 'Alimosho'];
  const batches = ['all', '2025 Batch A', '2024 Batch C', '2024 Batch B'];
  const statuses = ['all', 'active', 'completing', 'absconded', 'redeployed'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completing':
        return 'bg-blue-100 text-blue-800';
      case 'absconded':
        return 'bg-red-100 text-red-800';
      case 'redeployed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <FaUserCheck className="w-3 h-3" />;
      case 'absconded':
        return <FaExclamationTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const filteredCorpsMembers = corpsMembers.filter(member => {
    return (
      (searchTerm === '' || 
       member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       member.stateCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
       member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLGA === 'all' || member.deploymentLGA === selectedLGA) &&
      (selectedBatch === 'all' || member.batch === selectedBatch) &&
      (selectedStatus === 'all' || member.status === selectedStatus)
    );
  });

  const stats = {
    total: corpsMembers.length,
    active: corpsMembers.filter(m => m.status === 'active').length,
    completing: corpsMembers.filter(m => m.status === 'completing').length,
    absconded: corpsMembers.filter(m => m.status === 'absconded').length,
    male: corpsMembers.filter(m => m.gender === 'Male').length,
    female: corpsMembers.filter(m => m.gender === 'Female').length
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Corps Members</h1>
              <p className="text-gray-600 mt-2">Manage corps members deployed to Lagos State</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FaDownload className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaUserGraduate className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
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
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaCalendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completing</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completing}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FaExclamationTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Absconded</p>
                <p className="text-2xl font-bold text-gray-900">{stats.absconded}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaUserGraduate className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Male</p>
                <p className="text-2xl font-bold text-gray-900">{stats.male}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <FaUserGraduate className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Female</p>
                <p className="text-2xl font-bold text-gray-900">{stats.female}</p>
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
                  placeholder="Search by name, state code, or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

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

            {/* Batch Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              {batches.map(batch => (
                <option key={batch} value={batch}>
                  {batch === 'all' ? 'All Batches' : batch}
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
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Corps Members Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Corps Member</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">State Code</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Deployment</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">PPA</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Batch</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCorpsMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FaUserGraduate className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{member.firstName} {member.lastName}</h3>
                          <p className="text-sm text-gray-600">{member.qualification}</p>
                          <p className="text-xs text-gray-500">{member.institution}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaIdCard className="text-gray-400 text-sm" />
                        <span className="font-mono text-sm">{member.stateCode}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400 text-sm" />
                        <span className="text-sm">{member.deploymentLGA}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.ppa}</p>
                        <p className="text-xs text-gray-600">{member.accommodation}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {member.batch}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(member.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <FaEnvelope className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <FaPhone className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCorpsMembers.length === 0 && (
            <div className="text-center py-12">
              <FaUserGraduate className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No corps members found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCorpsMembers.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {filteredCorpsMembers.length} of {corpsMembers.length} corps members
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

export default StateAdminCorpsMembers;
