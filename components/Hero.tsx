import Link from 'next/link';

const Hero = () => {
    return (
      <section className="relative bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 pt-32 pb-20 lg:pt-48 lg:pb-28">
        {/* Animated Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-8 left-20 w-56 h-56 bg-purple-300 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

        <div className="container mx-auto px-6 text-center relative">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-green-600 shadow-md">
              Your NYSC Journey, Simplified
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-800 mb-6 leading-tight">
            Navigate Your Service <br /> Year with <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Discover essential services, find housing, connect with fellow corps members, and make the most of your NYSC experience. All in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Get Started for Free
            </Link>
            <Link href="/listings" className="bg-white text-gray-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              Explore Listings
            </Link>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  