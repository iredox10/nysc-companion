'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { FaChartLine, FaUsers, FaMapMarkerAlt, FaArrowUp, FaBuilding, FaUserGraduate, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const StateAdminAnalytics = () => {
  // Mock data for Lagos State
  const analyticsData = {
    overview: {
      totalListings: 1567,
      activeUsers: 2834,
      corpsMembers: 847,
      lgas: 20,
      approvalRate: 87.3,
      averageResponseTime: '2.4 hours'
    },
    monthlyTrends: [
      { month: 'Jan', listings: 120, users: 45, approvals: 105 },
      { month: 'Feb', listings: 145, users: 67, approvals: 128 },
      { month: 'Mar', listings: 189, users: 89, approvals: 164 },
      { month: 'Apr', listings: 234, users: 112, approvals: 201 },
      { month: 'May', listings: 198, users: 98, approvals: 175 },
      { month: 'Jun', listings: 267, users: 134, approvals: 232 },
    ],
    lgaPerformance: [
      { name: 'Lagos Island', listings: 234, approval: 92, population: 45000 },
      { name: 'Ikeja', listings: 189, approval: 88, population: 38000 },
      { name: 'Victoria Island', listings: 156, approval: 95, population: 32000 },
      { name: 'Surulere', listings: 143, approval: 85, population: 42000 },
      { name: 'Yaba', listings: 128, approval: 90, population: 28000 },
    ],
    categoryBreakdown: [
      { category: 'Accommodation', count: 445, percentage: 28.4 },
      { category: 'Transportation', count: 378, percentage: 24.1 },
      { category: 'Food & Dining', count: 298, percentage: 19.0 },
      { category: 'Healthcare', count: 187, percentage: 11.9 },
      { category: 'Education', count: 156, percentage: 10.0 },
      { category: 'Entertainment', count: 103, percentage: 6.6 },
    ]
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights for Lagos State</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FaBuilding}
            title="Total Listings"
            value={analyticsData.overview.totalListings.toLocaleString()}
            change={12.5}
            color="bg-blue-500"
          />
          <StatCard
            icon={FaUsers}
            title="Active Users"
            value={analyticsData.overview.activeUsers.toLocaleString()}
            change={8.3}
            color="bg-green-500"
          />
          <StatCard
            icon={FaUserGraduate}
            title="Corps Members"
            value={analyticsData.overview.corpsMembers.toLocaleString()}
            change={5.7}
            color="bg-purple-500"
          />
          <StatCard
            icon={FaMapMarkerAlt}
            title="LGAs Covered"
            value={analyticsData.overview.lgas}
            change={0}
            color="bg-orange-500"
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Approval Rate</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={`${analyticsData.overview.approvalRate}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">{analyticsData.overview.approvalRate}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current approval rate</p>
                <p className="text-2xl font-bold text-green-600">{analyticsData.overview.approvalRate}%</p>
                <p className="text-sm text-gray-500">Above state average (82%)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Response Time</h3>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <FaArrowUp className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average response time</p>
                <p className="text-2xl font-bold text-blue-600">{analyticsData.overview.averageResponseTime}</p>
                <p className="text-sm text-green-600">↓ 15% faster than last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Trends</h3>
            <div className="space-y-4">
              {analyticsData.monthlyTrends.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex gap-2">
                      <div 
                        className="bg-blue-500 h-6 rounded flex items-center justify-center text-white text-xs"
                        style={{ width: `${(month.listings / 300) * 100}%` }}
                      >
                        {month.listings}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Listings</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Category Distribution</h3>
            <div className="space-y-4">
              {analyticsData.categoryBreakdown.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${category.percentage * 3}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{category.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LGA Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performing LGAs</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">LGA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Listings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Approval Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Population</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.lgaPerformance.map((lga, index) => (
                  <tr key={lga.name} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0 ? 'bg-gold-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{lga.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{lga.listings}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lga.approval >= 90 ? 'bg-green-100 text-green-800' : 
                        lga.approval >= 85 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {lga.approval}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{lga.population.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {lga.approval >= 90 ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : lga.approval >= 85 ? (
                          <FaArrowUp className="text-yellow-500" />
                        ) : (
                          <FaExclamationTriangle className="text-red-500" />
                        )}
                        <span className="text-sm text-gray-600">
                          {lga.approval >= 90 ? 'Excellent' : lga.approval >= 85 ? 'Good' : 'Needs Attention'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminAnalytics;
