import { useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import { useCustomerStore } from '@/store/customerStore';
import { useTableControls } from '@/hooks/useTableControls';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableHead, TableBody, TableRow, Th, Td } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { CustomerStatusBadge } from '@/components/customers/StatusBadge';
import { formatCurrency, formatDate } from '@/utils/format';
import type { Customer } from '@/types';

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Lead', value: 'lead' },
  { label: 'Churned', value: 'churned' },
];

export function CustomersPage() {
  const { customers, isLoading, fetchCustomers } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

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
  } = useTableControls<Customer>({
    data: customers,
    searchKeys: ['name', 'email'],
    initialSort: { key: 'name', direction: 'asc' },
    pageSize: 8,
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">Customers</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{customers.length} total customers in your workspace</p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-ink-100 p-5 dark:border-ink-800 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by name or email…"
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search customers"
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
            icon={Users}
            title="No customers found"
            description="Try adjusting your search or filter to find who you're looking for."
          />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <Th sortable active={sort?.key === 'name'} direction={sort?.direction} onSort={() => toggleSort('name')}>
                    Customer
                  </Th>
                  <Th>Company</Th>
                  <Th sortable active={sort?.key === 'status'} direction={sort?.direction} onSort={() => toggleSort('status')}>
                    Status
                  </Th>
                  <Th sortable active={sort?.key === 'revenue'} direction={sort?.direction} onSort={() => toggleSort('revenue')}>
                    Revenue
                  </Th>
                  <Th>Orders</Th>
                  <Th>Joined</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((customer) => (
                  <TableRow key={customer.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                          {customer.avatarInitials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink-900 dark:text-ink-50">{customer.name}</p>
                          <p className="truncate text-xs text-ink-400">{customer.email}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>{customer.company}</Td>
                    <Td>
                      <CustomerStatusBadge status={customer.status} />
                    </Td>
                    <Td className="font-mono text-xs">{formatCurrency(customer.revenue)}</Td>
                    <Td>{customer.orders}</Td>
                    <Td className="text-ink-400">{formatDate(customer.joinedAt)}</Td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filteredCount} pageSize={8} />
          </>
        )}
      </Card>
    </div>
  );
}
