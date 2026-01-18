import React from 'react';
import { X, Mail, Package } from 'lucide-react';

export default function OrderForm({ 
  show, 
  onClose, 
  cart, 
  totalAmount, 
  customerInfo, 
  setCustomerInfo, 
  onSubmit 
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Your Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Package size={20} className="text-blue-600" />
            Order Items:
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm py-1">
                <span>{item.name} (Size {item.size}) x {item.quantity}</span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-blue-600">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
              required
            />
            <input
              type="text"
              placeholder="Complete Address *"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
              required
            />
            <input
              type="text"
              placeholder="City *"
              value={customerInfo.city}
              onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Pincode *"
              value={customerInfo.pincode}
              onChange={(e) => setCustomerInfo({...customerInfo, pincode: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              Order confirmation will be sent to your email address
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
            >
              Confirm & Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
