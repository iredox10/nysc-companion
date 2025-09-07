'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaList, 
  FaBuilding,
  FaMapMarkedAlt,
  FaUserGraduate,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaChartBar,
  FaFlag,
  FaComments,
  FaBullhorn,
  FaExclamationTriangle,
  FaDownload,
  FaUserShield,
  FaChevronDown,
  FaChevronRight,
  FaMapMarkerAlt,
  FaEye,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaFileAlt
} from 'react-icons/fa';

const StateAdminSidebar = () => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['listings', 'reports']);

  // Mock state admin data (in a real app, this would come from auth/session)
  const CURRENT_STATE_ADMIN = {
    name: 'Adebayo Johnson',
    assignedState: 'Lagos State',
    email: 'adebayo.johnson@lagosstate.gov.ng',
    pendingCount: 12,
    flaggedCount: 3
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (href: string) => pathname === href;

  const navigationSections = [
    {
      id: 'main',
      title: 'Dashboard',
      items: [
        { href: '/state-admin', icon: FaTachometerAlt, label: 'Overview', badge: null },
        { href: '/state-admin/analytics', icon: FaChartBar, label: 'Analytics', badge: null },
      ]
    },
    {
      id: 'listings',
      title: 'Listings Management',
      expandable: true,
      items: [
        { href: '/state-admin/listings', icon: FaList, label: 'All Listings', badge: '156' },
        { href: '/state-admin/pending', icon: FaClock, label: 'Pending Review', badge: CURRENT_STATE_ADMIN.pendingCount.toString() },
        { href: '/state-admin/approved', icon: FaCheckCircle, label: 'Approved', badge: '98' },
        { href: '/state-admin/flagged', icon: FaExclamationTriangle, label: 'Flagged', badge: CURRENT_STATE_ADMIN.flaggedCount.toString() },
      ]
    },
    {
      id: 'locations',
      title: 'Location Management',
      expandable: true,
      items: [
        { href: '/state-admin/lgas', icon: FaMapMarkerAlt, label: 'LGAs Overview', badge: '20' },
        { href: '/state-admin/categories', icon: FaBuilding, label: 'Categories', badge: null },
      ]
    },
    {
      id: 'users',
      title: 'User Management',
      expandable: true,
      items: [
        { href: '/state-admin/corps-members', icon: FaUserGraduate, label: 'Corps Members', badge: '847' },
        { href: '/state-admin/users', icon: FaUsers, label: 'All Users', badge: '1,234' },
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      expandable: true,
      items: [
        { href: '/state-admin/reports', icon: FaFileAlt, label: 'Reports', badge: null },
        { href: '/state-admin/export', icon: FaDownload, label: 'Data Export', badge: null },
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      expandable: true,
      items: [
        { href: '/state-admin/announcements', icon: FaBullhorn, label: 'Announcements', badge: null },
        { href: '/state-admin/notifications', icon: FaBell, label: 'Notifications', badge: '5' },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
            <FaUserShield className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">NYSC Companion</h1>
            <p className="text-sm text-green-300">State Admin Portal</p>
          </div>
        </div>
      </div>

      {/* State Information */}
      <div className="p-4 border-b border-green-700 bg-green-800/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaMapMarkerAlt className="text-2xl text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">{CURRENT_STATE_ADMIN.assignedState}</h2>
          <p className="text-sm text-green-300">Assigned State</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-green-700">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">{CURRENT_STATE_ADMIN.pendingCount}</div>
            <div className="text-xs text-green-300">Pending</div>
          </div>
          <div className="bg-green-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-400">{CURRENT_STATE_ADMIN.flaggedCount}</div>
            <div className="text-xs text-green-300">Flagged</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.id}>
              {/* Section Header */}
              {section.expandable ? (
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-green-300 uppercase tracking-wider mb-3 hover:text-white transition-colors"
                >
                  <span>{section.title}</span>
                  {expandedSections.includes(section.id) ? (
                    <FaChevronDown className="text-xs" />
                  ) : (
                    <FaChevronRight className="text-xs" />
                  )}
                </button>
              ) : (
                <div className="text-xs font-semibold text-green-300 uppercase tracking-wider mb-3">
                  {section.title}
                </div>
              )}

              {/* Section Items */}
              {(!section.expandable || expandedSections.includes(section.id)) && (
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          className={`
                            flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                            ${active 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30' 
                              : 'hover:bg-green-800/70 text-green-200 hover:text-white'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`text-lg ${active ? 'text-white' : 'text-green-300 group-hover:text-white'}`} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`
                              px-2 py-1 text-xs font-bold rounded-full
                              ${active 
                                ? 'bg-white/20 text-white' 
                                : 'bg-green-700 text-green-200'
                              }
                            `}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-green-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AJ</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{CURRENT_STATE_ADMIN.name}</div>
            <div className="text-xs text-green-300">State Administrator</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link 
            href="/state-admin/profile"
            className="flex items-center gap-3 px-3 py-2 text-green-200 hover:text-white hover:bg-green-800/70 rounded-lg transition-colors"
          >
            <FaCog className="text-sm" />
            <span className="text-sm">Profile Settings</span>
          </Link>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 text-green-200 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <FaSignOutAlt className="text-sm" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default StateAdminSidebar;
