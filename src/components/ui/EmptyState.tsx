import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
        <Icon className="h-5 w-5 text-ink-400" />
      </div>
      <div>
        <p className="font-medium text-ink-800 dark:text-ink-100">{title}</p>
        <p className="mt-1 max-w-xs text-sm text-ink-500 dark:text-ink-400">{description}</p>
      </div>
      {action}
    </div>
  );
}
