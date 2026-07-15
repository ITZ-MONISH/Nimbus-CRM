import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    return (
      <div>
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-ink-900',
              'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent',
              'dark:border-ink-700 dark:bg-ink-800 dark:text-ink-50',
              className,
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
