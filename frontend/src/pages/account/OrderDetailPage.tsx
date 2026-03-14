import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../../api/cart';
import OrderStatusBadge from '../../components/ui/OrderStatusBadge';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useQuery({ queryKey: ['order', id], queryFn: () => ordersApi.getOrder(id!) });

  if (isLoading) return <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse"><div className="h-64 bg-gray-200 rounded-xl" /></div>;
  if (!order) return <div className="text-center py-16">Order not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/account/orders" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6"><ArrowLeft size={16} />Back to Orders</Link>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">#{order.id}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="card p-6 mb-4">
        <h2 className="font-semibold mb-4">Items</h2>
        <div className="space-y-4">
          {order.items?.map((item: any) => (
            <div key={item.id} className="flex gap-4">
              <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-accent">{item.product.name}</Link>
                <p className="text-sm text-gray-500">{item.size} · {item.color} · x{item.quantity}</p>
              </div>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
      </div>

      {order.address && (
        <div className="card p-6">
          <h2 className="font-semibold mb-3">Delivery Address</h2>
          <p className="text-sm">{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ''}</p>
          <p className="text-sm text-gray-500">{order.address.city}, {order.address.state} {order.address.zip}, {order.address.country}</p>
        </div>
      )}
    </div>
  );
}
