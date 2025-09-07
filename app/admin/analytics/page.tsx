'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaUsers, FaEye, FaDownload, FaCalendarAlt, FaChartLine, FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AnalyticsPage = () => {
  const [timeFilter, setTimeFilter] = useState('7d');

  // Mock analytics data
  const visitorData = [
    { name: 'Mon', visitors: 1200, pageViews: 3400 },
    { name: 'Tue', visitors: 1900, pageViews: 4800 },
    { name: 'Wed', visitors: 2800, pageViews: 6200 },
    { name: 'Thu', visitors: 2200, pageViews: 5100 },
    { name: 'Fri', visitors: 3400, pageViews: 7800 },
    { name: 'Sat', visitors: 2100, pageViews: 4900 },
    { name: 'Sun', visitors: 1800, pageViews: 4200 },
  ];

  const categoryData = [
    { name: 'Accommodation', value: 35, color: '#3B82F6' },
    { name: 'Food & Dining', value: 25, color: '#10B981' },
    { name: 'Transportation', value: 20, color: '#F59E0B' },
    { name: 'Healthcare', value: 12, color: '#EF4444' },
    { name: 'Others', value: 8, color: '#8B5CF6' },
  ];

  const stateData = [
    { state: 'Lagos', users: 450, listings: 89 },
    { state: 'Abuja', users: 320, listings: 67 },
    { state: 'Kwara', users: 280, listings: 45 },
    { state: 'Ogun', users: 210, listings: 34 },
    { state: 'Oyo', users: 190, listings: 28 },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive platform insights and performance metrics</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition">
              <FaDownload />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-black text-gray-800">2,341</p>
              <div className="flex items-center gap-1 mt-2">
                <FaArrowUp className="text-green-500 text-sm" />
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Page Views</p>
              <p className="text-3xl font-black text-gray-800">45.2K</p>
              <div className="flex items-center gap-1 mt-2">
                <FaArrowUp className="text-green-500 text-sm" />
                <span className="text-sm text-green-600 font-medium">+8.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Bounce Rate</p>
              <p className="text-3xl font-black text-gray-800">24.3%</p>
              <div className="flex items-center gap-1 mt-2">
                <FaArrowDown className="text-red-500 text-sm" />
                <span className="text-sm text-red-600 font-medium">-2.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-red-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Session</p>
              <p className="text-3xl font-black text-gray-800">4m 32s</p>
              <div className="flex items-center gap-1 mt-2">
                <FaArrowUp className="text-green-500 text-sm" />
                <span className="text-sm text-green-600 font-medium">+5.7%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Visitor Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Visitor Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area type="monotone" dataKey="visitors" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              <Area type="monotone" dataKey="pageViews" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* State Performance */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">State Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="state" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="listings" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
