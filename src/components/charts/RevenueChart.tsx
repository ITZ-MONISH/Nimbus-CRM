import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { RevenuePoint } from '@/types';
import { formatCurrency, formatCompactNumber } from '@/utils/format';

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-xs shadow-card-hover dark:border-ink-700 dark:bg-ink-800">
      <p className="mb-1 font-medium text-ink-800 dark:text-ink-100">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-1.5 text-ink-500 dark:text-ink-300">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name}: <span className="font-medium text-ink-800 dark:text-ink-100">{formatCurrency(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-ink-100 dark:stroke-ink-800" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9C9CB8' }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: '#9C9CB8' }}
          tickFormatter={(v) => formatCompactNumber(v)}
          width={44}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4F46E5" strokeWidth={2.5} fill="url(#revenueFill)" />
        <Line
          type="monotone"
          dataKey="target"
          name="Target"
          stroke="#14B8A6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
