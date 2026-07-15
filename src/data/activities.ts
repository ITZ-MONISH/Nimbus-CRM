import type { ActivityItem } from '@/types';

export const activities: ActivityItem[] = [
  {
    id: 'ACT-001',
    type: 'order',
    message: 'placed a new order worth $2,340.00',
    actor: 'Ethan Brooks',
    timestamp: '2026-07-14T08:12:00Z',
  },
  {
    id: 'ACT-002',
    type: 'payment',
    message: 'payment received for invoice #INV-2291',
    actor: 'Samuel Ortiz',
    timestamp: '2026-07-14T06:45:00Z',
  },
  {
    id: 'ACT-003',
    type: 'customer',
    message: 'was added as a new lead',
    actor: 'Clara Dunmore',
    timestamp: '2026-07-13T22:03:00Z',
  },
  {
    id: 'ACT-004',
    type: 'alert',
    message: 'subscription renewal failed — card declined',
    actor: 'Kai Sorensen',
    timestamp: '2026-07-13T19:30:00Z',
  },
  {
    id: 'ACT-005',
    type: 'note',
    message: 'left a note on the Ridgeline Co account',
    actor: 'Marcus Webb',
    timestamp: '2026-07-13T16:12:00Z',
  },
  {
    id: 'ACT-006',
    type: 'order',
    message: 'order #ORD-1058 marked as fulfilled',
    actor: 'Ruth Ademola',
    timestamp: '2026-07-13T11:52:00Z',
  },
  {
    id: 'ACT-007',
    type: 'customer',
    message: 'upgraded to the Growth plan',
    actor: 'Isabel Marsh',
    timestamp: '2026-07-12T20:18:00Z',
  },
  {
    id: 'ACT-008',
    type: 'payment',
    message: 'refund issued for order #ORD-1049',
    actor: 'Hana Yoshida',
    timestamp: '2026-07-12T14:41:00Z',
  },
];
