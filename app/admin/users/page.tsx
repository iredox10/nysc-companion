'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { mockUser } from '@/data/mock';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const mockUsers = [
    {...mockUser, $id: '1', deployment: 'Lagos/Ikeja', role: 'Corper' },
    { $id: '2', name: 'Jane Smith', email: 'jane@example.com', deployment: 'Abia/Aba North', role: 'Corper' },
    { $id: '3', name: 'Admin User', email: 'admin@nysc.com', deployment: 'FCT/Abuja', role: 'Admin' },
]

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
            <p className="text-gray-600">View, edit, or delete users.</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <FaPlus className="mr-2" />
            Add User
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="border-b text-gray-600">
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold">Deployment</th>
                <th className="text-left p-4 font-semibold">Role</th>
                <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {mockUsers.map(user => (
                <tr key={user.$id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-black">{user.name}</td>
                    <td className="p-4 text-black">{user.email}</td>
                    <td className="p-4 text-black">{user.deployment}</td>
                    <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'Admin' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                            {user.role}
                        </span>
                    </td>
                    <td className="p-4 flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100">
                        <FaEdit size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-gray-100">
                        <FaTrash size={18} />
                    </button>
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

export default UsersPage;
