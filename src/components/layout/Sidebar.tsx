import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Settings, Cloud, X, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/customers', label: 'Customers', icon: Users, end: false },
  { to: '/orders', label: 'Orders', icon: ShoppingCart, end: false },
  { to: '/settings', label: 'Settings', icon: Settings, end: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-ink-100/80 bg-white transition-transform duration-300',
          'dark:border-ink-800 dark:bg-ink-900',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-ink-50 dark:border-ink-800/60">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-brand-500/30 animate-pulse-ring">
              <Cloud className="h-[18px] w-[18px]" />
            </span>
            <div>
              <span className="block font-display text-base font-bold text-ink-900 dark:text-ink-50 leading-tight">Nimbus</span>
              <span className="block text-[10px] font-medium text-ink-400 dark:text-ink-500 leading-tight">CRM Platform</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600 lg:hidden dark:hover:bg-ink-800 dark:hover:text-ink-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav label */}
        <p className="px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-widest text-ink-400 dark:text-ink-600">
          Navigation
        </p>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 pb-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brand-gradient text-white shadow-md shadow-brand-500/25'
                    : 'text-ink-500 hover:bg-ink-50 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800/80 dark:hover:text-ink-100',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-transparent text-ink-400 group-hover:bg-ink-100 group-hover:text-ink-600 dark:group-hover:bg-ink-700 dark:group-hover:text-ink-200',
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Plan card */}
        <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-brand-50 to-teal-50/50 p-4 dark:from-brand-500/10 dark:to-teal-500/5 border border-brand-100/60 dark:border-brand-500/15">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
            <p className="text-xs font-bold text-ink-700 dark:text-ink-300">Growth Plan</p>
          </div>
          <p className="text-xs text-ink-500 dark:text-ink-500">21 of 25 team seats used</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-ink-200 dark:bg-ink-700 overflow-hidden">
            <div
              className="h-1.5 rounded-full bg-brand-gradient transition-all duration-500"
              style={{ width: '84%' }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-ink-400 dark:text-ink-600">4 seats remaining · <a href="#" className="text-brand-500 font-semibold hover:underline">Upgrade</a></p>
        </div>

        {/* User section */}
        {user && (
          <div className="flex items-center gap-3 px-4 py-4 border-t border-ink-100 dark:border-ink-800/60">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-md shadow-brand-500/20">
              {user.avatarInitials ?? 'NC'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">{user.name}</p>
              <p className="truncate text-xs text-ink-400 dark:text-ink-500">{user.email}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
