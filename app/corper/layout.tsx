import { FaUser, FaSignOutAlt, FaTachometerAlt, FaList, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';

const CorperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden lg:block">
        <div className="p-6">
          <Link href="/corper" className="text-3xl font-black text-green-600 tracking-tighter">
            NYSC<span className="text-gray-800">Companion</span>
          </Link>
        </div>
        <nav className="mt-6">
          <Link href="/corper" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors">
            <FaTachometerAlt className="mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link href="/corper/listings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors">
            <FaList className="mr-3" />
            <span>My Listings</span>
          </Link>
          <Link href="/corper/listings/new" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors">
            <FaPlusCircle className="mr-3" />
            <span>Add New Listing</span>
          </Link>
          <Link href="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors">
            <FaUser className="mr-3" />
            <span>My Profile</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors rounded-lg">
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm lg:hidden">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/corper" className="text-xl font-bold text-gray-800">NYSC Companion</Link>
                {/* Mobile menu button can be added here */}
            </div>
        </header>
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CorperLayout;
