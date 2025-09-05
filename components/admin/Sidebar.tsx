'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaUsers, FaList, FaBuilding, FaMapMarkedAlt } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { href: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { href: '/admin/listings', icon: <FaList />, label: 'Listings' },
    { href: '/admin/categories', icon: <FaBuilding />, label: 'Categories' },
    { href: '/admin/locations', icon: <FaMapMarkedAlt />, label: 'Locations' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">Admin</div>
      <nav className="flex-1 px-4">
        <ul>
          {navItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} className={`flex items-center px-4 py-2 my-1 rounded-lg ${pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
