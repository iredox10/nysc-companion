const Features = () => {
    return (
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800">Everything You Need for a Successful Service Year</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Our platform is packed with features designed to make your life as a corps member easier and more enjoyable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl text-green-500 mb-4">📍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">LGA Directory</h3>
              <p className="text-gray-600">Find verified listings for housing, transportation, food, and more, right in your Local Government Area.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl text-blue-500 mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Ratings & Reviews</h3>
              <p className="text-gray-600">Make informed decisions with honest feedback from fellow corps members.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl text-purple-500 mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Community Hub</h3>
              <p className="text-gray-600">Connect with other "corpers" in your area, ask questions, and share your experiences.</p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl text-yellow-500 mb-4">🗺️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Interactive Maps</h3>
              <p className="text-gray-600">Visualize your surroundings and discover points of interest with our easy-to-use maps.</p>
            </div>
            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl text-red-500 mb-4">🚨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Safety Alerts</h3>
              <p className="text-gray-600">Stay informed about local safety updates and advisories from trusted sources.</p>
            </div>
            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl text-teal-500 mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">NYSC Guide & Tips</h3>
              <p className="text-gray-600">Access a wealth of knowledge, from registration tips to advice on navigating PPA challenges.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  