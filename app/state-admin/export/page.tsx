'use client';

import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { useState } from 'react';
import { FaDownload, FaFileExcel, FaFilePdf, FaFileCsv, FaCalendar, FaFilter, FaChartBar, FaMapMarkerAlt, FaUsers, FaBuilding } from 'react-icons/fa';

const StateAdminExport = () => {
  const [selectedDataType, setSelectedDataType] = useState('listings');
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days');
  const [selectedLGA, setSelectedLGA] = useState('all');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    { value: 'listings', label: 'All Listings', icon: FaBuilding, description: 'Export all listings data including status, ratings, and metadata' },
    { value: 'corps-members', label: 'Corps Members', icon: FaUsers, description: 'Export corps members data including deployment and contact info' },
    { value: 'users', label: 'All Users', icon: FaUsers, description: 'Export user profiles, activity, and engagement data' },
    { value: 'analytics', label: 'Analytics Data', icon: FaChartBar, description: 'Export performance metrics and usage statistics' },
    { value: 'lga-performance', label: 'LGA Performance', icon: FaMapMarkerAlt, description: 'Export LGA-wise performance and activity data' },
  ];

  const formats = [
    { value: 'excel', label: 'Excel (.xlsx)', icon: FaFileExcel, description: 'Spreadsheet format with multiple sheets' },
    { value: 'csv', label: 'CSV (.csv)', icon: FaFileCsv, description: 'Comma-separated values for data analysis' },
    { value: 'pdf', label: 'PDF Report (.pdf)', icon: FaFilePdf, description: 'Formatted report with charts and summaries' },
  ];

  const dateRanges = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'this-year', label: 'This Year' },
    { value: 'all-time', label: 'All Time' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const lgas = ['all', 'Lagos Island', 'Ikeja', 'Victoria Island', 'Surulere', 'Yaba', 'Alimosho'];

  // Mock export history
  const exportHistory = [
    {
      id: 'EXP001',
      type: 'listings',
      format: 'excel',
      dateRange: 'last-30-days',
      lga: 'all',
      generatedDate: '2025-09-07T10:30:00',
      fileSize: '2.4 MB',
      downloadCount: 5,
      status: 'completed'
    },
    {
      id: 'EXP002',
      type: 'corps-members',
      format: 'pdf',
      dateRange: 'this-month',
      lga: 'Lagos Island',
      generatedDate: '2025-09-06T14:15:00',
      fileSize: '1.8 MB',
      downloadCount: 3,
      status: 'completed'
    },
    {
      id: 'EXP003',
      type: 'analytics',
      format: 'csv',
      dateRange: 'last-90-days',
      lga: 'all',
      generatedDate: '2025-09-05T09:45:00',
      fileSize: '956 KB',
      downloadCount: 8,
      status: 'completed'
    }
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'excel': return FaFileExcel;
      case 'csv': return FaFileCsv;
      case 'pdf': return FaFilePdf;
      default: return FaDownload;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'excel': return 'text-green-600';
      case 'csv': return 'text-blue-600';
      case 'pdf': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      alert(`Exporting ${selectedDataType} data as ${selectedFormat} for ${selectedDateRange}${selectedLGA !== 'all' ? ` in ${selectedLGA}` : ''}`);
      setIsExporting(false);
    }, 2000);
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

  return (
    <StateAdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Data Export</h1>
          <p className="text-gray-600 mt-2">Export data and generate reports for Lagos State</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Configuration */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Configure Export</h2>
              
              {/* Data Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Data Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dataTypes.map(type => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setSelectedDataType(type.value)}
                        className={`p-4 text-left border rounded-lg transition-colors ${
                          selectedDataType === type.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className={`w-5 h-5 ${
                            selectedDataType === type.value ? 'text-green-600' : 'text-gray-500'
                          }`} />
                          <span className="font-medium text-gray-900">{type.label}</span>
                        </div>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {formats.map(format => {
                    const IconComponent = format.icon;
                    return (
                      <button
                        key={format.value}
                        onClick={() => setSelectedFormat(format.value)}
                        className={`p-4 text-left border rounded-lg transition-colors ${
                          selectedFormat === format.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className={`w-5 h-5 ${getFormatColor(format.value)}`} />
                          <span className="font-medium text-gray-900">{format.label}</span>
                        </div>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                  >
                    {dateRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LGA Filter</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

              {/* Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Export Options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeDetails}
                      onChange={(e) => setIncludeDetails(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include detailed information and metadata</span>
                  </label>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaDownload className="w-5 h-5" />
                {isExporting ? 'Generating Export...' : 'Generate Export'}
              </button>
            </div>
          </div>

          {/* Quick Actions & Export History */}
          <div className="space-y-6">
            {/* Quick Export Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Exports</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <FaBuilding className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Monthly Listings Report</p>
                    <p className="text-sm text-gray-600">Last 30 days, all LGAs</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <FaUsers className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Corps Members List</p>
                    <p className="text-sm text-gray-600">Current batch, all LGAs</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <FaChartBar className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Analytics Summary</p>
                    <p className="text-sm text-gray-600">This quarter, all metrics</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Exports */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Exports</h3>
              <div className="space-y-3">
                {exportHistory.map(export_ => {
                  const FormatIcon = getFormatIcon(export_.format);
                  return (
                    <div key={export_.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <FormatIcon className={`w-5 h-5 ${getFormatColor(export_.format)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {export_.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-xs text-gray-600">
                          {getTimeAgo(export_.generatedDate)} • {export_.fileSize} • {export_.downloadCount} downloads
                        </p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <FaDownload className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Export Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Export Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Exports</span>
                  <span className="font-medium text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Downloads</span>
                  <span className="font-medium text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most Popular</span>
                  <span className="font-medium text-gray-900">Listings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminExport;
