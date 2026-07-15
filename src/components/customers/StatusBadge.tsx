import { Badge } from '@/components/ui/Badge';
import type { CustomerStatus, OrderStatus } from '@/types';

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const toneMap = { active: 'success', lead: 'info', churned: 'danger' } as const;
  return <Badge tone={toneMap[status]}>{status}</Badge>;
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const toneMap = {
    pending: 'warning',
    processing: 'info',
    fulfilled: 'success',
    cancelled: 'danger',
  } as const;
  return <Badge tone={toneMap[status]}>{status}</Badge>;
}
