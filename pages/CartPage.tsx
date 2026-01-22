
import React from 'react';
import { useApp } from '../AppContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 1500 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our products and find something you love!</p>
        <a href="#/" className="inline-block px-8 py-3 bg-medo-green text-white font-bold rounded-lg shadow-lg hover:bg-[#1E7E34] transition-all">Start Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-10 text-medo-navy">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Sold by {item.seller_name || 'MEDO Seller'}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-lg border">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-white shadow-sm hover:bg-gray-100"
                    >-</button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-white shadow-sm hover:bg-gray-100"
                    >+</button>
                  </div>
                  <span className="text-lg font-bold text-medo-navy">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-medo-navy">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold">₦{shipping.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-bold text-medo-navy">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <a href="#/checkout" className="block w-full text-center py-4 bg-medo-green text-white font-bold rounded-xl shadow-lg hover:bg-[#1E7E34] transition-all transform hover:-translate-y-1">
              Proceed to Checkout
            </a>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <svg className="w-4 h-4 text-medo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.835 1.503 9.359 4.07 13.04a11.97 11.97 0 0013.09 0c2.567-3.681 4.07-8.205 4.07-13.04z"></path></svg>
                <span>Secure Checkout powered by Paystack</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <svg className="w-4 h-4 text-medo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span>7-Day Return Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
