import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { OrderStatusCount } from '@/types';

const statusColors: Record<string, string> = {
  pending: '#F59E0B',
  processing: '#4F46E5',
  fulfilled: '#14B8A6',
  cancelled: '#E11D48',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  fulfilled: 'Fulfilled',
  cancelled: 'Cancelled',
};

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-xs shadow-card-hover dark:border-ink-700 dark:bg-ink-800">
      <p className="flex items-center gap-1.5 text-ink-500 dark:text-ink-300">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.payload.fill }} />
        {statusLabels[item.payload.status]}: <span className="font-medium text-ink-800 dark:text-ink-100">{item.value} orders</span>
      </p>
    </div>
  );
}

export function OrdersStatusChart({ data }: { data: OrderStatusCount[] }) {
  const chartData = data.map((d) => ({ ...d, label: statusLabels[d.status], fill: statusColors[d.status] }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barCategoryGap={28}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-ink-100 dark:stroke-ink-800" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9C9CB8' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9C9CB8' }} width={30} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={56}>
          {chartData.map((entry) => (
            <Cell key={entry.status} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
