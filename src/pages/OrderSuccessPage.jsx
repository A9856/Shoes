import React from 'react';
import { CheckCircle, Mail, Package } from 'lucide-react';

export default function OrderSuccessPage({ orders, setView }) {
  if (!orders || orders.length === 0) {
    return null;
  }

  const latestOrder = orders[0];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Success Header - SAME */}
      <div className="text-center mb-8">
        <CheckCircle size={100} className="mx-auto text-green-500 mb-6 animate-bounce" />
        <h2 className="text-4xl font-bold mb-4">Order Placed Successfully! 🎉</h2>
        <p className="text-gray-600 text-lg mb-2">Thank you for shopping with Adil Shoes House</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Email Confirmation Card - SAME */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-green-500 rounded-full p-3">
              <Mail size={32} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-green-800 font-bold text-xl">Email Confirmation Sent!</p>
              <p className="text-sm text-gray-600">Check your inbox</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-gray-600 mb-1">Confirmation sent to:</p>
            <p className="font-bold text-lg text-gray-800">{latestOrder.customer.email}</p>
          </div>
        </div>

        {/* Order Summary - SAME till items */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Package size={28} className="text-blue-600" />
            Order Summary
          </h3>
          
          <div className="mb-4 pb-4 border-b">
            <p className="text-gray-600">Order ID: <span className="font-bold">#{latestOrder.id}</span></p>
            <p className="text-gray-600">Date: <span className="font-bold">{latestOrder.date} at {latestOrder.time}</span></p>
            <p className="text-gray-600">Status: <span className="font-bold text-blue-600">{latestOrder.status}</span></p>
          </div>

          {/* ✅ FIXED ORDER ITEMS IMAGES */}
          <h4 className="font-semibold mb-3 text-lg">Ordered Items:</h4>
          <div className="space-y-3 mb-6">
            {latestOrder.items.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200"
              >
                {/* ✅ ONLY THIS CHANGED */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md bg-white flex-shrink-0"
                />
                
                <div className="flex-1">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-gray-600">Brand: {item.brand}</p>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p className="text-gray-600">Size: UK {item.size} | Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-bold text-xl text-blue-600">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer & Shipping Info - SAME */}
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Customer Details:</h4>
            <p className="text-gray-600">{latestOrder.customer.name}</p>
            <p className="text-gray-600">{latestOrder.customer.email}</p>
            <p className="text-gray-600">{latestOrder.customer.phone}</p>
          </div>

          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Shipping Address:</h4>
            <p className="text-gray-600">{latestOrder.customer.address}</p>
            <p className="text-gray-600">{latestOrder.customer.city} - {latestOrder.customer.pincode}</p>
          </div>

          {/* Total Amount - SAME */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total Amount:</span>
              <span className="text-green-600">₹{latestOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - SAME */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setView('orders')} 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg shadow-lg hover:shadow-xl transition"
          >
            View My Orders
          </button>
          <button 
            onClick={() => setView('products')} 
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-semibold text-lg shadow-lg hover:shadow-xl transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

