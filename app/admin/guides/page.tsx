'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaBook, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaCalendarAlt, FaUser, FaHeart, FaComment, FaStar, FaFlag } from 'react-icons/fa';

const mockGuides = [
  {
    id: 'guide1',
    title: 'Complete Guide to Finding Accommodation in Lagos',
    slug: 'accommodation-guide-lagos',
    excerpt: 'Everything you need to know about finding safe, affordable accommodation as a corps member in Lagos State.',
    content: 'This comprehensive guide covers all aspects of finding accommodation...',
    category: 'Accommodation',
    author: 'Admin Lagos',
    authorId: 'admin_lagos',
    publishDate: '2024-02-15',
    lastUpdated: '2024-02-20',
    status: 'published',
    featured: true,
    tags: ['accommodation', 'lagos', 'housing', 'safety'],
    views: 1247,
    likes: 89,
    comments: 23,
    rating: 4.8,
    estimatedReadTime: 8,
    targetStates: ['Lagos'],
    difficulty: 'beginner',
    coverImage: 'lagos-accommodation.jpg'
  },
  {
    id: 'guide2',
    title: 'Transportation Tips for Corps Members in Abuja',
    slug: 'transportation-tips-abuja',
    excerpt: 'Navigate Abuja like a pro with these essential transportation tips and tricks.',
    content: 'Getting around Abuja can be challenging for new corps members...',
    category: 'Transportation',
    author: 'Admin FCT',
    authorId: 'admin_fct',
    publishDate: '2024-02-10',
    lastUpdated: '2024-02-18',
    status: 'published',
    featured: false,
    tags: ['transportation', 'abuja', 'fct', 'commute'],
    views: 892,
    likes: 67,
    comments: 15,
    rating: 4.5,
    estimatedReadTime: 5,
    targetStates: ['FCT'],
    difficulty: 'beginner',
    coverImage: 'abuja-transport.jpg'
  },
  {
    id: 'guide3',
    title: 'Best Local Foods to Try During Service Year',
    slug: 'local-foods-service-year',
    excerpt: 'Discover amazing local cuisines and budget-friendly eating options across Nigeria.',
    content: 'One of the best parts of service year is experiencing local culture...',
    category: 'Food & Culture',
    author: 'Admin National',
    authorId: 'admin_national',
    publishDate: '2024-02-08',
    lastUpdated: '2024-02-12',
    status: 'draft',
    featured: false,
    tags: ['food', 'culture', 'budget', 'local'],
    views: 0,
    likes: 0,
    comments: 0,
    rating: 0,
    estimatedReadTime: 12,
    targetStates: ['All'],
    difficulty: 'intermediate',
    coverImage: 'local-foods.jpg'
  },
  {
    id: 'guide4',
    title: 'Healthcare Options for Corps Members in Kwara',
    slug: 'healthcare-options-kwara',
    excerpt: 'Essential information about healthcare facilities and medical services in Kwara State.',
    content: 'Your health is paramount during service year...',
    category: 'Healthcare',
    author: 'Admin Kwara',
    authorId: 'admin_kwara',
    publishDate: '2024-02-05',
    lastUpdated: '2024-02-15',
    status: 'published',
    featured: true,
    tags: ['healthcare', 'kwara', 'medical', 'emergency'],
    views: 734,
    likes: 45,
    comments: 18,
    rating: 4.7,
    estimatedReadTime: 6,
    targetStates: ['Kwara'],
    difficulty: 'beginner',
    coverImage: 'kwara-healthcare.jpg'
  }
];

const GuidesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [selectedGuides, setSelectedGuides] = useState<string[]>([]);

  const filteredGuides = mockGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || guide.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || guide.status === statusFilter;
    const matchesState = stateFilter === 'All' || guide.targetStates.includes(stateFilter) || guide.targetStates.includes('All');
    return matchesSearch && matchesCategory && matchesStatus && matchesState;
  });

  const toggleGuideSelection = (guideId: string) => {
    setSelectedGuides(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedGuides(prev => 
      prev.length === filteredGuides.length ? [] : filteredGuides.map(guide => guide.id)
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'published': { bg: 'bg-green-100', text: 'text-green-700' },
      'draft': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'archived': { bg: 'bg-gray-100', text: 'text-gray-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      'beginner': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'intermediate': { bg: 'bg-orange-100', text: 'text-orange-700' },
      'advanced': { bg: 'bg-red-100', text: 'text-red-700' },
    };
    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig] || difficultyConfig.beginner;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Guides & Tips</h1>
            <p className="text-gray-600">Create and manage helpful guides for corps members</p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition shadow-lg font-medium">
              <FaPlus />
              Create Guide
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Guides</p>
              <p className="text-3xl font-black text-gray-800">{mockGuides.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBook className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-3xl font-black text-gray-800">{mockGuides.filter(g => g.status === 'published').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaBook className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-3xl font-black text-gray-800">{mockGuides.reduce((sum, g) => sum + g.views, 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Rating</p>
              <p className="text-3xl font-black text-gray-800">
                {(mockGuides.filter(g => g.rating > 0).reduce((sum, g) => sum + g.rating, 0) / mockGuides.filter(g => g.rating > 0).length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaStar className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides and tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Transportation">Transportation</option>
            <option value="Food & Culture">Food & Culture</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="General">General</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="All">All States</option>
            <option value="Lagos">Lagos</option>
            <option value="FCT">FCT Abuja</option>
            <option value="Kwara">Kwara</option>
            <option value="Ogun">Ogun</option>
          </select>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute top-4 left-4">
                {guide.featured && (
                  <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  {guide.estimatedReadTime} min read
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  {guide.category}
                </span>
                {getStatusBadge(guide.status)}
                {getDifficultyBadge(guide.difficulty)}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guide.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {guide.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
                {guide.tags.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{guide.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By: {guide.author}</span>
                  <span>{new Date(guide.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>States: {guide.targetStates.join(', ')}</span>
                  {guide.status === 'published' && (
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <FaEye className="text-xs" />
                        {guide.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-xs" />
                        {guide.likes}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  <FaEye className="inline mr-2" />
                  View
                </button>
                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FaEdit />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-16">
          <FaBook className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No guides found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default GuidesPage;
