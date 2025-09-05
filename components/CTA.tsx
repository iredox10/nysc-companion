import Link from 'next/link';

const CTA = () => {
  return (
    <section className="relative bg-gray-800 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-10"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h2 className="text-4xl font-black text-white mb-4">
          Ready to Make Your Service Year Unforgettable?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of corps members who are already using NYSC Companion to thrive.
        </p>
        <Link href="/signup" className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg">
          Sign Up Now - It's Free!
        </Link>
      </div>
    </section>
  );
};

export default CTA;
