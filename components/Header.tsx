import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          NYSC Companion
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
