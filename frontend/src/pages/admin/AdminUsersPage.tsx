import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/cart';
import AdminTable from '../../components/admin/AdminTable';

export default function AdminUsersPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({ queryKey: ['admin-users', page], queryFn: () => adminApi.getUsers({ page, limit: 20 }) });

  const updateRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => adminApi.updateUserRole(id, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const columns = [
    { key: 'name', label: 'Name', render: (r: any) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">{r.name[0]}</div>
        <div><p className="font-medium text-sm">{r.name}</p><p className="text-xs text-gray-500">{r.email}</p></div>
      </div>
    )},
    { key: 'role', label: 'Role', render: (r: any) => (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{r.role}</span>
    )},
    { key: 'orders', label: 'Orders', render: (r: any) => r._count?.orders || 0 },
    { key: 'createdAt', label: 'Joined', render: (r: any) => new Date(r.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Change Role', render: (r: any) => (
      <select value={r.role} onChange={(e) => updateRole.mutate({ id: r.id, role: e.target.value })} className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-primary">
        <option value="CUSTOMER">CUSTOMER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
    )},
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="card p-6">
        <AdminTable columns={columns} data={data?.users || []} loading={isLoading} />
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
