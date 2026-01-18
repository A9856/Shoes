import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EmailNotification from './components/EmailNotification';
import OrderForm from './components/OrderForm';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { sendOrderConfirmationEmail } from './utils/emailService';
import './App.css';

// 🔥 Complete Order Storage System
const saveOrdersToStorage = (orders) => {
  const data = {
    lastUpdated: new Date().toLocaleString('en-IN'),
    totalOrders: orders.length,
    orders: orders
  };
  localStorage.setItem('adilShoesOrders', JSON.stringify(data, null, 2));
};

const loadOrdersFromStorage = () => {
  try {
    const data = localStorage.getItem('adilShoesOrders');
    return data ? JSON.parse(data).orders || [] : [];
  } catch {
    return [];
  }
};

export default function App() {
  // All State Management
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: ''
  });
  const [emailSent, setEmailSent] = useState(false);

  // Load orders on app start
  useEffect(() => {
    const savedOrders = loadOrdersFromStorage();
    setOrders(savedOrders);
  }, []);

  // Auto-save orders
  useEffect(() => {
    if (orders.length > 0) {
      saveOrdersToStorage(orders);
    }
  }, [orders]);

  // 🔥 Order Management Functions
  const viewAllOrders = () => {
    const allOrders = loadOrdersFromStorage();
    console.clear();
    console.log(' ADIL SHOES HOUSE - ALL ORDERS');
    console.log('='.repeat(60));
    console.table(allOrders.map((order, i) => ({
      '#': i + 1,
      'ID': order.id,
      'Customer': order.customer?.name,
      'Total': `₹${order.total}`,
      'Items': order.items.length,
      'Date': order.date
    })));
    alert(` ${allOrders.length} Orders Saved!\n Check Console (F12)`);
  };

  const downloadOrders = () => {
    const allOrders = loadOrdersFromStorage();
    const data = {
      generated: new Date().toLocaleString('en-IN'),
      shop: 'Adil Shoes House',
      totalOrders: allOrders.length,
      orders: allOrders
    };
    
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `adil-shoes-complete-orders-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(` ${allOrders.length} orders downloaded!\n Check Downloads folder`);
  };

  const clearOrders = () => {
    if (window.confirm(' Delete ALL orders forever?')) {
      localStorage.removeItem('adilShoesOrders');
      setOrders([]);
      alert(' All orders cleared successfully!');
    }
  };

  // Add to Cart
  const addToCart = (product, size) => {
    if (!size) {
      alert(' Please select a size first!');
      return;
    }
    
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
    
    alert(` ${product.name} (UK ${size}) added to cart!`);
    setView('cart');
    setSelectedProduct(null);
  };

  // Remove from Cart
  const removeFromCart = (id, size) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)));
  };

  // Update Quantity
  const updateQuantity = (id, size, delta) => {
    setCart(cart.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Place Order
  const placeOrder = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert(' Please fill all required fields!');
      return;
    }

    const orderId = Date.now();
    const order = {
      id: orderId,
      items: [...cart],
      customer: { ...customerInfo },
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN', { hour12: true }),
      status: 'Processing'
    };
    
    // Send email
    await sendOrderConfirmationEmail(order);
    
    // Save order
    setOrders([order, ...orders]);
    
    // Show success
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4000);
    
    // Reset everything
    setCart([]);
    setShowOrderForm(false);
    setCustomerInfo({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
    setView('order-success');
  };

  // Cancel Order
  const cancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    ));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* 🔥 ADMIN DEBUG PANEL */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-blue-500 text-white p-3 shadow-2xl border-b-4 border-emerald-400">
        <div className="container mx-auto flex flex-wrap gap-3 items-center justify-center text-sm">
          <button 
            onClick={viewAllOrders}
            className="bg-white text-emerald-700 px-5 py-2 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
             Orders ({orders.length})
          </button>
          
          <button 
            onClick={downloadOrders}
            className="bg-white text-blue-700 px-5 py-2 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
             Download JSON
          </button>
          
          <button 
            onClick={clearOrders}
            className="bg-red-100 text-red-700 px-5 py-2 rounded-2xl font-bold shadow-lg hover:bg-red-200 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
             Clear All
          </button>
          
          <span className="font-medium opacity-95"> Auto-save enabled | F12 → Application → Local Storage</span>
        </div>
      </div>

      {/* Email Notification */}
      <EmailNotification show={emailSent} />

      {/* Header */}
      <Header 
        setView={setView}
        cart={cart}
        wishlist={wishlist}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Main Pages */}
      {view === 'home' && (
        <HomePage 
          setView={setView}
          setSelectedProduct={setSelectedProduct}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      )}

      {view === 'products' && (
        <ProductsPage 
          setView={setView}
          setSelectedProduct={setSelectedProduct}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      )}

      {view === 'product-detail' && (
        <ProductDetailPage 
          product={selectedProduct}
          setView={setView}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      )}

      {view === 'cart' && (
        <CartPage 
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          setView={setView}
          setShowOrderForm={setShowOrderForm}
        />
      )}

      {view === 'wishlist' && (
        <WishlistPage 
          wishlist={wishlist}
          setView={setView}
          setSelectedProduct={setSelectedProduct}
          toggleWishlist={toggleWishlist}
        />
      )}

      {view === 'orders' && (
        <OrdersPage orders={orders} cancelOrder={cancelOrder} />
      )}

      {view === 'order-success' && (
        <OrderSuccessPage orders={orders} setView={setView} />
      )}

      {/* Order Form */}
      <OrderForm 
        show={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        cart={cart}
        totalAmount={totalAmount}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        onSubmit={placeOrder}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
