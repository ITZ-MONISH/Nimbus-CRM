import { ShoppingBag, UserPlus, CreditCard, StickyNote, AlertTriangle } from 'lucide-react';
import type { ActivityItem, ActivityType } from '@/types';
import { formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

const iconMap: Record<ActivityType, typeof ShoppingBag> = {
  order: ShoppingBag,
  customer: UserPlus,
  payment: CreditCard,
  note: StickyNote,
  alert: AlertTriangle,
};

const toneMap: Record<ActivityType, { bg: string; text: string; ring: string; glow: string }> = {
  order: {
    bg: 'bg-brand-50 dark:bg-brand-500/12',
    text: 'text-brand-600 dark:text-brand-300',
    ring: 'ring-brand-200 dark:ring-brand-500/25',
    glow: 'shadow-brand-200/50 dark:shadow-brand-500/20',
  },
  customer: {
    bg: 'bg-teal-50 dark:bg-teal-500/12',
    text: 'text-teal-600 dark:text-teal-400',
    ring: 'ring-teal-200 dark:ring-teal-500/25',
    glow: 'shadow-teal-200/50 dark:shadow-teal-500/20',
  },
  payment: {
    bg: 'bg-amber-50 dark:bg-amber-500/12',
    text: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-200 dark:ring-amber-500/25',
    glow: 'shadow-amber-200/50 dark:shadow-amber-500/20',
  },
  note: {
    bg: 'bg-ink-100 dark:bg-ink-800',
    text: 'text-ink-500 dark:text-ink-300',
    ring: 'ring-ink-200 dark:ring-ink-700',
    glow: '',
  },
  alert: {
    bg: 'bg-rose-50 dark:bg-rose-500/12',
    text: 'text-rose-600 dark:text-rose-400',
    ring: 'ring-rose-200 dark:ring-rose-500/25',
    glow: 'shadow-rose-200/50 dark:shadow-rose-500/20',
  },
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-0">
      {items.map((item, index) => {
        const Icon = iconMap[item.type];
        const tone = toneMap[item.type];
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <li
            key={item.id}
            className={cn(
              'group relative flex items-start gap-4 py-4 transition-colors duration-150',
              'hover:bg-ink-50/50 dark:hover:bg-ink-800/30',
              !isFirst && 'border-t border-ink-50 dark:border-ink-800/60',
            )}
          >
            {/* Timeline connector line */}
            {!isLast && (
              <div className="absolute left-[18px] top-14 bottom-0 w-px bg-gradient-to-b from-ink-200 to-transparent dark:from-ink-700" />
            )}

            {/* Icon badge */}
            <span
              className={cn(
                'relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 shadow-sm transition-transform duration-200 group-hover:scale-105',
                tone.bg,
                tone.text,
                tone.ring,
                tone.glow,
              )}
            >
              <Icon className="h-[15px] w-[15px]" />
              {/* Pulse ring for first (latest) item */}
              {isFirst && (
                <span className={cn('absolute inset-0 rounded-full ring-4 animate-ping opacity-20', tone.ring)} />
              )}
            </span>

            {/* Content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm text-ink-700 leading-snug dark:text-ink-200">
                <span className="font-semibold text-ink-900 dark:text-ink-50">{item.actor}</span>{' '}
                {item.message}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span
                  className={cn(
                    'inline-block h-1.5 w-1.5 rounded-full',
                    tone.bg.replace('bg-', 'bg-').replace('/12', '').replace('/50', ''),
                    tone.text,
                    // Use a simpler dot
                    'opacity-70',
                  )}
                  style={{ background: 'currentColor' }}
                />
                <p className="text-xs text-ink-400 dark:text-ink-500">{formatRelativeTime(item.timestamp)}</p>
                {isFirst && (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-600 dark:bg-teal-500/12 dark:text-teal-400">
                    Just now
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
