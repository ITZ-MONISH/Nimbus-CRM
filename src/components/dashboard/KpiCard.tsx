import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
  accent: 'brand' | 'teal' | 'amber' | 'rose';
  sparkline?: number[];
}

const accentConfig = {
  brand: {
    iconBg: 'bg-brand-500/15 dark:bg-brand-500/20',
    iconText: 'text-brand-600 dark:text-brand-300',
    glow: 'rgba(79, 70, 229, 0.18)',
    glowHover: 'rgba(79, 70, 229, 0.32)',
    blob: 'bg-brand-500',
    ring: 'ring-brand-500/20',
    gradFrom: '#4F46E5',
  },
  teal: {
    iconBg: 'bg-teal-500/15 dark:bg-teal-500/20',
    iconText: 'text-teal-600 dark:text-teal-300',
    glow: 'rgba(20, 184, 166, 0.18)',
    glowHover: 'rgba(20, 184, 166, 0.32)',
    blob: 'bg-teal-500',
    ring: 'ring-teal-500/20',
    gradFrom: '#14B8A6',
  },
  amber: {
    iconBg: 'bg-amber-500/15 dark:bg-amber-500/15',
    iconText: 'text-amber-600 dark:text-amber-300',
    glow: 'rgba(245, 158, 11, 0.18)',
    glowHover: 'rgba(245, 158, 11, 0.32)',
    blob: 'bg-amber-500',
    ring: 'ring-amber-500/20',
    gradFrom: '#F59E0B',
  },
  rose: {
    iconBg: 'bg-rose-500/15 dark:bg-rose-500/15',
    iconText: 'text-rose-600 dark:text-rose-300',
    glow: 'rgba(225, 29, 72, 0.18)',
    glowHover: 'rgba(225, 29, 72, 0.32)',
    blob: 'bg-rose-500',
    ring: 'ring-rose-500/20',
    gradFrom: '#E11D48',
  },
};

const sparkColors = {
  brand: '#4F46E5',
  teal: '#14B8A6',
  amber: '#F59E0B',
  rose: '#E11D48',
};

export function KpiCard({ label, value, change, icon: Icon, accent, sparkline }: KpiCardProps) {
  const isPositive = change >= 0;
  const sparkData = (sparkline ?? []).map((v, i) => ({ i, v }));
  const cfg = accentConfig[accent];

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900 animate-in"
      style={{
        boxShadow: `0 1px 2px rgba(15,18,34,0.04), 0 8px 24px -8px ${cfg.glow}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 4px 12px rgba(15,18,34,0.06), 0 16px 40px -12px ${cfg.glowHover}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 1px 2px rgba(15,18,34,0.04), 0 8px 24px -8px ${cfg.glow}`;
      }}
    >
      {/* Decorative accent blob */}
      <div
        className={cn(
          'pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.22]',
          cfg.blob,
        )}
      />
      {/* Secondary blob bottom-left */}
      <div
        className={cn(
          'pointer-events-none absolute -bottom-8 -left-4 h-24 w-24 rounded-full opacity-[0.07] blur-xl transition-opacity duration-300 group-hover:opacity-[0.14]',
          cfg.blob,
        )}
      />

      {/* Top row: label + icon */}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">{label}</p>
        </div>
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110',
            cfg.iconBg,
            cfg.iconText,
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>

      {/* Value */}
      <p className="relative mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50 fade-in">
        {value}
      </p>

      {/* Bottom: change badge + sparkline */}
      <div className="relative mt-4 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
              isPositive
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-500/12 dark:text-teal-400'
                : 'bg-rose-50 text-rose-500 dark:bg-rose-500/12 dark:text-rose-400',
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isPositive ? '+' : ''}{change}%
          </span>
          <p className="text-[10px] text-ink-400 dark:text-ink-600">vs last month</p>
        </div>

        {sparkData.length > 0 && (
          <div className="h-11 w-24 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`spark-${accent}-${label.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sparkColors[accent]} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={sparkColors[accent]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={sparkColors[accent]}
                  strokeWidth={2.5}
                  fill={`url(#spark-${accent}-${label.replace(/\s+/g, '')})`}
                  isAnimationActive={false}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(to right, ${cfg.gradFrom}, transparent)` }}
      />
    </div>
  );
}
