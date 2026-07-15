import { useState } from 'react';
import { Menu, Search, Bell, LogOut, ChevronDown, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/utils/cn';

export function Topbar({ onMenuClick, title }: { onMenuClick: () => void; title: string }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink-100/80 bg-white/85 px-4 py-3 backdrop-blur-xl dark:border-ink-800/80 dark:bg-ink-900/85 sm:px-6 transition-all duration-200">
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-700 lg:hidden dark:hover:bg-ink-800 dark:hover:text-ink-200"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <div className="hidden sm:block">
        <h1 className="font-display text-lg font-bold text-ink-900 dark:text-ink-50 leading-tight">{title}</h1>
        <p className="text-[11px] text-ink-400 dark:text-ink-600 leading-tight hidden md:block">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:flex-none sm:gap-3">
        {/* Search */}
        <div
          className={cn(
            'relative hidden max-w-xs flex-1 sm:block transition-all duration-300',
            searchFocused ? 'max-w-sm' : 'max-w-xs',
          )}
        >
          <Search
            className={cn(
              'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200',
              searchFocused ? 'text-brand-500' : 'text-ink-400',
            )}
          />
          <input
            type="search"
            placeholder="Search anything…"
            aria-label="Search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={cn(
              'w-full rounded-xl border bg-ink-50/60 py-2 pl-9 pr-3 text-sm placeholder:text-ink-400 transition-all duration-200',
              'focus:outline-none focus:ring-2',
              searchFocused
                ? 'border-brand-400 bg-white ring-brand-400/25 dark:bg-ink-800 dark:border-brand-500'
                : 'border-ink-200 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-100',
            )}
          />
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-ink-500 transition-all duration-200 hover:bg-ink-100 hover:text-ink-700 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-200"
        >
          <Bell className="h-[18px] w-[18px]" />
          {/* Notification dot with pulse ring */}
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-ink-900" />
          </span>
        </button>

        <ThemeToggle className="hidden sm:inline-flex" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-ink-100 dark:hover:bg-ink-800"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-md shadow-brand-500/25 ring-2 ring-white dark:ring-ink-900">
              {user?.avatarInitials ?? 'NC'}
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal-400 ring-2 ring-white dark:ring-ink-900" />
            </span>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-ink-800 dark:text-ink-100 leading-tight max-w-[80px] truncate">{user?.name?.split(' ')[0]}</p>
              <p className="text-[10px] text-ink-400 dark:text-ink-500 leading-tight">Admin</p>
            </div>
            <ChevronDown className={cn('hidden h-3.5 w-3.5 text-ink-400 transition-transform duration-200 sm:block', menuOpen && 'rotate-180')} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} aria-hidden="true" />
              <div
                role="menu"
                className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1.5 shadow-[0_8px_40px_-8px_rgba(15,18,34,0.18)] dark:border-ink-800 dark:bg-ink-900 scale-in"
              >
                <div className="px-4 py-3 border-b border-ink-50 dark:border-ink-800">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                      {user?.avatarInitials ?? 'NC'}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-800 dark:text-ink-100">{user?.name}</p>
                      <p className="truncate text-xs text-ink-400">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    role="menuitem"
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-ink-600 transition-colors hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
                  >
                    <User className="h-4 w-4" />
                    Your profile
                  </button>
                  <button
                    role="menuitem"
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-ink-600 transition-colors hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </div>

                <div className="border-t border-ink-50 dark:border-ink-800 pt-1">
                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
