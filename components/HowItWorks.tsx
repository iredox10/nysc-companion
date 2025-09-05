const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Sign up and tell us about your deployment location. We'll customize everything to your specific state and LGA.",
      icon: "👤",
      color: "from-blue-400 to-purple-500"
    },
    {
      step: "02", 
      title: "Discover Your Area",
      description: "Explore verified listings of restaurants, accommodations, hospitals, and more in your deployment area.",
      icon: "🔍",
      color: "from-green-400 to-teal-500"
    },
    {
      step: "03",
      title: "Connect & Review",
      description: "Share your experiences, read reviews from fellow corps members, and build your network.",
      icon: "⭐",
      color: "from-yellow-400 to-orange-500"
    },
    {
      step: "04",
      title: "Enjoy Your Service",
      description: "Make the most of your service year with insider knowledge and a supportive community.",
      icon: "🎉",
      color: "from-pink-400 to-red-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 -translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 translate-x-32 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-gray-700">🚀 Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            Get Started in
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> 4 Easy Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join the NYSC Companion community and transform your service year experience in just a few minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 to-pink-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative group"
              >
                {/* Step Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Step Number */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                      {step.description}
                    </p>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute bottom-4 left-4 flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full opacity-30`}
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Arrow (Hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-lg text-gray-600 mb-6">Ready to get started?</p>
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold px-8 py-4 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto space-x-2">
            <span>Join NYSC Companion Today</span>
            <span className="text-xl">🚀</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
