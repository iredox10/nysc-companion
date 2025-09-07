'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaList, 
  FaBuilding, 
  FaMapMarkedAlt,
  FaUserGraduate,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaShieldAlt,
  FaChartBar,
  FaFlag,
  FaComments,
  FaFileAlt,
  FaBullhorn,
  FaEnvelope,
  FaExclamationTriangle,
  FaDownload,
  FaUserShield,
  FaSearch,
  FaChevronDown,
  FaChevronRight,
  FaBook,
  FaMapMarkerAlt,
  FaEye
} from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['content', 'regional']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children: any[]) => children.some(child => pathname === child.href);

  const navigationSections = [
    {
      id: 'main',
      title: 'Dashboard',
      items: [
        { href: '/admin/dashboard', icon: FaTachometerAlt, label: 'Overview', badge: null },
        { href: '/admin/analytics', icon: FaChartBar, label: 'Analytics', badge: null },
      ]
    },
    {
      id: 'content',
      title: 'Content Management',
      expandable: true,
      items: [
        { href: '/admin/listings', icon: FaList, label: 'All Listings', badge: '156' },
        { href: '/admin/categories', icon: FaBuilding, label: 'Categories', badge: null },
        { href: '/admin/guides', icon: FaBook, label: 'Guides & Tips', badge: '8' },
        { href: '/admin/reviews', icon: FaComments, label: 'Reviews & Ratings', badge: '47' },
      ]
    },
    {
      id: 'regional',
      title: 'Regional Management',
      expandable: true,
      items: [
        { href: '/admin/locations', icon: FaMapMarkerAlt, label: 'States & LGAs', badge: '36' },
        { href: '/admin/state-admins', icon: FaUserShield, label: 'State Admins', badge: '23' },
        { href: '/admin/regional-reports', icon: FaChartBar, label: 'Regional Reports', badge: null },
      ]
    },
    {
      id: 'users',
      title: 'User Management',
      expandable: true,
      items: [
        { href: '/admin/users', icon: FaUsers, label: 'All Users', badge: '2,341' },
        { href: '/admin/corps-members', icon: FaUserGraduate, label: 'Corps Members', badge: '1,847' },
        { href: '/admin/user-verification', icon: FaUserShield, label: 'User Verification', badge: '15' },
      ]
    },
    {
      id: 'moderation',
      title: 'Content Moderation',
      expandable: true,
      items: [
        { href: '/admin/reports', icon: FaFlag, label: 'Reports', badge: '8' },
        { href: '/admin/pending-approval', icon: FaEye, label: 'Pending Approval', badge: '23' },
        { href: '/admin/flagged-content', icon: FaExclamationTriangle, label: 'Flagged Content', badge: '3' },
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      expandable: true,
      items: [
        { href: '/admin/announcements', icon: FaBullhorn, label: 'Announcements', badge: null },
        { href: '/admin/notifications', icon: FaBell, label: 'Notifications', badge: '12' },
        { href: '/admin/messages', icon: FaEnvelope, label: 'Messages', badge: '5' },
      ]
    },
    {
      id: 'system',
      title: 'System',
      expandable: true,
      items: [
        { href: '/admin/settings', icon: FaCog, label: 'Settings', badge: null },
        { href: '/admin/logs', icon: FaFileAlt, label: 'Admin Logs', badge: null },
        { href: '/admin/backups', icon: FaDownload, label: 'Backups', badge: null },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <FaUserGraduate className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">NYSC Companion</h1>
            <p className="text-sm text-slate-400">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-slate-700">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">23</div>
            <div className="text-xs text-slate-400">Pending</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-400">8</div>
            <div className="text-xs text-slate-400">Reports</div>
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
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 hover:text-white transition-colors"
                >
                  <span>{section.title}</span>
                  {expandedSections.includes(section.id) ? (
                    <FaChevronDown className="text-xs" />
                  ) : (
                    <FaChevronRight className="text-xs" />
                  )}
                </button>
              ) : (
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
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
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30' 
                              : 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`text-lg ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`
                              px-2 py-1 text-xs font-bold rounded-full
                              ${active 
                                ? 'bg-white/20 text-white' 
                                : 'bg-slate-700 text-slate-300'
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
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">SA</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">State Admin</div>
            <div className="text-xs text-slate-400">Lagos & Ogun States</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link 
            href="/admin/profile"
            className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors"
          >
            <FaCog className="text-sm" />
            <span className="text-sm">Profile Settings</span>
          </Link>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <FaSignOutAlt className="text-sm" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
