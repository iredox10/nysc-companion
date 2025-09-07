'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { FaUsers, FaList, FaStar, FaClock, FaEye, FaArrowUp, FaArrowDown, FaMapMarkerAlt, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaBell, FaUserPlus, FaComments, FaHeart } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const userGrowthData = [
  { name: 'Jan', users: 400, newUsers: 240 },
  { name: 'Feb', users: 450, newUsers: 280 },
  { name: 'Mar', users: 520, newUsers: 320 },
  { name: 'Apr', users: 480, newUsers: 290 },
  { name: 'May', users: 590, newUsers: 350 },
  { name: 'Jun', users: 640, newUsers: 380 },
  { name: 'Jul', users: 720, newUsers: 420 },
];

const listingsByCategoryData = [
  { name: 'Accommodation', count: 285, color: '#3B82F6' },
  { name: 'Food & Restaurants', count: 198, color: '#EF4444' },
  { name: 'Transportation', count: 145, color: '#F59E0B' },
  { name: 'Healthcare', count: 89, color: '#10B981' },
  { name: 'Shopping', count: 67, color: '#8B5CF6' },
  { name: 'Entertainment', count: 43, color: '#EC4899' },
];

const stateData = [
  { name: 'Lagos', users: 156, listings: 89 },
  { name: 'Abuja', users: 142, listings: 76 },
  { name: 'Kano', users: 98, listings: 54 },
  { name: 'Ogun', users: 87, listings: 45 },
  { name: 'Rivers', users: 76, listings: 38 },
];

const recentActivity = [
  { id: 1, type: 'user', action: 'New user registration', user: 'John Doe', time: '2 minutes ago', status: 'success' },
  { id: 2, type: 'listing', action: 'New listing submitted', user: 'Jane Smith', time: '15 minutes ago', status: 'pending' },
  { id: 3, type: 'review', action: 'Review posted', user: 'Peter Jones', time: '1 hour ago', status: 'success' },
  { id: 4, type: 'report', action: 'Content reported', user: 'Mary Johnson', time: '2 hours ago', status: 'warning' },
  { id: 5, type: 'user', action: 'Profile updated', user: 'David Wilson', time: '3 hours ago', status: 'success' },
];

const pendingApprovals = [
  { id: 1, title: 'Green Valley Lodge', category: 'Accommodation', submitter: 'John Doe', date: '2025-09-05' },
  { id: 2, title: 'Mama\'s Kitchen', category: 'Food & Restaurants', submitter: 'Jane Smith', date: '2025-09-05' },
  { id: 3, title: 'City Shuttle Service', category: 'Transportation', submitter: 'Peter Jones', date: '2025-09-04' },
];

const DashboardPage = () => {
  const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with NYSC Companion today.</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-700">Just now</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={<FaUsers className="text-blue-500" />} 
          title="Total Users" 
          value="2,847" 
          change="+12.5%" 
          trend="up"
          subtext="Active this month"
        />
        <MetricCard 
          icon={<FaList className="text-green-500" />} 
          title="Total Listings" 
          value="827" 
          change="+8.2%" 
          trend="up"
          subtext="Approved listings"
        />
        <MetricCard 
          icon={<FaEye className="text-purple-500" />} 
          title="Page Views" 
          value="15.2K" 
          change="+15.3%" 
          trend="up"
          subtext="This week"
        />
        <MetricCard 
          icon={<FaClock className="text-orange-500" />} 
          title="Pending Reviews" 
          value="23" 
          change="-5.1%" 
          trend="down"
          subtext="Awaiting approval"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <ChartCard title="User Growth Trends" subtitle="Monthly active users and new registrations">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
              <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
              <Area type="monotone" dataKey="newUsers" stroke="#10B981" fillOpacity={1} fill="url(#colorNewUsers)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category Distribution */}
        <ChartCard title="Listings by Category" subtitle="Distribution of approved listings">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={listingsByCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {listingsByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* State Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Top Performing States" subtitle="Users and listings by deployment state">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
              <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="listings" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              <p className="text-gray-500 text-sm">Real-time platform activity</p>
            </div>
            <FaBell className="text-gray-400" />
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  {activity.type === 'user' && <FaUserPlus className={`${
                    activity.status === 'success' ? 'text-green-600' :
                    activity.status === 'warning' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />}
                  {activity.type === 'listing' && <FaList className={`${
                    activity.status === 'pending' ? 'text-orange-600' : 'text-green-600'
                  }`} />}
                  {activity.type === 'review' && <FaComments className="text-blue-600" />}
                  {activity.type === 'report' && <FaExclamationTriangle className="text-orange-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
            <p className="text-gray-500 text-sm">Listings awaiting review</p>
          </div>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
            {pendingApprovals.length} pending
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left p-3 font-semibold">Listing Title</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-left p-3 font-semibold">Submitted By</th>
                <th className="text-left p-3 font-semibold">Date</th>
                <th className="text-left p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-800">{item.title}</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{item.submitter}</td>
                  <td className="p-3 text-gray-500">{item.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                        Approve
                      </button>
                      <button className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

const MetricCard = ({ 
  icon, 
  title, 
  value, 
  change, 
  trend, 
  subtext 
}: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  change: string, 
  trend: 'up' | 'down', 
  subtext: string 
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="text-3xl">{icon}</div>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
        {change}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-black text-gray-800 mb-1">{value}</p>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default DashboardPage;
