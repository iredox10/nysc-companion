'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { guides } from '@/data/guides';
import { FaArrowLeft, FaBookOpen, FaUsers, FaGraduationCap, FaClock, FaArrowRight, FaLightbulb, FaHeart, FaStar, FaSearch, FaFilter } from 'react-icons/fa';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [difficulty, setDifficulty] = useState('all');

  const categorySlug = params.category as string;
  const categoryName = categorySlug?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Filter guides by category
  const categoryGuides = guides.filter(guide => 
    guide.category.toLowerCase().replace(' ', '-') === categorySlug
  );

  // Apply search and filters
  const filteredGuides = categoryGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || guide.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Sort guides
  const sortedGuides = [...filteredGuides].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes || 0) - (a.likes || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'shortest':
        return (a.readTime || 0) - (b.readTime || 0);
      case 'longest':
        return (b.readTime || 0) - (a.readTime || 0);
      default: // newest
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    }
  });

  const categoryIcons: { [key: string]: React.ReactElement } = {
    'pre-camp': <FaGraduationCap className="text-blue-600" />,
    'post-camp': <FaUsers className="text-green-600" />,
    'service-year': <FaBookOpen className="text-purple-600" />,
  };

  const categoryColors: { [key: string]: string } = {
    'pre-camp': 'from-blue-500 to-blue-600',
    'post-camp': 'from-green-500 to-green-600',
    'service-year': 'from-purple-500 to-purple-600',
  };

  const categoryDescriptions: { [key: string]: string } = {
    'pre-camp': 'Essential guides to prepare you before heading to NYSC orientation camp',
    'post-camp': 'Everything you need to know after completing your orientation',
    'service-year': 'Tips and guides for your entire service year journey',
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      beginner: { bg: 'bg-green-100', text: 'text-green-700', label: 'Beginner' },
      intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Intermediate' },
      advanced: { bg: 'bg-red-100', text: 'text-red-700', label: 'Advanced' },
    };
    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig] || difficultyConfig.beginner;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (!categoryGuides.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 py-12">
          <Link href="/guides" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to All Guides
          </Link>
          <div className="text-center py-20">
            <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">The category you're looking for doesn't exist or has no guides yet.</p>
            <Link href="/guides" className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
              Browse All Guides
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <Link href="/guides" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to All Guides
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryColors[categorySlug] || 'from-gray-400 to-gray-500'} flex items-center justify-center text-white text-2xl`}>
              {categoryIcons[categorySlug] || <FaBookOpen />}
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-800 mb-2">{categoryName}</h1>
              <p className="text-gray-600 text-lg">{categoryDescriptions[categorySlug] || 'Helpful guides for your NYSC journey'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-blue-600 mb-2">{categoryGuides.length}</div>
              <div className="text-sm text-gray-600">Total Guides</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-green-600 mb-2">
                {Math.round(categoryGuides.reduce((acc, guide) => acc + (guide.readTime || 0), 0) / categoryGuides.length) || 0}
              </div>
              <div className="text-sm text-gray-600">Avg Read Time (min)</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-purple-600 mb-2">
                {(categoryGuides.reduce((acc, guide) => acc + (guide.rating || 0), 0) / categoryGuides.length || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="shortest">Shortest Read</option>
                <option value="longest">Longest Read</option>
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {sortedGuides.length} result{sortedGuides.length !== 1 ? 's' : ''} for "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="container mx-auto px-6 py-12">
        {sortedGuides.length === 0 ? (
          <div className="text-center py-20">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No guides found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDifficulty('all');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image/Gradient Header */}
                <div className={`h-48 bg-gradient-to-r ${categoryColors[categorySlug] || 'from-gray-400 to-gray-500'} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {getDifficultyBadge(guide.difficulty || 'beginner')}
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {guide.readTime || 5} min read
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-2">
                      {categoryIcons[categorySlug] || <FaBookOpen />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{guide.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      {guide.rating && (
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">{guide.rating}</span>
                        </div>
                      )}
                      {guide.likes && (
                        <div className="flex items-center gap-1">
                          <FaHeart className="text-red-400" />
                          <span>{guide.likes}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-gray-400" />
                      <span>{guide.readTime || 5}m</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={`/guides/${guide.slug}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600"
                  >
                    Read Guide
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Categories */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Explore Other Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(categoryColors)
              .filter(([slug]) => slug !== categorySlug)
              .map(([slug, gradient]) => (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}>
                      {categoryIcons[slug]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {guides.filter(g => g.category.toLowerCase().replace(' ', '-') === slug).length} guides
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {categoryDescriptions[slug]}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
