import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightElement, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400',
              'transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent',
              'dark:bg-ink-800 dark:text-ink-50 dark:placeholder:text-ink-500',
              leftIcon ? 'pl-10' : '',
              rightElement ? 'pr-10' : '',
              error ? 'border-rose-400 focus:ring-rose-400' : 'border-ink-200 dark:border-ink-700',
              className,
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2">{rightElement}</span>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-rose-500">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="mt-1.5 text-xs text-ink-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
