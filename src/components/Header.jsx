import React from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';

export default function Header({ 
  setView, 
  cart, 
  wishlist, 
  menuOpen, 
  setMenuOpen 
}) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 
            className="text-2xl md:text-3xl font-bold cursor-pointer" 
            onClick={() => setView('home')}
          >
            👟 Adil Shoes House
          </h1>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('home')} className="hover:text-blue-200 transition">
              Home
            </button>
            <button onClick={() => setView('products')} className="hover:text-blue-200 transition">
              Products
            </button>
            
            <div className="relative">
              <button onClick={() => setView('wishlist')} className="hover:text-blue-200 transition relative">
                <Heart size={24} fill={wishlist.length > 0 ? 'white' : 'none'} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
            
            <div className="relative">
              <button onClick={() => setView('cart')} className="hover:text-blue-200 transition relative">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
            
            <button onClick={() => setView('orders')} className="hover:text-blue-200 transition">
              Orders
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <button onClick={() => { setView('home'); setMenuOpen(false); }} className="block w-full text-left py-2">
              Home
            </button>
            <button onClick={() => { setView('products'); setMenuOpen(false); }} className="block w-full text-left py-2">
              Products
            </button>
            <button onClick={() => { setView('wishlist'); setMenuOpen(false); }} className="block w-full text-left py-2">
              Wishlist ({wishlist.length})
            </button>
            <button onClick={() => { setView('cart'); setMenuOpen(false); }} className="block w-full text-left py-2">
              Cart ({cart.length})
            </button>
            <button onClick={() => { setView('orders'); setMenuOpen(false); }} className="block w-full text-left py-2">
              Orders
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

