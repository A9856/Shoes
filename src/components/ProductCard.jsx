import React from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, setSelectedProduct, setView, toggleWishlist, wishlist }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
      {/* ✅ FIXED IMAGE TAG */}
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover bg-gradient-to-br from-gray-100 to-gray-200"
      />
      <div className="p-4">
        <h4 className="font-bold text-lg mb-2">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm">{product.rating}</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 mb-3">₹{product.price}</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedProduct(product);
              setView('product-detail');
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-lg transition ${
              wishlist.find(item => item.id === product.id)
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Heart size={20} fill={wishlist.find(item => item.id === product.id) ? 'white' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}

