
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { Product, AdClass, OrderStatus } from '../../types';
import { CATEGORIES, AD_PRICING } from '../../constants';

export const SellerDashboard: React.FC = () => {
  const { products, currentUser, orders, setProducts, addAd } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState<Product | null>(null);

  const sellerProducts = products.filter(p => p.seller_id === currentUser?.id);
  const sellerOrders = orders.filter(o => o.items.some(item => item.seller_id === currentUser?.id));
  
  const totalSales = sellerOrders
    .filter(o => o.status === OrderStatus.PAID || o.status === OrderStatus.COMPLETED)
    .reduce((acc, o) => {
      const sellerItems = o.items.filter(i => i.seller_id === currentUser?.id);
      return acc + sellerItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    }, 0);

  const activeAds = sellerProducts.filter(p => p.active_ad).length;

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: 'p' + Math.random().toString(36).substr(2, 9),
      seller_id: currentUser?.id || '',
      seller_name: currentUser?.name,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      stock_quantity: parseInt(formData.get('stock') as string),
      image_url: `https://picsum.photos/seed/${Math.random()}/600/400`,
      category: formData.get('category') as string,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    setIsAddModalOpen(false);
  };

  const handlePromote = (adClass: AdClass, days: number, price: number) => {
    if (!isAdModalOpen) return;
    addAd({
      id: 'ad' + Math.random().toString(36).substr(2, 9),
      product_id: isAdModalOpen.id,
      seller_id: currentUser?.id || '',
      ad_class: adClass,
      amount: price,
      duration_days: days,
      status: 'active',
      created_at: new Date().toISOString(),
    });
    setIsAdModalOpen(null);
    alert(`Promotion activated successfully for ₦${price.toLocaleString()}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-medo-navy">Seller Dashboard</h1>
          <p className="text-gray-500">Manage your business and track performance</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-medo-green text-white font-bold rounded-lg shadow-lg hover:bg-[#1E7E34] transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Total Products</p>
          <p className="text-4xl font-extrabold text-medo-navy">{sellerProducts.length}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Active Ads</p>
          <p className="text-4xl font-extrabold text-orange-500">{activeAds}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Platform Sales</p>
          <p className="text-4xl font-extrabold text-medo-green">₦{totalSales.toLocaleString()}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="font-bold text-medo-navy">Your Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Promotion</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sellerProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image_url} className="w-10 h-10 rounded object-cover" alt="" />
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock_quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.active_ad ? (
                      <span className="px-2 py-1 bg-medo-navy text-white rounded text-[10px] font-bold uppercase">{product.active_ad.replace('_', ' ')}</span>
                    ) : (
                      <button 
                        onClick={() => setIsAdModalOpen(product)}
                        className="text-xs font-bold text-medo-green hover:underline"
                      >
                        Boost Item
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                      <button onClick={() => setProducts(prev => prev.filter(p => p.id !== product.id))} className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-medo-navy">List New Product</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleAddProduct} className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                <input required name="name" type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-medo-green outline-none" placeholder="e.g. Premium Leather Bag" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                <select name="category" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-medo-green outline-none">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₦)</label>
                  <input required name="price" type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-medo-green outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock Quantity</label>
                  <input required name="stock" type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-medo-green outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea required name="description" rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-medo-green outline-none" placeholder="Tell customers more about your product..."></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-3 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-medo-green text-white font-bold rounded-lg hover:bg-[#1E7E34] transition-colors shadow-lg">List Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promotion Modal */}
      {isAdModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-medo-navy text-white">
              <div>
                <h2 className="text-xl font-bold">Boost "{isAdModalOpen.name}"</h2>
                <p className="text-gray-400 text-xs">Reach more customers instantly</p>
              </div>
              <button onClick={() => setIsAdModalOpen(null)} className="text-gray-300 hover:text-white">&times;</button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-100 rounded-2xl p-6 hover:border-medo-green transition-all flex flex-col h-full bg-gray-50">
                <h4 className="font-bold text-medo-navy mb-2">{AD_PRICING[AdClass.CLA_1].name}</h4>
                <p className="text-xs text-gray-500 mb-6 flex-grow">Appear higher in search and category listings.</p>
                <div className="space-y-2 mt-auto">
                  <button onClick={() => handlePromote(AdClass.CLA_1, 7, AD_PRICING[AdClass.CLA_1].price7)} className="w-full py-2 bg-medo-green text-white text-xs font-bold rounded-lg">₦{AD_PRICING[AdClass.CLA_1].price7.toLocaleString()} for 7 Days</button>
                  <button onClick={() => handlePromote(AdClass.CLA_1, 14, AD_PRICING[AdClass.CLA_1].price14)} className="w-full py-2 bg-white border border-medo-green text-medo-green text-xs font-bold rounded-lg">₦{AD_PRICING[AdClass.CLA_1].price14.toLocaleString()} for 14 Days</button>
                </div>
              </div>
              <div className="border border-medo-green bg-medo-green/5 rounded-2xl p-6 relative flex flex-col h-full ring-2 ring-medo-green">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-medo-green text-white px-3 py-1 rounded-full text-[10px] font-bold">POPULAR</span>
                <h4 className="font-bold text-medo-navy mb-2">{AD_PRICING[AdClass.CLA_2].name}</h4>
                <p className="text-xs text-gray-500 mb-6 flex-grow">Showcase on homepage "Featured Selection" section.</p>
                <div className="space-y-2 mt-auto">
                  <button onClick={() => handlePromote(AdClass.CLA_2, 7, AD_PRICING[AdClass.CLA_2].price7)} className="w-full py-2 bg-medo-green text-white text-xs font-bold rounded-lg">₦{AD_PRICING[AdClass.CLA_2].price7.toLocaleString()} for 7 Days</button>
                  <button onClick={() => handlePromote(AdClass.CLA_2, 30, AD_PRICING[AdClass.CLA_2].price30)} className="w-full py-2 bg-white border border-medo-green text-medo-green text-xs font-bold rounded-lg">₦{AD_PRICING[AdClass.CLA_2].price30.toLocaleString()} for 30 Days</button>
                </div>
              </div>
              <div className="border border-gray-100 rounded-2xl p-6 hover:border-medo-navy transition-all flex flex-col h-full bg-medo-navy/5">
                <h4 className="font-bold text-medo-navy mb-2">{AD_PRICING[AdClass.CLA_3].name}</h4>
                <p className="text-xs text-gray-500 mb-6 flex-grow">Premium placement in homepage Hero banner.</p>
                <div className="space-y-2 mt-auto">
                  <button onClick={() => handlePromote(AdClass.CLA_3, 7, AD_PRICING[AdClass.CLA_3].price7)} className="w-full py-2 bg-medo-navy text-white text-xs font-bold rounded-lg">₦{AD_PRICING[AdClass.CLA_3].price7.toLocaleString()} for 7 Days</button>
                  <button onClick={() => handlePromote(AdClass.CLA_3, 30, AD_PRICING[AdClass.CLA_3].price30)} className="w-full py-2 bg-white border border-medo-navy text-medo-navy text-xs font-bold rounded-lg">₦{AD_PRICING[AdClass.CLA_3].price30.toLocaleString()} for 30 Days</button>
                </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-gray-50 border-t flex items-center gap-2 text-[10px] text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Payment will be processed via your registered settlement account.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
