
import { Product, User, UserRole, AdClass } from './types';

export const COLORS = {
  PRIMARY: '#28A745',
  PRIMARY_DARK: '#1E7E34',
  PRIMARY_LIGHT: '#EAF7EE',
  NAVY: '#0B1F3A',
  NAVY_LIGHT: '#F1F5FF',
  GRAY_LIGHT: '#F8F9FA',
  BORDER: '#E5E7EB',
  TEXT: '#111827',
  TEXT_MUTED: '#6B7280'
};

export const CATEGORIES = [
  "Electronics", "Fashion", "Home & Garden", "Health & Beauty", "Groceries", "Sports", "Automotive"
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    seller_id: 's1',
    seller_name: 'TechHub Ltd',
    name: 'UltraWide Monitor 34"',
    description: 'Immersive curved display for productivity and gaming. 144Hz refresh rate, 1ms response time.',
    price: 450000,
    stock_quantity: 15,
    image_url: 'https://picsum.photos/seed/monitor/600/400',
    category: 'Electronics',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active_ad: AdClass.CLA_3
  },
  {
    id: 'p2',
    seller_id: 's2',
    seller_name: 'FashionForward',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, breathable 100% organic cotton. Minimalist design for everyday comfort.',
    price: 15000,
    stock_quantity: 100,
    image_url: 'https://picsum.photos/seed/shirt/600/400',
    category: 'Fashion',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active_ad: AdClass.CLA_2
  },
  {
    id: 'p3',
    seller_id: 's1',
    seller_name: 'TechHub Ltd',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Industry leading noise cancellation with premium sound quality.',
    price: 220000,
    stock_quantity: 30,
    image_url: 'https://picsum.photos/seed/headphones/600/400',
    category: 'Electronics',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active_ad: AdClass.CLA_1
  },
  {
    id: 'p4',
    seller_id: 's3',
    seller_name: 'GreenGrocer',
    name: 'Organic Honey 500g',
    description: 'Pure, raw wildflower honey from sustainable apiaries.',
    price: 8500,
    stock_quantity: 200,
    image_url: 'https://picsum.photos/seed/honey/600/400',
    category: 'Groceries',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const INITIAL_USERS: User[] = [
  { id: 'admin1', name: 'Super Admin', email: 'admin@medo.com', role: UserRole.ADMIN },
  { id: 's1', name: 'TechHub Ltd', email: 'seller1@medo.com', role: UserRole.SELLER },
  { id: 's2', name: 'FashionForward', email: 'seller2@medo.com', role: UserRole.SELLER },
  { id: 'c1', name: 'John Doe', email: 'john@gmail.com', role: UserRole.CUSTOMER }
];

export const AD_PRICING = {
  [AdClass.CLA_1]: { name: 'Basic Boost', price7: 5000, price14: 9000 },
  [AdClass.CLA_2]: { name: 'Featured Product', price7: 15000, price14: 25000, price30: 50000 },
  [AdClass.CLA_3]: { name: 'Premium Spotlight', price7: 40000, price30: 120000 },
};
