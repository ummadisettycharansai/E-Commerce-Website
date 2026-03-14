import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { cartApi } from '../api/cart';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore();
  const { token } = useAuthStore();

  const handleQty = async (id: string, qty: number) => {
    if (qty < 1) return;
    updateQty(id, qty);
    if (token) await cartApi.updateItem(id, qty);
  };

  const handleRemove = async (id: string) => {
    removeItem(id);
    if (token) await cartApi.removeItem(id);
  };

  if (!items.length) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
      <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add some items to get started</p>
      <Link to="/shop"><Button>Continue Shopping</Button></Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex gap-4">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-accent">{item.product.name}</Link>
                <p className="text-sm text-gray-500 mt-1">Size: {item.size} · Color: {item.color}</p>
                <p className="font-bold text-accent mt-1">${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => handleQty(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-50"><Minus size={14} /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => handleQty(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-50"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="text-red-400 hover:text-red-600 p-1.5"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${total().toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-green-600">{total() >= 75 ? 'Free' : '$9.99'}</span></div>
            <hr />
            <div className="flex justify-between font-bold text-base"><span>Total</span><span>${(total() + (total() >= 75 ? 0 : 9.99)).toFixed(2)}</span></div>
          </div>
          <Link to="/checkout"><Button className="w-full" size="lg">Proceed to Checkout</Button></Link>
          <Link to="/shop" className="block text-center text-sm text-gray-500 hover:text-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
