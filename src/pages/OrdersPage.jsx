import React from 'react';
import { ShoppingCart, Mail } from 'lucide-react';

export default function OrdersPage({ orders, cancelOrder }) {
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-xl">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            {/* Order Header - SAME */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <p className="text-gray-600">Date: {order.date} at {order.time}</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Mail size={14} />
                  Email sent to: {order.customer.email}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === 'Cancelled' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>

            {/* Customer Details - SAME */}
            <div className="border-t pt-4 mb-4">
              <h4 className="font-semibold mb-2">Customer Details:</h4>
              <p className="text-sm text-gray-600">{order.customer.name}</p>
              <p className="text-sm text-gray-600">{order.customer.email}</p>
              <p className="text-sm text-gray-600">{order.customer.phone}</p>
            </div>

            {/* Shipping Address - SAME */}
            <div className="border-t pt-4 mb-4">
              <h4 className="font-semibold mb-2">Shipping Address:</h4>
              <p className="text-sm text-gray-600">{order.customer.address}</p>
              <p className="text-sm text-gray-600">{order.customer.city} - {order.customer.pincode}</p>
            </div>

            {/* ✅ FIXED ORDER ITEMS IMAGES */}
            <div className="border-t pt-4 mb-4">
              <h4 className="font-semibold mb-2">Order Items:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                  >
                    {/* ✅ ONLY THIS CHANGED */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded bg-white flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                      <p className="text-sm text-gray-600">Size: UK {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-blue-600">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total & Cancel - SAME */}
            <div className="border-t pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-blue-600">₹{order.total}</p>
              </div>
              {order.status !== 'Cancelled' && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this order?')) {
                      cancelOrder(order.id);
                    }
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

