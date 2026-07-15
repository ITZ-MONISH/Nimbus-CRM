import type { KpiSummary, OrderStatusCount, RevenuePoint } from '@/types';
import { orders } from './orders';

export const revenueSeries: RevenuePoint[] = [
  { month: 'Jan', revenue: 42500, target: 40000 },
  { month: 'Feb', revenue: 46800, target: 42000 },
  { month: 'Mar', revenue: 51200, target: 45000 },
  { month: 'Apr', revenue: 49600, target: 48000 },
  { month: 'May', revenue: 58300, target: 50000 },
  { month: 'Jun', revenue: 63900, target: 55000 },
  { month: 'Jul', revenue: 61200, target: 58000 },
];

export const orderStatusCounts: OrderStatusCount[] = (['pending', 'processing', 'fulfilled', 'cancelled'] as const).map(
  (status) => ({
    status,
    count: orders.filter((o) => o.status === status).length,
  }),
);

export const kpiSummary: KpiSummary = {
  totalRevenue: 373_500,
  revenueChange: 12.4,
  activeCustomers: 214,
  activeCustomersChange: 4.8,
  newCustomers: 18,
  newCustomersChange: -2.1,
  monthlyOrders: orders.length,
  monthlyOrdersChange: 8.6,
};

export const kpiSparklines = {
  totalRevenue: [38, 42, 40, 46, 51, 49, 58, 63, 61, 68, 64, 71],
  activeCustomers: [180, 186, 190, 195, 198, 201, 205, 206, 209, 210, 212, 214],
  newCustomers: [22, 19, 24, 17, 20, 18, 21, 16, 19, 15, 17, 18],
  monthlyOrders: [24, 27, 22, 29, 31, 28, 33, 30, 34, 32, 35, 36],
};
