'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaFileAlt, FaDownload, FaEye, FaChartBar, FaCalendar, FaMapMarkerAlt, FaUsers, FaBuilding, FaClock, FaFilter, FaSearch } from 'react-icons/fa';

const StateAdminReports = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock reports data for Lagos State
  const reports = [
    {
      id: 'RPT001',
      title: 'Monthly Listings Analytics Report',
      description: 'Comprehensive analysis of all listings activity for September 2025',
      category: 'listings',
      period: 'monthly',
      dateGenerated: '2025-09-07T10:00:00',
      generatedBy: 'System Auto-Generation',
      format: 'PDF',
      size: '2.4 MB',
      downloads: 45,
      status: 'ready',
      data: {
        totalListings: 1567,
        newListings: 89,
        approvedListings: 156,
        rejectedListings: 12
      }
    },
    {
      id: 'RPT002',
      title: 'LGA Performance Analysis',
      description: 'Performance metrics for all 20 LGAs in Lagos State',
      category: 'lga-performance',
      period: 'quarterly',
      dateGenerated: '2025-09-01T09:00:00',
      generatedBy: 'Adebayo Johnson',
      format: 'Excel',
      size: '1.8 MB',
      downloads: 23,
      status: 'ready',
      data: {
        topPerformingLGA: 'Victoria Island',
        averageApprovalRate: 87.3,
        totalLGAs: 20
      }
    },
    {
      id: 'RPT003',
      title: 'Corps Members Deployment Report',
      description: 'Detailed report on corps members deployment across Lagos State',
      category: 'corps-members',
      period: 'batch',
      dateGenerated: '2025-08-15T14:30:00',
      generatedBy: 'Funmi Adebayo',
      format: 'PDF',
      size: '3.2 MB',
      downloads: 67,
      status: 'ready',
      data: {
        totalCorpsMembers: 847,
        activeMembers: 823,
        completingMembers: 24
      }
    },
    {
      id: 'RPT004',
      title: 'User Engagement Statistics',
      description: 'User activity and engagement metrics for Q3 2025',
      category: 'users',
      period: 'quarterly',
      dateGenerated: '2025-09-05T16:20:00',
      generatedBy: 'System Auto-Generation',
      format: 'PDF',
      size: '1.9 MB',
      downloads: 34,
      status: 'ready',
      data: {
        totalUsers: 2834,
        activeUsers: 2156,
        newRegistrations: 234
      }
    },
    {
      id: 'RPT005',
      title: 'Revenue and Financial Summary',
      description: 'Financial overview of listing fees and revenue generation',
      category: 'financial',
      period: 'monthly',
      dateGenerated: '2025-09-06T11:45:00',
      generatedBy: 'Kemi Okafor',
      format: 'Excel',
      size: '956 KB',
      downloads: 18,
      status: 'ready',
      data: {
        totalRevenue: '₦2,450,000',
        listingFees: '₦1,890,000',
        premiumUpgrades: '₦560,000'
      }
    },
    {
      id: 'RPT006',
      title: 'Security and Flagged Content Report',
      description: 'Analysis of flagged listings and security incidents',
      category: 'security',
      period: 'weekly',
      dateGenerated: '2025-09-07T08:00:00',
      generatedBy: 'System Auto-Generation',
      format: 'PDF',
      size: '1.2 MB',
      downloads: 8,
      status: 'generating',
      data: {
        flaggedListings: 23,
        resolvedIncidents: 18,
        pendingReviews: 5
      }
    }
  ];

  const categories = [
    'all', 'listings', 'lga-performance', 'corps-members', 'users', 'financial', 'security'
  ];

  const periods = [
    'daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'batch'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'listings': return FaBuilding;
      case 'lga-performance': return FaMapMarkerAlt;
      case 'corps-members': return FaUsers;
      case 'users': return FaUsers;
      case 'financial': return FaChartBar;
      case 'security': return FaFileAlt;
      default: return FaFileAlt;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'listings': return 'bg-blue-100 text-blue-800';
      case 'lga-performance': return 'bg-green-100 text-green-800';
      case 'corps-members': return 'bg-purple-100 text-purple-800';
      case 'users': return 'bg-orange-100 text-orange-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
  };

  const filteredReports = reports.filter(report => {
    return (
      (searchTerm === '' || report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       report.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || report.category === selectedCategory) &&
      (selectedPeriod === 'all' || report.period === selectedPeriod)
    );
  });

  const generateNewReport = () => {
    // Handle new report generation
    console.log('Generating new report...');
  };

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-2">Generate and download comprehensive reports for Lagos State</p>
            </div>
            <button 
              onClick={generateNewReport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaFileAlt className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaFileAlt className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaDownload className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.reduce((sum, report) => sum + report.downloads, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Generating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'generating').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaChartBar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
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
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            {/* Period Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="all">All Periods</option>
              {periods.map(period => (
                <option key={period} value={period}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report) => {
            const CategoryIcon = getCategoryIcon(report.category);
            return (
              <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <CategoryIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadge(report.category)}`}>
                      {report.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {report.period.charAt(0).toUpperCase() + report.period.slice(1)}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {report.format}
                    </span>
                  </div>

                  {/* Key Data */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(report.data).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-lg font-bold text-gray-900">{value}</p>
                          <p className="text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-3 h-3" />
                        {getTimeAgo(report.dateGenerated)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaDownload className="w-3 h-3" />
                        {report.downloads} downloads
                      </span>
                    </div>
                    <span>{report.size}</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Generated by: {report.generatedBy}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button 
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      disabled={report.status === 'generating'}
                    >
                      <FaEye className="w-4 h-4" />
                      View
                    </button>
                    <button 
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      disabled={report.status === 'generating'}
                    >
                      <FaDownload className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <FaChartBar className="w-4 h-4" />
                      Analytics
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <FaFileAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or generate a new report.</p>
          </div>
        )}
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminReports;
