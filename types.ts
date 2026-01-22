
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum AdClass {
  CLA_1 = 'CLA_1', // Basic Boost
  CLA_2 = 'CLA_2', // Featured
  CLA_3 = 'CLA_3'  // Premium Spotlight
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: 'active' | 'suspended';
}

export interface Product {
  id: string;
  seller_id: string;
  seller_name?: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  active_ad?: AdClass;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  id: string;
  product_id: string;
  seller_id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Order {
  id: string;
  customer_id: string;
  customer_name: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface AdRecord {
  id: string;
  product_id: string;
  seller_id: string;
  ad_class: AdClass;
  amount: number;
  duration_days: number;
  status: 'active' | 'expired';
  created_at: string;
}
