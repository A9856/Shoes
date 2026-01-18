import React from 'react';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function WishlistPage({ 
  wishlist, 
  setView, 
  setSelectedProduct, 
  toggleWishlist 
}) {
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-xl mb-4">Your wishlist is empty</p>
          <button 
            onClick={() => setView('products')} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
      <p className="text-gray-600 mb-6">{wishlist.length} items in your wishlist</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            setSelectedProduct={setSelectedProduct}
            setView={setView}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  );
}
