
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { UserRole } from '../types';
import { COLORS } from '../constants';

const Header: React.FC = () => {
  const { cart, currentUser, setCurrentUser } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-medo-green rounded flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">M</div>
              <span className="text-xl font-bold tracking-tight text-medo-navy">MEDO</span>
            </a>
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
              <a href="#/" className="hover:text-medo-green transition-colors">Shop</a>
              <a href="#/categories" className="hover:text-medo-green transition-colors">Categories</a>
              <a href="#/about" className="hover:text-medo-green transition-colors">About Us</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group hidden sm:block">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-4 pr-10 py-2 bg-gray-100 rounded-full text-sm border-none focus:ring-2 focus:ring-medo-green w-48 lg:w-64 transition-all"
              />
              <svg className="w-4 h-4 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <a href="#/cart" className="relative p-2 text-gray-600 hover:text-medo-green transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-medo-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </a>

            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">{currentUser.name}</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl overflow-hidden py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Account</p>
                    </div>
                    {currentUser.role === UserRole.SELLER && (
                      <a href="#/seller" className="block px-4 py-2 text-sm text-gray-700 hover:bg-medo-green hover:text-white transition-colors">Seller Dashboard</a>
                    )}
                    {currentUser.role === UserRole.ADMIN && (
                      <a href="#/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-medo-green hover:text-white transition-colors">Admin Panel</a>
                    )}
                    <a href="#/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-medo-green hover:text-white transition-colors">My Orders</a>
                    <button 
                      onClick={() => { setCurrentUser(null); setIsMenuOpen(false); window.location.hash = '/'; }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="#/login" className="px-5 py-2 bg-medo-green text-white text-sm font-semibold rounded-lg hover:bg-[#1E7E34] transition-all shadow-sm">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-medo-navy text-white mt-auto pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-medo-green rounded flex items-center justify-center text-white font-bold text-xl">M</div>
            <span className="text-xl font-bold tracking-tight">MEDO</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Revolutionizing the African marketplace by connecting local businesses with a global audience. Secure, fast, and reliable.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About MEDO</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Safety Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Get the latest updates on new arrivals and sales.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-medo-green w-full" />
            <button className="bg-medo-green px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1E7E34] transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} MEDO Marketplace. All rights reserved.
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
