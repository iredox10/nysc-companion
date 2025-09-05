import { guides } from '@/data/guides';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/guides" className="text-green-600 hover:underline font-semibold mb-4 inline-block">
              ← Back to All Guides
            </Link>
            <span className="block text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-4 w-max">
              {guide.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800">{guide.title}</h1>
            <p className="text-lg text-gray-600 mt-4">{guide.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: guide.content }} 
          />
        </div>
      </div>

      {/* Related Guides */}
      <div className="bg-gray-50 border-t py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Related Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guides
              .filter((g) => g.slug !== guide.slug && g.category === guide.category)
              .slice(0, 2)
              .map((relatedGuide) => (
                <Link href={`/guides/${relatedGuide.slug}`} key={relatedGuide.slug} className="block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600">{relatedGuide.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{relatedGuide.description}</p>
                  <span className="font-semibold text-green-600 group-hover:underline">
                    Read More →
                  </span>
                </Link>
            ))}
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
