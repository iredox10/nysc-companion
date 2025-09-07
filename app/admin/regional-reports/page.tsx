'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaChartBar, FaDownload, FaFilter, FaCalendarAlt, FaEye, FaFileAlt, FaUsers, FaBook, FaMapMarkerAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockReports = [
  {
    id: 'report1',
    title: 'South West Region Quarterly Report',
    region: 'South West',
    period: 'Q1 2024',
    generatedDate: '2024-03-31',
    type: 'quarterly',
    status: 'completed',
    author: 'System Generated',
    metrics: {
      corpMembers: 15420,
      guides: 47,
      engagement: 89,
      satisfaction: 4.2
    }
  },
  {
    id: 'report2',
    title: 'North Central Monthly Analytics',
    region: 'North Central',
    period: 'February 2024',
    generatedDate: '2024-02-29',
    type: 'monthly',
    status: 'completed',
    author: 'Fatima Ahmed',
    metrics: {
      corpMembers: 12380,
      guides: 38,
      engagement: 82,
      satisfaction: 4.0
    }
  },
  {
    id: 'report3',
    title: 'Annual Performance Review - All Regions',
    region: 'All Regions',
    period: '2023',
    generatedDate: '2024-01-15',
    type: 'annual',
    status: 'completed',
    author: 'System Generated',
    metrics: {
      corpMembers: 65800,
      guides: 188,
      engagement: 86,
      satisfaction: 4.1
    }
  }
];

const mockMetrics = [
  { month: 'Jan', southWest: 14200, northCentral: 11800, southEast: 9200, northWest: 10500, southSouth: 8200, northEast: 7100 },
  { month: 'Feb', southWest: 14800, northCentral: 12200, southEast: 9600, northWest: 10800, southSouth: 8500, northEast: 7300 },
  { month: 'Mar', southWest: 15420, northCentral: 12380, southEast: 9850, northWest: 11200, southSouth: 8950, northEast: 7600 }
];

const mockEngagementData = [
  { name: 'South West', engagement: 89, guides: 47, satisfaction: 4.2 },
  { name: 'North Central', engagement: 82, guides: 38, satisfaction: 4.0 },
  { name: 'South South', engagement: 85, guides: 29, satisfaction: 4.1 },
  { name: 'South East', engagement: 78, guides: 31, satisfaction: 3.9 },
  { name: 'North West', engagement: 65, guides: 25, satisfaction: 3.5 },
  { name: 'North East', engagement: 72, guides: 18, satisfaction: 3.7 }
];

const mockDistributionData = [
  { name: 'South West', value: 15420, color: '#3B82F6' },
  { name: 'North Central', value: 12380, color: '#10B981' },
  { name: 'South East', value: 9850, color: '#F59E0B' },
  { name: 'North West', value: 11200, color: '#EF4444' },
  { name: 'South South', value: 8950, color: '#8B5CF6' },
  { name: 'North East', value: 7600, color: '#EC4899' }
];

const RegionalReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [reportType, setReportType] = useState('All');

  const filteredReports = mockReports.filter(report => {
    const matchesPeriod = selectedPeriod === 'All' || report.type === selectedPeriod;
    const matchesRegion = selectedRegion === 'All' || report.region === selectedRegion || report.region === 'All Regions';
    const matchesType = reportType === 'All' || report.type === reportType;
    return matchesPeriod && matchesRegion && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { bg: 'bg-green-100', text: 'text-green-700' },
      'processing': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'failed': { bg: 'bg-red-100', text: 'text-red-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const totalCorpMembers = mockDistributionData.reduce((sum, item) => sum + item.value, 0);
  const totalGuides = mockEngagementData.reduce((sum, item) => sum + item.guides, 0);
  const avgEngagement = Math.round(mockEngagementData.reduce((sum, item) => sum + item.engagement, 0) / mockEngagementData.length);
  const avgSatisfaction = (mockEngagementData.reduce((sum, item) => sum + item.satisfaction, 0) / mockEngagementData.length).toFixed(1);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Regional Reports</h1>
            <p className="text-gray-600">View comprehensive regional performance reports and analytics</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg font-medium">
              <FaFileAlt />
              Generate Report
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
              <FaDownload />
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Corps Members</p>
              <p className="text-3xl font-black text-gray-800">{totalCorpMembers.toLocaleString()}</p>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <FaArrowUp className="mr-1" />
                +5.2% from last month
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
              <p className="text-sm font-medium text-gray-500">Active Guides</p>
              <p className="text-3xl font-black text-gray-800">{totalGuides}</p>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <FaArrowUp className="mr-1" />
                +12 new this month
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaBook className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Engagement</p>
              <p className="text-3xl font-black text-gray-800">{avgEngagement}%</p>
              <div className="flex items-center text-red-600 text-sm mt-1">
                <FaArrowDown className="mr-1" />
                -2.1% from last month
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaChartBar className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Satisfaction</p>
              <p className="text-3xl font-black text-gray-800">{avgSatisfaction}/5</p>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <FaArrowUp className="mr-1" />
                +0.3 from last month
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaMapMarkerAlt className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Corps Members Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Corps Members by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="southWest" stroke="#3B82F6" name="South West" strokeWidth={2} />
              <Line type="monotone" dataKey="northCentral" stroke="#10B981" name="North Central" strokeWidth={2} />
              <Line type="monotone" dataKey="southEast" stroke="#F59E0B" name="South East" strokeWidth={2} />
              <Line type="monotone" dataKey="northWest" stroke="#EF4444" name="North West" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Regional Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Engagement by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#3B82F6" name="Engagement %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Satisfaction Scores */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Satisfaction Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Area type="monotone" dataKey="satisfaction" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Satisfaction Score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Periods</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Regions</option>
            <option value="South West">South West</option>
            <option value="North Central">North Central</option>
            <option value="South East">South East</option>
            <option value="North West">North West</option>
            <option value="South South">South South</option>
            <option value="North East">North East</option>
          </select>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Types</option>
            <option value="performance">Performance</option>
            <option value="engagement">Engagement</option>
            <option value="analytics">Analytics</option>
          </select>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <input
              type="date"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Generated Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">{report.title}</h4>
                    {getStatusBadge(report.status)}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Region</p>
                      <p className="font-medium text-gray-800">{report.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Period</p>
                      <p className="font-medium text-gray-800">{report.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Generated</p>
                      <p className="font-medium text-gray-800">{new Date(report.generatedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Author</p>
                      <p className="font-medium text-gray-800">{report.author}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium">Corps Members</p>
                      <p className="text-lg font-bold text-blue-800">{report.metrics.corpMembers.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-medium">Active Guides</p>
                      <p className="text-lg font-bold text-green-800">{report.metrics.guides}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 font-medium">Engagement</p>
                      <p className="text-lg font-bold text-purple-800">{report.metrics.engagement}%</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xs text-orange-600 font-medium">Satisfaction</p>
                      <p className="text-lg font-bold text-orange-800">{report.metrics.satisfaction}/5</p>
                    </div>
                  </div>
                </div>
                <div className="ml-6 flex items-center gap-2">
                  <button className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <FaEye />
                  </button>
                  <button className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaDownload />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-16">
          <FaChartBar className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No reports found</h3>
          <p className="text-gray-500">Try adjusting your filter criteria or generate a new report</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default RegionalReportsPage;
