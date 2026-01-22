
import React from 'react';
import { useApp } from '../AppContext';
import { AdClass, Product } from '../types';
import { CATEGORIES } from '../constants';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useApp();
  
  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden relative flex flex-col">
      {product.active_ad === AdClass.CLA_3 && (
        <span className="absolute top-3 left-3 bg-medo-navy text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase tracking-widest shadow-md">Sponsored</span>
      )}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-red-600 font-bold px-4 py-1 rounded-full text-sm shadow-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold text-medo-green uppercase tracking-wider">{product.category}</span>
          {product.active_ad === AdClass.CLA_2 && <span className="text-[10px] font-medium text-orange-500 flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> Featured</span>}
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-medo-green transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-medo-navy">₦{product.price.toLocaleString()}</span>
          <button 
            disabled={product.stock_quantity === 0}
            onClick={() => addToCart(product)}
            className="p-2 bg-medo-green text-white rounded-lg hover:bg-[#1E7E34] transition-all disabled:opacity-50 disabled:hover:bg-medo-green"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const { products } = useApp();
  
  const spotlightProducts = products.filter(p => p.active_ad === AdClass.CLA_3 && p.is_active);
  const featuredProducts = products.filter(p => p.active_ad === AdClass.CLA_2 && p.is_active);
  const recentProducts = products.filter(p => p.is_active).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section / Premium Spotlight */}
      <section className="relative h-[450px] lg:h-[550px] bg-medo-navy overflow-hidden">
        {spotlightProducts.length > 0 ? (
          <div className="h-full">
            {spotlightProducts.slice(0, 1).map(p => (
              <div key={p.id} className="h-full relative flex items-center">
                <div className="absolute inset-0 z-0">
                  <img src={p.image_url} className="w-full h-full object-cover opacity-30" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-r from-medo-navy via-medo-navy/80 to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                  <div className="max-w-2xl space-y-6">
                    <span className="inline-block bg-medo-green text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest shadow-lg">New Arrival &middot; Sponsored</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">{p.name}</h1>
                    <p className="text-lg text-gray-300 line-clamp-3">{p.description}</p>
                    <div className="flex items-center gap-6">
                      <span className="text-4xl font-bold text-medo-green">₦{p.price.toLocaleString()}</span>
                      <a href={`#/product/${p.id}`} className="px-8 py-3 bg-medo-green hover:bg-[#1E7E34] text-white font-bold rounded-lg transition-all shadow-xl hover:-translate-y-1">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-medo-navy to-[#1a3a63]">
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-extrabold text-white">Welcome to MEDO</h1>
              <p className="text-xl text-gray-300 max-w-lg mx-auto">Explore high-quality products from top African sellers. Fast shipping and secure payments.</p>
              <a href="#/products" className="inline-block px-10 py-4 bg-medo-green hover:bg-[#1E7E34] text-white font-bold rounded-lg shadow-lg">Browse Marketplace</a>
            </div>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-medo-navy">Popular Categories</h2>
            <p className="text-gray-500 mt-2">Find exactly what you're looking for</p>
          </div>
          <a href="#/categories" className="text-medo-green font-semibold hover:underline flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map(cat => (
            <a key={cat} href={`#/category/${cat}`} className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center gap-3 hover:shadow-lg hover:border-medo-green transition-all group">
              <div className="w-12 h-12 bg-medo-green/10 text-medo-green rounded-full flex items-center justify-center group-hover:bg-medo-green group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <span className="text-sm font-semibold text-center">{cat}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-medo-green/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-medo-navy">Featured Selection</h2>
                <p className="text-gray-500 mt-2">Top picks from our curated sellers</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Recent / All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-medo-navy">New Arrivals</h2>
            <p className="text-gray-500 mt-2">Recently added to our marketplace</p>
          </div>
          <a href="#/products" className="px-6 py-2 border-2 border-medo-green text-medo-green font-bold rounded-lg hover:bg-medo-green hover:text-white transition-all">Shop All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recentProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};
