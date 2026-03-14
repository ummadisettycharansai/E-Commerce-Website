import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../api/cart';
import { CheckCircle } from 'lucide-react';
import OrderStatusBadge from '../components/ui/OrderStatusBadge';

export default function OrderSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order } = useQuery({ queryKey: ['order', id], queryFn: () => ordersApi.getOrder(id!) });

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
      <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-8">Thank you for your purchase. We'll send you a confirmation email shortly.</p>

      {order && (
        <div className="card p-6 text-left mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-sm">{order.id}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="space-y-3">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                <div className="text-sm">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500">{item.size} · {item.color} · x{item.quantity}</p>
                </div>
                <p className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold"><span>Total</span><span>${order.total?.toFixed(2)}</span></div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <Link to="/account/orders" className="btn-outline">View Orders</Link>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
