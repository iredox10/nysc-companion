'use client';

import { useState } from 'react';
import { guides } from '@/data/guides';
import Link from 'next/link';
import { FaSearch, FaBookOpen, FaUsers, FaGraduationCap, FaClock, FaArrowRight, FaLightbulb, FaHeart, FaStar } from 'react-icons/fa';

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = [...new Set(guides.map(guide => guide.category))];

  // Filter guides based on search and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryIcons: { [key: string]: JSX.Element } = {
    'Pre-Camp': <FaGraduationCap className="text-blue-600" />,
    'Post-Camp': <FaUsers className="text-green-600" />,
    'Service Year': <FaBookOpen className="text-purple-600" />,
  };

  const categoryColors: { [key: string]: string } = {
    'Pre-Camp': 'from-blue-500 to-blue-600',
    'Post-Camp': 'from-green-500 to-green-600',
    'Service Year': 'from-purple-500 to-purple-600',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white opacity-20 rounded-full"></div>
        
        <div className="relative container mx-auto px-6 py-20 text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaLightbulb className="text-yellow-300" />
              <span className="font-medium">Your Complete NYSC Guide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              NYSC Guides & Tips
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know for a successful service year, from orientation camp to passing out
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for guides, tips, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-4 focus:ring-white/30 transition-all shadow-xl"
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-black mb-2">{guides.length}</div>
              <div className="text-sm opacity-80">Comprehensive Guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-black mb-2">100+</div>
              <div className="text-sm opacity-80">Tips & Tricks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-black mb-2">24/7</div>
              <div className="text-sm opacity-80">Always Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                !selectedCategory 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Guides
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guides Section */}
      <div className="container mx-auto px-6 py-16">
        {filteredGuides.length === 0 ? (
          <div className="text-center py-20">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No guides found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search terms or browse all categories to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory || 'All Guides'}
                </h2>
                <p className="text-gray-500 mt-1">
                  {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                  Clear search
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide, index) => (
                <Link
                  href={`/guides/${guide.slug}`}
                  key={guide.slug}
                  className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className={`h-32 bg-gradient-to-br ${categoryColors[guide.category]} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                        {categoryIcons[guide.category]}
                        {guide.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {categoryIcons[guide.category]}
                      </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {guide.description}
                    </p>
                    
                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaClock />
                        <span>5 min read</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-bold group-hover:gap-3 transition-all">
                        <span>Read Guide</span>
                        <FaArrowRight className="text-sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <FaHeart className="text-4xl mx-auto mb-6 text-red-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need More Help?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of corps members helping each other succeed throughout the service year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/corper"
                className="bg-white text-green-600 font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition shadow-lg inline-flex items-center justify-center gap-2"
              >
                <FaUsers />
                Join Community
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-green-600 transition inline-flex items-center justify-center gap-2"
              >
                <FaBookOpen />
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
