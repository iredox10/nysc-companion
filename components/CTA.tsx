import Link from 'next/link';

const CTA = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-600 mb-8">Create an account and start exploring your new community.</p>
        <Link href="/signup" className="bg-green-500 text-white font-bold px-6 py-3 rounded-md hover:bg-green-600">
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;
