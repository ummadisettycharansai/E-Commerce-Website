import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/cart';
import AdminTable from '../../components/admin/AdminTable';
import OrderStatusBadge from '../../components/ui/OrderStatusBadge';

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

export default function AdminOrdersPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading } = useQuery({ queryKey: ['admin-orders', page, statusFilter], queryFn: () => adminApi.getOrders({ page, limit: 20, status: statusFilter || undefined }) });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminApi.updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-orders'] }),
  });

  const columns = [
    { key: 'id', label: 'Order ID', render: (r: any) => <span className="font-mono text-xs">#{r.id.slice(-8).toUpperCase()}</span> },
    { key: 'user', label: 'Customer', render: (r: any) => <div><p className="font-medium text-sm">{r.user?.name}</p><p className="text-xs text-gray-500">{r.user?.email}</p></div> },
    { key: 'total', label: 'Total', render: (r: any) => <span className="font-bold">${r.total.toFixed(2)}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <OrderStatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Date', render: (r: any) => new Date(r.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Update Status', render: (r: any) => (
      <select value={r.status} onChange={(e) => updateStatus.mutate({ id: r.id, status: e.target.value })} className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-primary">
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="card p-6">
        <AdminTable columns={columns} data={data?.orders || []} loading={isLoading} />
        {data && data.pages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded text-sm ${p === page ? 'bg-primary text-white' : 'border hover:border-primary'}`}>{p}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
