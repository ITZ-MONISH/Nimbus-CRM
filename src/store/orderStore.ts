import { create } from 'zustand';
import type { Order, OrderStatus } from '@/types';
import { orders as mockOrders } from '@/data/orders';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  hasLoaded: boolean;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  hasLoaded: false,
  fetchOrders: async () => {
    if (get().hasLoaded) return;
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 700));
    set({ orders: mockOrders, isLoading: false, hasLoaded: true });
  },
  updateOrderStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  },
  deleteOrder: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    set((state) => ({ orders: state.orders.filter((o) => o.id !== id) }));
  },
}));
