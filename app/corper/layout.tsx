'use client';

import { useState } from 'react';
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaList, FaPlusCircle, FaBookOpen, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaBell, FaCog, FaBars, FaTimes, FaHome, FaUtensils, FaBuilding, FaMedkit, FaShoppingBag, FaFilm, FaBus } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CorperLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/corper') {
      return pathname === '/corper';
    }
    return pathname.startsWith(href);
  };

  const navigationItems = [
    { href: '/corper', icon: FaTachometerAlt, label: 'Dashboard', color: 'text-blue-600' },
    { href: '/corper/listings', icon: FaList, label: 'Browse Listings', color: 'text-green-600' },
    { href: '/guides', icon: FaBookOpen, label: 'NYSC Guides', color: 'text-purple-600' },
    { href: '/corper/community', icon: FaUsers, label: 'Community', color: 'text-orange-600' },
    { href: '/corper/events', icon: FaCalendarAlt, label: 'Events & CDS', color: 'text-pink-600' },
  ];

  const quickAccessItems = [
    { href: '/corper/category/accommodation', icon: FaHome, label: 'Accommodation', color: 'bg-blue-500' },
    { href: '/corper/category/food', icon: FaUtensils, label: 'Food & Dining', color: 'bg-red-500' },
    { href: '/corper/category/transportation', icon: FaBus, label: 'Transportation', color: 'bg-yellow-500' },
    { href: '/corper/category/healthcare', icon: FaMedkit, label: 'Healthcare', color: 'bg-green-500' },
  ];

  const profileItems = [
    { href: '/corper/profile', icon: FaUser, label: 'My Profile' },
    { href: '/corper/notifications', icon: FaBell, label: 'Notifications' },
    { href: '/corper/settings', icon: FaCog, label: 'Settings' },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/corper" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-800">NYSC</h1>
            <p className="text-sm text-gray-500 -mt-1">Companion</p>
          </div>
        </Link>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">JD</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-500">Batch C 2024</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-green-500" />
            <span>Ilorin, Kwara State</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="text-blue-500" />
            <span>6 months remaining</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-4">
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Main Menu</h4>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActiveLink(item.href)
                    ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`text-lg ${isActiveLink(item.href) ? 'text-green-600' : item.color}`} />
                <span>{item.label}</span>
                {item.href === '/corper/notifications' && (
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Quick Access</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickAccessItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center"
              >
                <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                  <item.icon className="text-white text-sm" />
                </div>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Emergency Contacts</h4>
          <div className="space-y-2">
            <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl bg-red-50 hover:bg-red-100 transition-colors">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <FaPhoneAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">Emergency</p>
                <p className="text-xs text-red-600">199, 911</p>
              </div>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaBuilding className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">NYSC Office</p>
                <p className="text-xs text-blue-600">+234 xxx xxxx</p>
              </div>
            </button>
          </div>
        </div>

        {/* Add New Listing CTA */}
        <div className="mb-6">
          <Link
            href="/corper/listings/new"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            <FaPlusCircle />
            <span>Add New Listing</span>
          </Link>
        </div>
      </nav>

      {/* Profile & Settings */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="space-y-1 mb-4">
          {profileItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <item.icon className="text-lg" />
              <span className="text-sm">{item.label}</span>
              {item.href === '/corper/notifications' && (
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
        
        <button className="flex items-center gap-3 w-full px-3 py-2 text-left rounded-xl text-red-600 hover:bg-red-50 transition-colors">
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="w-80 bg-white shadow-lg hidden lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm lg:hidden sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars className="text-gray-600" />
              </button>
              <Link href="/corper" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="font-bold text-gray-800">NYSC Companion</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/corper/notifications" className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <FaBell className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <Link href="/corper/profile" className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CorperLayout;
