import { useEffect, useState } from 'react';
import { Search, ShoppingCart, Pencil, Trash2 } from 'lucide-react';
import { useOrderStore } from '@/store/orderStore';
import { useToastStore } from '@/store/toastStore';
import { useTableControls } from '@/hooks/useTableControls';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableHead, TableBody, TableRow, Th, Td } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { OrderStatusBadge } from '@/components/customers/StatusBadge';
import { formatCurrency, formatDate } from '@/utils/format';
import type { Order, OrderStatus } from '@/types';

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Fulfilled', value: 'fulfilled' },
  { label: 'Cancelled', value: 'cancelled' },
];

const editStatusOptions = statusOptions.filter((o) => o.value !== 'all');

export function OrdersPage() {
  const { orders, isLoading, fetchOrders, updateOrderStatus, deleteOrder } = useOrderStore();
  const showToast = useToastStore((s) => s.showToast);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus>('pending');
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    toggleSort,
    page,
    setPage,
    totalPages,
    filteredCount,
    paginated,
  } = useTableControls<Order>({
    data: orders,
    searchKeys: ['id', 'customerName'],
    initialSort: { key: 'date', direction: 'desc' },
    pageSize: 8,
  });

  function openEditModal(order: Order) {
    setEditingOrder(order);
    setPendingStatus(order.status);
  }

  async function handleSaveStatus() {
    if (!editingOrder) return;
    setIsSaving(true);
    await updateOrderStatus(editingOrder.id, pendingStatus);
    setIsSaving(false);
    setEditingOrder(null);
    showToast(`Order ${editingOrder.id} updated`, 'success', `Status changed to “${pendingStatus}”.`);
  }

  async function handleDelete() {
    if (!deletingOrder) return;
    setIsDeleting(true);
    await deleteOrder(deletingOrder.id);
    setIsDeleting(false);
    setDeletingOrder(null);
    showToast(`Order ${deletingOrder.id} deleted`, 'info', 'This action cannot be undone.');
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">Orders</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{orders.length} orders this period</p>
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-ink-100 p-5 dark:border-ink-800 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by order ID or customer…"
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search orders"
            />
          </div>
          <div className="sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={8} cols={6} />
        ) : filteredCount === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="No orders found"
            description="Try a different search term or clear the status filter."
          />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <Th sortable active={sort?.key === 'id'} direction={sort?.direction} onSort={() => toggleSort('id')}>
                    Order ID
                  </Th>
                  <Th sortable active={sort?.key === 'customerName'} direction={sort?.direction} onSort={() => toggleSort('customerName')}>
                    Customer
                  </Th>
                  <Th sortable active={sort?.key === 'date'} direction={sort?.direction} onSort={() => toggleSort('date')}>
                    Date
                  </Th>
                  <Th>Status</Th>
                  <Th sortable active={sort?.key === 'amount'} direction={sort?.direction} onSort={() => toggleSort('amount')}>
                    Amount
                  </Th>
                  <Th className="text-right">Actions</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((order) => (
                  <TableRow key={order.id}>
                    <Td className="font-mono text-xs font-medium text-ink-900 dark:text-ink-50">{order.id}</Td>
                    <Td>{order.customerName}</Td>
                    <Td className="text-ink-400">{formatDate(order.date)}</Td>
                    <Td>
                      <OrderStatusBadge status={order.status} />
                    </Td>
                    <Td className="font-mono text-xs">{formatCurrency(order.amount)}</Td>
                    <Td>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(order)}
                          aria-label={`Edit status for order ${order.id}`}
                          className="rounded-lg p-2 text-ink-400 hover:bg-ink-100 hover:text-brand-600 dark:hover:bg-ink-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeletingOrder(order)}
                          aria-label={`Delete order ${order.id}`}
                          className="rounded-lg p-2 text-ink-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filteredCount} pageSize={8} />
          </>
        )}
      </Card>

      <Modal
        isOpen={!!editingOrder}
        onClose={() => setEditingOrder(null)}
        title={`Update order ${editingOrder?.id ?? ''}`}
        description={`Change the fulfillment status for ${editingOrder?.customerName ?? 'this order'}.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditingOrder(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStatus} isLoading={isSaving}>
              Save changes
            </Button>
          </>
        }
      >
        <Select label="Order status" options={editStatusOptions} value={pendingStatus} onChange={(e) => setPendingStatus(e.target.value as OrderStatus)} />
      </Modal>

      <Modal
        isOpen={!!deletingOrder}
        onClose={() => setDeletingOrder(null)}
        title="Delete this order?"
        description={`Order ${deletingOrder?.id ?? ''} will be permanently removed. This can't be undone.`}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeletingOrder(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
              Delete order
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-500 dark:text-ink-400">
          Deleting removes the order from reports and revenue totals immediately.
        </p>
      </Modal>
    </div>
  );
}
