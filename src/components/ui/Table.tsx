import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { SortDirection } from '@/types';

export function Table({ className, children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full min-w-[640px] border-collapse text-left text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-ink-100 dark:border-ink-800">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-ink-100 dark:divide-ink-800">{children}</tbody>;
}

export function TableRow({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('transition-colors hover:bg-ink-50/60 dark:hover:bg-ink-800/40', className)} {...props}>
      {children}
    </tr>
  );
}

interface SortableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  active?: boolean;
  direction?: SortDirection;
  onSort?: () => void;
}

export function Th({ sortable, active, direction, onSort, className, children, ...props }: SortableThProps) {
  if (!sortable) {
    return (
      <th
        className={cn('whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-400', className)}
        {...props}
      >
        {children}
      </th>
    );
  }

  const Icon = active ? (direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <th
      className={cn('whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-400', className)}
      {...props}
    >
      <button
        onClick={onSort}
        className={cn(
          'flex items-center gap-1.5 hover:text-ink-700 dark:hover:text-ink-200',
          active && 'text-brand-600 dark:text-brand-400',
        )}
      >
        {children}
        <Icon className="h-3.5 w-3.5" />
      </button>
    </th>
  );
}

export function Td({ className, children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('whitespace-nowrap px-5 py-3.5 text-ink-700 dark:text-ink-200', className)} {...props}>
      {children}
    </td>
  );
}
