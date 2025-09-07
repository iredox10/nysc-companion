'use client';

import { useState, useEffect } from 'react';
import StateAdminLayout from '@/components/state-admin/StateAdminLayout';
import { mockStates, mockLgas, mockListings, mockCategories } from '@/data/mock';
import { FaMapMarkerAlt, FaBuilding, FaUsers, FaCheck, FaClock, FaTimes, FaExclamationTriangle, FaPlus, FaEdit, FaEye, FaSearch, FaDownload, FaChartBar, FaStar, FaGlobe, FaCalendar } from 'react-icons/fa';

// Mock current state admin data (in a real app, this would come from auth/session)
const CURRENT_STATE_ADMIN = {
  id: 'state_admin_1',
  name: 'Adebayo Johnson',
  role: 'state_admin',
  assignedStateId: 'NG-LA', // Lagos State
  email: 'adebayo.johnson@lagosstate.gov.ng',
  phone: '+234 803 123 4567',
  assignedDate: '2024-01-15'
};

const StateAdminDashboard = () => {
  const [assignedState, setAssignedState] = useState<any>(null);
  const [stateLgas, setStateLgas] = useState<any[]>([]);
  const [stateListings, setStateListings] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Get assigned state
    const state = mockStates.find(s => s.$id === CURRENT_STATE_ADMIN.assignedStateId);
    if (state) {
      setAssignedState(state);
      
      // Get LGAs in this state
      const lgasInState = mockLgas.filter(lga => lga.stateId === state.$id);
      setStateLgas(lgasInState);
      
      // Get all listings in this state
      const listingsInState = mockListings.filter(listing => 
        lgasInState.some(lga => lga.$id === listing.lgaId)
      );
      setStateListings(listingsInState);

      // Generate recent activity (mock)
      const activity = [
        { id: 1, type: 'approval', message: 'Approved "Mama Put Restaurant" in Ikeja', time: '2 hours ago', icon: FaCheck, color: 'text-green-600' },
        { id: 2, type: 'submission', message: 'New listing submitted in Victoria Island', time: '4 hours ago', icon: FaPlus, color: 'text-blue-600' },
        { id: 3, type: 'flag', message: 'Flagged "XYZ Store" for review', time: '6 hours ago', icon: FaExclamationTriangle, color: 'text-orange-600' },
        { id: 4, type: 'rejection', message: 'Rejected listing due to incomplete info', time: '1 day ago', icon: FaTimes, color: 'text-red-600' },
        { id: 5, type: 'approval', message: 'Approved "Tech Hub Lagos" in Yaba', time: '2 days ago', icon: FaCheck, color: 'text-green-600' },
      ];
      setRecentActivity(activity);
    }
  }, []);

  // Get comprehensive stats
  const getStats = () => {
    const totalListings = stateListings.length;
    const approvedCount = stateListings.filter(l => l.status === 'approved').length;
    const pendingCount = stateListings.filter(l => l.status === 'pending').length;
    const rejectedCount = stateListings.filter(l => l.status === 'rejected').length;
    const flaggedCount = stateListings.filter(l => l.status === 'flagged').length;
    
    // Calculate this week's new submissions
    const thisWeek = stateListings.filter(l => {
      if (!l.submittedDate) return false;
      const submittedDate = new Date(l.submittedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submittedDate >= weekAgo;
    }).length;

    // Calculate approval rate
    const processedListings = approvedCount + rejectedCount;
    const approvalRate = processedListings > 0 ? Math.round((approvedCount / processedListings) * 100) : 0;

    return {
      total: totalListings,
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount,
      flagged: flaggedCount,
      thisWeek,
      approvalRate,
      averageRating: totalListings > 0 ? (stateListings.reduce((sum, l) => sum + (l.rating || 0), 0) / stateListings.filter(l => l.rating).length).toFixed(1) : '0.0'
    };
  };

  const getCategoryBreakdown = () => {
    const breakdown = mockCategories.map(category => {
      const count = stateListings.filter(listing => listing.categoryId === category.$id).length;
      return {
        ...category,
        count,
        percentage: stateListings.length > 0 ? Math.round((count / stateListings.length) * 100) : 0
      };
    }).sort((a, b) => b.count - a.count);
    
    return breakdown;
  };

  const getLgaPerformance = () => {
    return stateLgas.map(lga => {
      const lgaListings = stateListings.filter(listing => listing.lgaId === lga.$id);
      const approved = lgaListings.filter(l => l.status === 'approved').length;
      const pending = lgaListings.filter(l => l.status === 'pending').length;
      
      return {
        ...lga,
        totalListings: lgaListings.length,
        approved,
        pending,
        approvalRate: lgaListings.length > 0 ? Math.round((approved / lgaListings.length) * 100) : 0
      };
    }).sort((a, b) => b.totalListings - a.totalListings);
  };

  if (!assignedState) {
    return (
      <StateAdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">No State Assigned</h1>
            <p className="text-gray-600 mb-8">You don't have access to any state. Please contact the super admin.</p>
          </div>
        </div>
      </StateAdminLayout>
    );
  }

  const stats = getStats();
  const categoryBreakdown = getCategoryBreakdown();
  const lgaPerformance = getLgaPerformance();

  return (
    <StateAdminLayout>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl mb-8">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <FaMapMarkerAlt className="text-4xl" />
              </div>
              <div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium inline-block mb-3">
                  State Administrator Dashboard
                </div>
                <h1 className="text-4xl font-black mb-2">
                  Welcome back, {CURRENT_STATE_ADMIN.name}!
                </h1>
                <p className="text-xl opacity-90">
                  Managing {assignedState.name} {assignedState.name === 'FCT' ? '' : 'State'} • {stateLgas.length} LGAs • {stats.total} Listings
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-black mb-1">{stats.pending}</div>
              <div className="text-sm opacity-80">Pending Your Review</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
              <FaCalendar className="text-white/80" />
              <div>
                <div className="font-semibold">Today's Activity</div>
                <div className="text-sm opacity-80">{stats.thisWeek} new this week</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
              <FaStar className="text-white/80" />
              <div>
                <div className="font-semibold">Average Rating</div>
                <div className="text-sm opacity-80">{stats.averageRating} stars</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
              <FaCheck className="text-white/80" />
              <div>
                <div className="font-semibold">Approval Rate</div>
                <div className="text-sm opacity-80">{stats.approvalRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-3xl font-black text-gray-800">{stats.total}</p>
              <p className="text-sm text-blue-600 mt-1">Across {stateLgas.length} LGAs</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-yellow-600 mt-1">Requires action</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-3xl font-black text-green-600">{stats.approved}</p>
              <p className="text-sm text-green-600 mt-1">{stats.approvalRate}% approval rate</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCheck className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Needs Attention</p>
              <p className="text-3xl font-black text-orange-600">{stats.flagged + stats.rejected}</p>
              <p className="text-sm text-orange-600 mt-1">Flagged & Rejected</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center ${activity.color}`}>
                    <Icon className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.message}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Category Breakdown</h2>
          <div className="space-y-4">
            {categoryBreakdown.slice(0, 6).map((category) => (
              <div key={category.$id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                  <span className="text-gray-700 text-sm font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-800 font-bold">{category.count}</div>
                  <div className="text-gray-500 text-xs">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LGA Performance */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">LGA Performance Overview</h2>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
              Export Report
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium text-sm">
              View Details
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lgaPerformance.slice(0, 6).map((lga) => (
            <div key={lga.$id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{lga.name}</h3>
                <FaGlobe className="text-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center bg-blue-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-blue-600">{lga.totalListings}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-green-600">{lga.approved}</div>
                  <div className="text-xs text-gray-500">Approved</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Approval Rate</span>
                <span className="font-medium text-gray-800">{lga.approvalRate}%</span>
              </div>
              
              {lga.pending > 0 && (
                <div className="mt-2">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    {lga.pending} pending
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </StateAdminLayout>
  );
};

export default StateAdminDashboard;
