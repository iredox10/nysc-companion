const Features = () => {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Location-Based Directory</h3>
              <p className="text-gray-600">Find essential services and places in your LGA.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ratings and Reviews</h3>
              <p className="text-gray-600">Make informed decisions with community-sourced reviews.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Community Driven</h3>
              <p className="text-gray-600">Connect with fellow corps members and share experiences.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  