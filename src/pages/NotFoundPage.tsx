import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center dark:bg-ink-950">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
        <Compass className="h-5 w-5" />
      </span>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-50">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-500 dark:text-ink-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
