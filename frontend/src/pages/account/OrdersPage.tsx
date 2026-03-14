import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../../api/cart';
import { Link } from 'react-router-dom';
import OrderStatusBadge from '../../components/ui/OrderStatusBadge';
import Button from '../../components/ui/Button';

export default function OrdersPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: () => ordersApi.getOrders() });

  const cancel = useMutation({
    mutationFn: ordersApi.cancelOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });

  if (isLoading) return <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {!data?.orders?.length ? (
        <div className="text-center py-16 text-gray-500">
          <p>No orders yet</p>
          <Link to="/shop" className="text-accent hover:underline text-sm mt-2 block">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {data.orders.map((order: any) => (
            <div key={order.id} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-mono text-sm text-gray-500">#{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {order.items?.map((item: any) => (
                  <img key={item.id} src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                ))}
              </div>
              <div className="flex gap-3 mt-3">
                <Link to={`/account/orders/${order.id}`}><Button variant="outline" size="sm">View Details</Button></Link>
                {['PENDING', 'CONFIRMED'].includes(order.status) && (
                  <Button variant="ghost" size="sm" onClick={() => cancel.mutate(order.id)} loading={cancel.isPending} className="text-red-500 hover:bg-red-50">Cancel</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
