import { Listing, Category } from '@/types';
import { FaTimes, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface ListingDetailModalProps {
  listing: (Listing & { $id: string }) | null;
  categoryName: string;
  onClose: () => void;
}

const ListingDetailModal = ({ listing, categoryName, onClose }: ListingDetailModalProps) => {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 scale-95 animate-slide-up">
        <div className="p-8 relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
            <FaTimes size={24} />
          </button>
          
          <div className="mb-4">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
              {categoryName}
            </span>
          </div>

          <h2 className="text-4xl font-black text-gray-800 mb-4">{listing.name}</h2>
          
          <p className="text-gray-600 text-lg mb-8">{listing.description}</p>

          <div className="space-y-6 border-t border-b py-6">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-green-500 mt-1 mr-4 flex-shrink-0" size={20} />
              <div>
                <p className="font-bold text-gray-800">Address</p>
                <p className="text-gray-600">{listing.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaPhone className="text-green-500 mt-1 mr-4 flex-shrink-0" size={20} />
              <div>
                <p className="font-bold text-gray-800">Contact Information</p>
                <p className="text-gray-600">{listing.contactInfo}</p>
              </div>
            </div>
          </div>

          {/* Placeholder for a map */}
          <div className="mt-8">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 font-semibold">Interactive Map View Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px) scale(0.95); }
          to { transform: translateY(0) scale(0.95); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ListingDetailModal;
