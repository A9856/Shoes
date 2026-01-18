import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage({ 
  cart, 
  removeFromCart, 
  updateQuantity, 
  setView, 
  setShowOrderForm 
}) {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-xl">Your cart is empty</p>
          <button 
            onClick={() => setView('products')} 
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div 
              key={`${item.id}-${item.size}`} 
              className="bg-white rounded-lg shadow p-4 flex gap-4"
            >
              {/*  FIXED IMAGE - Sirf ye line change ki */}
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded bg-gray-100 flex-shrink-0"
              />
              
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">Brand: {item.brand}</p>
                <p className="text-gray-600">Size: UK {item.size}</p>
                <p className="text-blue-600 font-bold text-xl">₹{item.price}</p>
              </div>
              
              <div className="flex flex-col justify-between items-end">
                <button 
                  onClick={() => removeFromCart(item.id, item.size)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
                
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, -1)} 
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.size, 1)} 
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - SAB SAME */}
        <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">₹{totalAmount}</span>
            </div>
          </div>
          
          <button
            onClick={() => setShowOrderForm(true)}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold mb-3"
          >
            Place Order
          </button>
          
          <button
            onClick={() => setView('products')}
            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

