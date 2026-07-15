import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'glass';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-400 shadow-sm disabled:hover:bg-brand-500',
  secondary:
    'bg-ink-100 text-ink-800 hover:bg-ink-200 focus-visible:ring-ink-300 dark:bg-ink-800 dark:text-ink-100 dark:hover:bg-ink-700',
  ghost:
    'bg-transparent text-ink-600 hover:bg-ink-100 focus-visible:ring-ink-300 dark:text-ink-300 dark:hover:bg-ink-800',
  outline:
    'bg-transparent border border-ink-200 text-ink-700 hover:bg-ink-50 focus-visible:ring-ink-300 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800',
  danger: 'bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-400 shadow-sm',
  glass: 'bg-white/15 text-white hover:bg-white/25 focus-visible:ring-white/50 backdrop-blur-sm',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
  lg: 'text-base px-5 py-3 gap-2 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-900',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
