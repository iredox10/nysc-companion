'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Mock signup logic
    console.log('Mock signup with:', { name, email, password });
    router.push('/profile/setup');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side: Branding and Info */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-500 to-teal-600 items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-300 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="z-10">
          <h1 className="text-5xl font-black tracking-tighter mb-4">Join the Community</h1>
          <p className="text-xl max-w-md">
            Create your account to unlock a world of resources for your NYSC service year.
          </p>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600 mb-8">Let's get you started!</p>
          
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                placeholder="••••••••"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Create Account
              </button>
            </div>
          </form>
          
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-green-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
