import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';

export default function ProductDetailPage({ 
  product, 
  setView, 
  addToCart, 
  toggleWishlist, 
  wishlist 
}) {
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <button 
        onClick={() => setView('products')} 
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      {/* Product Detail Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* FIXED MAIN IMAGE */}
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl mb-6"
            />
            {/* FIXED THUMBNAIL IMAGES */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i} 
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-full object-cover rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition bg-gray-100"
                />
              ))}
            </div>
          </div>

          {/* SAB ORIGINAL CODE SAME - Product Info, Size, Cart, Wishlist */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-2">
              Brand: <span className="font-semibold">{product.brand}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Category: <span className="font-semibold capitalize">{product.category}</span>
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-500 text-2xl">★</span>
              <span className="font-semibold text-lg">{product.rating} / 5</span>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-6">₹{product.price}</p>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Product Description:</h3>
              <p className="text-gray-600 mb-4">
                Experience premium comfort and style with {product.name}. Crafted with high-quality materials, 
                these shoes are perfect for both casual wear and athletic activities. The advanced cushioning 
                technology ensures all-day comfort, while the durable outsole provides excellent traction.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Premium quality materials</li>
                  <li>Advanced cushioning technology</li>
                  <li>Breathable design for all-day comfort</li>
                  <li>Durable and long-lasting construction</li>
                  <li>Perfect fit and support</li>
                  <li>Stylish design for any occasion</li>
                </ul>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Select Size:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.size.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600'
                    }`}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-red-500 mt-2">Please select a size</p>
              )}
            </div>

            {/* Action Buttons - SAB SAME */}
            <div className="space-y-3">
              <button
                onClick={() => addToCart(product, selectedSize)}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition ${
                  selectedSize 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={24} />
                {selectedSize ? 'Add to Cart' : 'Please Select Size'}
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-full py-4 rounded-lg font-semibold transition text-lg flex items-center justify-center gap-2 ${
                  wishlist.find(item => item.id === product.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart size={24} fill={wishlist.find(item => item.id === product.id) ? 'white' : 'none'} />
                {wishlist.find(item => item.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

