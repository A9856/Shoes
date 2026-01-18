import React from 'react';
import ProductCard from '../components/ProductCard';
import { SHOES_DATA } from '../data/products';

export default function HomePage({ 
  setView, 
  setSelectedProduct, 
  toggleWishlist, 
  wishlist 
}) {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Adil Shoes House
          </h2>
          <p className="text-xl mb-8">Premium Quality Shoes at Best Prices</p>
          <button 
            onClick={() => setView('products')} 
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SHOES_DATA.slice(0, 16).map(product => (
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
    </div>
  );
}
