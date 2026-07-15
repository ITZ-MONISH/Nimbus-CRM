import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, pageSize }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-ink-100 px-5 py-4 dark:border-ink-800 sm:flex-row">
      <p className="text-sm text-ink-500 dark:text-ink-400">
        Showing <span className="font-medium text-ink-700 dark:text-ink-200">{start}-{end}</span> of{' '}
        <span className="font-medium text-ink-700 dark:text-ink-200">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((page, i) => {
          const prevPage = pages[i - 1];
          const showEllipsis = prevPage && page - prevPage > 1;
          return (
            <span key={page} className="flex items-center">
              {showEllipsis && <span className="px-1.5 text-sm text-ink-400">…</span>}
              <button
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={cn(
                  'h-8 min-w-8 rounded-lg px-2 text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-brand-500 text-white'
                    : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
                )}
              >
                {page}
              </button>
            </span>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-ink-400 dark:hover:bg-ink-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
