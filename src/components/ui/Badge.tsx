import { cn } from '@/utils/cn';

type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400',
  warning: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  danger: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
  neutral: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
  info: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize',
        toneClasses[tone],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
