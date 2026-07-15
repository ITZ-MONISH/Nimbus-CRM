import { ArrowUpRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/format';

export function WelcomeBanner({
  name,
  totalRevenue,
  revenueChange,
}: {
  name?: string;
  totalRevenue: number;
  revenueChange: number;
}) {
  const isPositive = revenueChange >= 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-7 text-white shadow-xl shadow-brand-500/20 sm:p-9 animate-in">
      {/* Background image overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-cover bg-center bg-no-repeat opacity-10 mix-blend-luminosity"
        style={{ backgroundImage: 'url(/dashboard_illustration.png)' }}
      />

      {/* Animated glow blobs */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-teal-400/25 blur-3xl animate-float-delayed" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-48 w-48 rounded-full bg-brand-300/20 blur-2xl animate-float" />

      {/* Animated gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        {/* Left: copy */}
        <div className="max-w-xl">
          {/* Status pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
            </span>
            <Zap className="h-3.5 w-3.5 text-amber-300" />
            Business is trending up this month
          </span>

          <h2 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl xl:text-4xl">
            Welcome back{name ? `, ${name.split(' ')[0]}` : ''} 👋
          </h2>

          <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            You've generated{' '}
            <span className="font-bold text-white underline decoration-white/30 decoration-wavy underline-offset-2">
              {formatCurrency(totalRevenue)}
            </span>{' '}
            in revenue with a{' '}
            <span
              className={`inline-flex items-center gap-1 font-bold ${isPositive ? 'text-teal-200' : 'text-rose-200'}`}
            >
              <TrendingUp className="h-4 w-4" />
              {revenueChange >= 0 ? '+' : ''}{revenueChange}%
            </span>{' '}
            swing versus last month.
          </p>

          {/* Quick stats row */}
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: 'This Quarter', value: '↑ Ahead of target' },
              { label: 'Pipeline', value: '87 active deals' },
              { label: 'Conversion', value: '34.2% close rate' },
            ].map(({ label, value }) => (
              <div key={label} className="glass rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] font-medium text-white/55 uppercase tracking-wider">{label}</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: illustration + CTA */}
        <div className="flex shrink-0 flex-col items-end gap-4">
          {/* Illustration */}
          <div className="hidden h-32 w-52 overflow-hidden rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm xl:block animate-float">
            <img
              src="/dashboard_illustration.png"
              alt="Analytics illustration"
              className="h-full w-full object-cover object-center opacity-90"
            />
          </div>

          <Button
            variant="glass"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
            className="!rounded-xl font-semibold shadow-md"
          >
            View full report
          </Button>
        </div>
      </div>

      {/* Bottom sparkle strip */}
      <div className="relative mt-5 flex items-center gap-2 border-t border-white/15 pt-4">
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        <p className="text-xs text-white/60">
          Snapshot updated just now · Next report in <span className="font-semibold text-white/85">3 hours</span>
        </p>
      </div>
    </div>
  );
}
