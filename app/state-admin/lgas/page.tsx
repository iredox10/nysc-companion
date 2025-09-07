'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaMapMarkerAlt, FaBuilding, FaUsers, FaChartLine, FaEye, FaEdit, FaStar, FaArrowUp, FaArrowDown, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const StateAdminLGAs = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock LGA data for Lagos State
  const lgaData = [
    {
      id: 'LGA001',
      name: 'Lagos Island',
      area: '8.7 km²',
      population: 47000,
      listings: 234,
      approvedListings: 215,
      pendingListings: 12,
      flaggedListings: 7,
      totalViews: 12450,
      avgRating: 4.2,
      categories: {
        accommodation: 89,
        transportation: 45,
        food: 38,
        healthcare: 34,
        education: 21,
        entertainment: 7
      },
      performance: {
        approvalRate: 91.9,
        responseTime: '2.1 hours',
        userSatisfaction: 4.2,
        trend: 'up'
      },
      coordinator: 'Adebayo Johnson',
      contact: '+234 801 234 5678',
      email: 'adebayo.johnson@lagosisland.gov.ng',
      status: 'active'
    },
    {
      id: 'LGA002',
      name: 'Ikeja',
      area: '49.92 km²',
      population: 313196,
      listings: 189,
      approvedListings: 166,
      pendingListings: 15,
      flaggedListings: 8,
      totalViews: 9876,
      avgRating: 4.0,
      categories: {
        accommodation: 67,
        transportation: 38,
        food: 31,
        healthcare: 28,
        education: 18,
        entertainment: 7
      },
      performance: {
        approvalRate: 87.8,
        responseTime: '2.8 hours',
        userSatisfaction: 4.0,
        trend: 'up'
      },
      coordinator: 'Funmi Adebayo',
      contact: '+234 802 345 6789',
      email: 'funmi.adebayo@ikeja.gov.ng',
      status: 'active'
    },
    {
      id: 'LGA003',
      name: 'Victoria Island',
      area: '8.4 km²',
      population: 32000,
      listings: 156,
      approvedListings: 148,
      pendingListings: 5,
      flaggedListings: 3,
      totalViews: 15234,
      avgRating: 4.5,
      categories: {
        accommodation: 52,
        transportation: 29,
        food: 34,
        healthcare: 23,
        education: 12,
        entertainment: 6
      },
      performance: {
        approvalRate: 94.9,
        responseTime: '1.9 hours',
        userSatisfaction: 4.5,
        trend: 'up'
      },
      coordinator: 'Kemi Okafor',
      contact: '+234 803 456 7890',
      email: 'kemi.okafor@victoriaisland.gov.ng',
      status: 'active'
    },
    {
      id: 'LGA004',
      name: 'Surulere',
      area: '23.26 km²',
      population: 503975,
      listings: 143,
      approvedListings: 121,
      pendingListings: 18,
      flaggedListings: 4,
      totalViews: 8765,
      avgRating: 3.8,
      categories: {
        accommodation: 45,
        transportation: 32,
        food: 28,
        healthcare: 21,
        education: 12,
        entertainment: 5
      },
      performance: {
        approvalRate: 84.6,
        responseTime: '3.2 hours',
        userSatisfaction: 3.8,
        trend: 'down'
      },
      coordinator: 'Olumide Adeyemi',
      contact: '+234 804 567 8901',
      email: 'olumide.adeyemi@surulere.gov.ng',
      status: 'needs-attention'
    },
    {
      id: 'LGA005',
      name: 'Yaba',
      area: '6.2 km²',
      population: 222000,
      listings: 128,
      approvedListings: 115,
      pendingListings: 9,
      flaggedListings: 4,
      totalViews: 7890,
      avgRating: 4.1,
      categories: {
        accommodation: 38,
        transportation: 24,
        food: 26,
        healthcare: 18,
        education: 16,
        entertainment: 6
      },
      performance: {
        approvalRate: 89.8,
        responseTime: '2.5 hours',
        userSatisfaction: 4.1,
        trend: 'stable'
      },
      coordinator: 'Sarah Okonkwo',
      contact: '+234 805 678 9012',
      email: 'sarah.okonkwo@yaba.gov.ng',
      status: 'active'
    },
    {
      id: 'LGA006',
      name: 'Alimosho',
      area: '137.8 km²',
      population: 1277714,
      listings: 98,
      approvedListings: 82,
      pendingListings: 12,
      flaggedListings: 4,
      totalViews: 5432,
      avgRating: 3.9,
      categories: {
        accommodation: 32,
        transportation: 28,
        food: 18,
        healthcare: 12,
        education: 6,
        entertainment: 2
      },
      performance: {
        approvalRate: 83.7,
        responseTime: '3.5 hours',
        userSatisfaction: 3.9,
        trend: 'up'
      },
      coordinator: 'Ibrahim Musa',
      contact: '+234 806 789 0123',
      email: 'ibrahim.musa@alimosho.gov.ng',
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'needs-attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="text-green-500" />;
      case 'down':
        return <FaArrowDown className="text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPerformanceIcon = (rate: number) => {
    if (rate >= 90) return <FaCheckCircle className="text-green-500" />;
    if (rate >= 80) return <FaExclamationTriangle className="text-yellow-500" />;
    return <FaExclamationTriangle className="text-red-500" />;
  };

  const filteredLGAs = lgaData.filter(lga =>
    lga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalListings: lgaData.reduce((sum, lga) => sum + lga.listings, 0),
    totalPopulation: lgaData.reduce((sum, lga) => sum + lga.population, 0),
    avgApprovalRate: lgaData.reduce((sum, lga) => sum + lga.performance.approvalRate, 0) / lgaData.length,
    avgRating: lgaData.reduce((sum, lga) => sum + lga.avgRating, 0) / lgaData.length
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LGAs Overview</h1>
          <p className="text-gray-600 mt-2">Manage and monitor all Local Government Areas in Lagos State</p>
        </div>

        {/* State Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total LGAs</p>
                <p className="text-2xl font-bold text-gray-900">{lgaData.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaBuilding className="w-6 h-6 text-green-600" />
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
                <FaUsers className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Population</p>
                <p className="text-2xl font-bold text-gray-900">{(totalStats.totalPopulation / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaStar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle & Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === 'overview'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedView('performance')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === 'performance'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setSelectedView('categories')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === 'categories'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Categories
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Search LGAs..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* LGA Cards/Table */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLGAs.map((lga) => (
              <div key={lga.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{lga.name}</h3>
                      <p className="text-sm text-gray-600">{lga.area} • {(lga.population / 1000).toFixed(0)}K residents</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(lga.status)}`}>
                      {lga.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{lga.listings}</p>
                      <p className="text-xs text-gray-600">Total Listings</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">{lga.approvedListings}</p>
                      <p className="text-xs text-gray-600">Approved</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-lg font-bold text-yellow-600">{lga.pendingListings}</p>
                      <p className="text-xs text-gray-600">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-lg font-bold text-red-600">{lga.flaggedListings}</p>
                      <p className="text-xs text-gray-600">Flagged</p>
                    </div>
                  </div>

                  {/* Performance Indicators */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-medium">{lga.avgRating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPerformanceIcon(lga.performance.approvalRate)}
                      <span className="text-sm">{lga.performance.approvalRate}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(lga.performance.trend)}
                      <span className="text-sm text-gray-600">{lga.performance.trend}</span>
                    </div>
                  </div>

                  {/* Coordinator Info */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{lga.coordinator}</p>
                    <p className="text-xs text-gray-600">{lga.contact}</p>
                    <p className="text-xs text-gray-600">{lga.email}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FaEye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <FaChartLine className="w-4 h-4" />
                      Analytics
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <FaEdit className="w-4 h-4" />
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedView === 'performance' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">LGA</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Approval Rate</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Response Time</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">User Rating</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Total Views</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Trend</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLGAs.map((lga) => (
                    <tr key={lga.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-gray-900">{lga.name}</h3>
                          <p className="text-sm text-gray-600">{lga.listings} listings</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getPerformanceIcon(lga.performance.approvalRate)}
                          <span className={`font-medium ${
                            lga.performance.approvalRate >= 90 ? 'text-green-600' :
                            lga.performance.approvalRate >= 80 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {lga.performance.approvalRate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{lga.performance.responseTime}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="font-medium">{lga.avgRating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{lga.totalViews.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getTrendIcon(lga.performance.trend)}
                          <span className="text-sm capitalize">{lga.performance.trend}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(lga.status)}`}>
                          {lga.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedView === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLGAs.map((lga) => (
              <div key={lga.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{lga.name}</h3>
                <div className="space-y-3">
                  {Object.entries(lga.categories).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm capitalize text-gray-700">{category.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(count / lga.listings) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredLGAs.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <FaMapMarkerAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No LGAs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminLGAs;
