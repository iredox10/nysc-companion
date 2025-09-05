'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { FaUsers, FaList, FaStar, FaClock } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const userGrowthData = [
    { name: 'Mon', users: 12 },
    { name: 'Tue', users: 19 },
    { name: 'Wed', users: 3 },
    { name: 'Thu', users: 5 },
    { name: 'Fri', users: 2 },
    { name: 'Sat', users: 3 },
    { name: 'Sun', users: 10 },
];

const listingsByCategoryData = [
    { name: 'Accommodation', count: 250 },
    { name: 'NYSC Offices', count: 50 },
    { name: 'Restaurants', count: 150 },
    { name: 'Markets', count: 117 },
];

const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2025-09-05' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2025-09-05' },
    { id: 3, name: 'Peter Jones', email: 'peter@example.com', date: '2025-09-04' },
];

const DashboardPage = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your application's activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FaUsers className="text-blue-500" />} title="Total Users" value="1,234" />
        <StatCard icon={<FaList className="text-green-500" />} title="Total Listings" value="567" />
        <StatCard icon={<FaStar className="text-yellow-500" />} title="New Reviews" value="89" />
        <StatCard icon={<FaClock className="text-red-500" />} title="Pending Approvals" value="12" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="User Growth (Last 7 Days)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Listings by Category">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={listingsByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Email</th>
                <th className="text-left p-3 font-semibold">Sign-up Date</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
    </div>
)


export default DashboardPage;
