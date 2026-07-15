import { create } from 'zustand';
import type { Customer } from '@/types';
import { customers as mockCustomers } from '@/data/customers';

interface CustomerState {
  customers: Customer[];
  isLoading: boolean;
  hasLoaded: boolean;
  fetchCustomers: () => Promise<void>;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: [],
  isLoading: false,
  hasLoaded: false,
  fetchCustomers: async () => {
    if (get().hasLoaded) return;
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 700));
    set({ customers: mockCustomers, isLoading: false, hasLoaded: true });
  },
}));
