
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, CartItem, Order, UserRole, OrderStatus, AdRecord, AdClass } from './types';
import { INITIAL_PRODUCTS, INITIAL_USERS } from './constants';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  ads: AdRecord[];
  addAd: (ad: AdRecord) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('medo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('medo_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('medo_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('medo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('medo_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [ads, setAds] = useState<AdRecord[]>(() => {
    const saved = localStorage.getItem('medo_ads');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('medo_user', JSON.stringify(currentUser));
    localStorage.setItem('medo_products', JSON.stringify(products));
    localStorage.setItem('medo_users', JSON.stringify(users));
    localStorage.setItem('medo_cart', JSON.stringify(cart));
    localStorage.setItem('medo_orders', JSON.stringify(orders));
    localStorage.setItem('medo_ads', JSON.stringify(ads));
  }, [currentUser, products, users, cart, orders, ads]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const createOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    // Deduct stock
    setProducts(prev => prev.map(p => {
      const orderItem = order.items.find(item => item.product_id === p.id);
      if (orderItem) {
        return { ...p, stock_quantity: p.stock_quantity - orderItem.quantity };
      }
      return p;
    }));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addAd = (ad: AdRecord) => {
    setAds(prev => [ad, ...prev]);
    setProducts(prev => prev.map(p => p.id === ad.product_id ? { ...p, active_ad: ad.ad_class } : p));
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      products, setProducts,
      users, setUsers,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      orders, createOrder, updateOrderStatus,
      ads, addAd
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
