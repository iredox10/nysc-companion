import Link from 'next/link';

const Hero = () => {
    return (
      <section className="bg-green-500 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to NYSC Companion</h1>
          <p className="text-lg mb-8">Your one-stop guide to navigating your service year with ease.</p>
          <Link href="/signup" className="bg-white text-green-500 font-bold px-6 py-3 rounded-md hover:bg-gray-200">
            Get Started
          </Link>
        </div>
      </section>
    );
  };
  
  export default Hero;
  