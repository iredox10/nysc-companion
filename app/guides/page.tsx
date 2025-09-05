import { guides } from '@/data/guides';
import Link from 'next/link';

export default function GuidesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-black text-gray-800">NYSC Guides & Tips</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Your comprehensive resource for navigating every stage of the NYSC service year, from registration to passing out.
          </p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search for a guide..."
              className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug} className="block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
                {guide.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">{guide.title}</h2>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <span className="font-semibold text-green-600 group-hover:underline">
                Read More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
