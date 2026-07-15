import { useMemo, useState } from 'react';
import type { SortConfig, SortDirection } from '@/types';

interface UseTableControlsOptions<T> {
  data: T[];
  searchKeys: Array<keyof T>;
  initialSort?: SortConfig<T>;
  pageSize?: number;
}

export function useTableControls<T extends Record<string, any>>({
  data,
  searchKeys,
  initialSort,
  pageSize = 8,
}: UseTableControlsOptions<T>) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sort, setSort] = useState<SortConfig<T> | undefined>(initialSort);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = data;

    if (statusFilter !== 'all') {
      result = result.filter((item) => (item as any).status === statusFilter);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => String(item[key] ?? '').toLowerCase().includes(query)),
      );
    }

    if (sort) {
      result = [...result].sort((a, b) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        return sort.direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }

    return result;
  }, [data, search, statusFilter, sort, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(key: keyof T) {
    setSort((prev) => {
      if (prev?.key === key) {
        const nextDirection: SortDirection = prev.direction === 'asc' ? 'desc' : 'asc';
        return { key, direction: nextDirection };
      }
      return { key, direction: 'asc' };
    });
  }

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updateStatusFilter(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  return {
    search,
    setSearch: updateSearch,
    statusFilter,
    setStatusFilter: updateStatusFilter,
    sort,
    toggleSort,
    page: currentPage,
    setPage,
    totalPages,
    filteredCount: filtered.length,
    paginated,
  };
}
