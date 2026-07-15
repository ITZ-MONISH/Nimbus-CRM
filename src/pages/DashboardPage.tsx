import { DollarSign, Users, UserPlus, Package } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { OrdersStatusChart } from '@/components/charts/OrdersStatusChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { kpiSummary, kpiSparklines, orderStatusCounts, revenueSeries } from '@/data/analytics';
import { activities } from '@/data/activities';
import { formatCurrency, formatCompactNumber } from '@/utils/format';
import { useAuthStore } from '@/store/authStore';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user?.name} totalRevenue={kpiSummary.totalRevenue} revenueChange={kpiSummary.revenueChange} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Revenue"
          value={formatCurrency(kpiSummary.totalRevenue)}
          change={kpiSummary.revenueChange}
          icon={DollarSign}
          accent="brand"
          sparkline={kpiSparklines.totalRevenue}
        />
        <KpiCard
          label="Active Customers"
          value={formatCompactNumber(kpiSummary.activeCustomers)}
          change={kpiSummary.activeCustomersChange}
          icon={Users}
          accent="teal"
          sparkline={kpiSparklines.activeCustomers}
        />
        <KpiCard
          label="New Customers"
          value={formatCompactNumber(kpiSummary.newCustomers)}
          change={kpiSummary.newCustomersChange}
          icon={UserPlus}
          accent="amber"
          sparkline={kpiSparklines.newCustomers}
        />
        <KpiCard
          label="Monthly Orders"
          value={formatCompactNumber(kpiSummary.monthlyOrders)}
          change={kpiSummary.monthlyOrdersChange}
          icon={Package}
          accent="rose"
          sparkline={kpiSparklines.monthlyOrders}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Revenue overview</CardTitle>
              <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">Actuals vs. target, last 7 months</p>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueSeries} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by status</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersStatusChart data={orderStatusCounts} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed items={activities} />
        </CardContent>
      </Card>
    </div>
  );
}
