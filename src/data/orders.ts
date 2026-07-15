import type { Order, OrderStatus } from '@/types';
import { customers } from './customers';

const statuses: OrderStatus[] = ['pending', 'processing', 'fulfilled', 'cancelled'];

const dates = [
  '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05',
  '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10',
  '2026-07-11', '2026-07-12', '2026-07-13', '2026-06-28', '2026-06-25',
  '2026-06-20', '2026-06-15', '2026-06-10', '2026-06-05', '2026-06-01',
];

function seedRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const rand = seedRandom(42);

export const orders: Order[] = Array.from({ length: 36 }, (_, i) => {
  const customer = customers[i % customers.length];
  const status = statuses[Math.floor(rand() * statuses.length)];
  const amount = Math.round((150 + rand() * 4200) * 100) / 100;
  const items = Math.ceil(rand() * 8);
  const date = dates[i % dates.length];
  return {
    id: `ORD-${String(1042 + i)}`,
    customerId: customer.id,
    customerName: customer.name,
    date,
    status,
    amount,
    items,
  };
});
