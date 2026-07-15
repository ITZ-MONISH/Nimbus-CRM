// ---------- Auth ----------
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Sales Manager' | 'Sales Rep';
  avatarInitials: string;
  company: string;
  joinedAt: string;
}

// ---------- Customers ----------
export type CustomerStatus = 'active' | 'lead' | 'churned';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  revenue: number;
  orders: number;
  joinedAt: string;
  avatarInitials: string;
}

// ---------- Orders ----------
export type OrderStatus = 'pending' | 'processing' | 'fulfilled' | 'cancelled';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  amount: number;
  items: number;
}

// ---------- Activity feed ----------
export type ActivityType = 'order' | 'customer' | 'payment' | 'note' | 'alert';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  actor: string;
  timestamp: string;
}

// ---------- Analytics ----------
export interface RevenuePoint {
  month: string;
  revenue: number;
  target: number;
}

export interface OrderStatusCount {
  status: OrderStatus;
  count: number;
}

export interface KpiSummary {
  totalRevenue: number;
  revenueChange: number;
  activeCustomers: number;
  activeCustomersChange: number;
  newCustomers: number;
  newCustomersChange: number;
  monthlyOrders: number;
  monthlyOrdersChange: number;
}

// ---------- Table helpers ----------
export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

// ---------- Toasts ----------
export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}
