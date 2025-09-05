"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-black text-green-600 tracking-tighter">
          NYSC<span className="text-gray-800">Companion</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-gray-600 hover:text-green-600 transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
            How It Works
          </Link>
          <Link href="/listings" className="text-gray-600 hover:text-green-600 transition-colors">
            Listings
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
            Login
          </Link>
          <Link href="/signup" className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
