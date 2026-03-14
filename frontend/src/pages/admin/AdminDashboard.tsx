import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../api/cart';
import DashboardCard from '../../components/admin/DashboardCard';
import OrderStatusBadge from '../../components/ui/OrderStatusBadge';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-dashboard'], queryFn: adminApi.getDashboard });

  if (isLoading) return <div className="animate-pulse space-y-6"><div className="grid grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}</div></div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Revenue" value={`$${data?.revenue?.toFixed(2) || '0.00'}`} icon={<DollarSign size={22} />} color="bg-green-500" />
        <DashboardCard title="Total Orders" value={data?.orders || 0} icon={<ShoppingBag size={22} />} color="bg-blue-500" />
        <DashboardCard title="Customers" value={data?.users || 0} icon={<Users size={22} />} color="bg-purple-500" />
        <DashboardCard title="Top Products" value={data?.topProducts?.length || 0} icon={<TrendingUp size={22} />} color="bg-accent" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {data?.recentOrders?.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{order.user?.name}</p>
                  <p className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold mb-4">Top Products</h2>
          <div className="space-y-3">
            {data?.topProducts?.map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 text-sm">
                <img src={p.images?.[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium line-clamp-1">{p.name}</p>
                  <p className="text-gray-500 text-xs">${p.price?.toFixed(2)}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{p.sold} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold mb-4">Orders by Status</h2>
        <div className="flex flex-wrap gap-3">
          {data?.ordersByStatus?.map((s: any) => (
            <div key={s.status} className="flex items-center gap-2">
              <OrderStatusBadge status={s.status} />
              <span className="text-sm font-medium">{s._count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
