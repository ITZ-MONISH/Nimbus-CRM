import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { cn } from '@/utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      className={cn(
        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200',
        isDark ? 'bg-brand-600' : 'bg-ink-200',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200',
          isDark && 'translate-x-7',
        )}
      >
        {isDark ? <Moon className="h-3.5 w-3.5 text-brand-600" /> : <Sun className="h-3.5 w-3.5 text-amber-500" />}
      </span>
    </button>
  );
}
