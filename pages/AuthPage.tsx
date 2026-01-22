
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { UserRole } from '../types';

export const AuthPage: React.FC = () => {
  const { users, setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const user = users.find(u => u.email === email);
      if (user) {
        setCurrentUser(user);
        window.location.hash = user.role === UserRole.SELLER ? '#/seller' : '#/';
      } else {
        alert('Invalid credentials (Try: seller1@medo.com)');
      }
    } else {
      // Simple signup simulation
      const newUser = {
        id: 'u' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: UserRole.SELLER
      };
      setCurrentUser(newUser);
      window.location.hash = '#/seller';
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-medo-green rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg">M</div>
          <h2 className="text-3xl font-bold text-medo-navy">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-500 mt-2">{isLogin ? 'Sign in to manage your marketplace' : 'Join thousands of sellers on MEDO'}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border-gray-200 border-2 focus:border-medo-green focus:ring-0 transition-all outline-none" 
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border-gray-200 border-2 focus:border-medo-green focus:ring-0 transition-all outline-none" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 bg-medo-green text-white font-bold rounded-xl shadow-xl hover:bg-[#1E7E34] transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          {isLogin ? "Don't have a seller account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-medo-green font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-gray-400">Demo logins: seller1@medo.com, seller2@medo.com, admin@medo.com</p>
        </div>
      </div>
    </div>
  );
};
