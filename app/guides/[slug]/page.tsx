import { guides } from '@/data/guides';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaBookOpen, FaShare, FaPrint, FaHeart, FaCheckCircle } from 'react-icons/fa';

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  const categoryColors: { [key: string]: string } = {
    'Pre-Camp': 'from-blue-500 to-blue-600',
    'Post-Camp': 'from-green-500 to-green-600',
    'Service Year': 'from-purple-500 to-purple-600',
  };

  const relatedGuides = guides
    .filter((g) => g.slug !== guide.slug && g.category === guide.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className={`bg-gradient-to-br ${categoryColors[guide.category]} text-white relative overflow-hidden`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <Link 
              href="/guides" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-8 transition-colors"
            >
              <FaArrowLeft />
              Back to All Guides
            </Link>

            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaBookOpen />
              <span className="font-bold">{guide.category}</span>
            </div>

            {/* Title and Description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              {guide.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl">
              {guide.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <FaClock />
                <span>5-10 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-300" />
                <span>Essential Guide</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
                  <FaShare />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
                  <FaPrint />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FaCheckCircle className="text-green-500" />
                <span>Step-by-step guide</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full w-0 animate-pulse"></div>
              </div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-black prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:mb-6 prose-li:mb-2
                prose-strong:text-gray-900 prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: guide.content }} 
            />

            {/* Action Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/corper"
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition text-center"
                >
                  Apply This Knowledge
                </Link>
                <Link 
                  href="/guides"
                  className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-200 transition text-center"
                >
                  Read More Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides Section */}
      {relatedGuides.length > 0 && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                Continue Your Journey
              </h3>
              <p className="text-gray-600 text-center mb-12">
                More guides in the {guide.category} category
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedGuides.map((relatedGuide) => (
                  <Link 
                    href={`/guides/${relatedGuide.slug}`} 
                    key={relatedGuide.slug} 
                    className="group block bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryColors[relatedGuide.category]} text-white text-sm font-bold rounded-full`}>
                        {relatedGuide.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                      {relatedGuide.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedGuide.description}
                    </p>
                    <div className="flex items-center gap-2 text-green-600 font-bold group-hover:gap-3 transition-all">
                      <span>Read Guide</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className={`bg-gradient-to-r ${categoryColors[guide.category]} py-16`}>
        <div className="container mx-auto px-6 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Found this guide helpful?
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of corps members getting the most out of their service year.
            </p>
            <Link 
              href="/corper"
              className="inline-flex items-center gap-2 bg-white text-gray-800 font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition shadow-lg"
            >
              <FaHeart className="text-red-500" />
              Join Our Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for all guides
export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}
