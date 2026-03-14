import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCartStore } from '../store/cartStore';

export default function CheckoutPage() {
  const { items, total } = useCartStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div className="card p-6 h-fit space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1 text-sm">
                  <p className="font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-gray-500">{item.size} · {item.color} · x{item.quantity}</p>
                  <p className="font-bold">${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
