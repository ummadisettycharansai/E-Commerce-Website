import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { cartApi } from '../../api/cart';
import { useAuthStore } from '../../store/authStore';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQty, total } = useCartStore();
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

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={toggleCart} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2"><ShoppingBag size={20} />Cart ({items.length})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
              <p>Your cart is empty</p>
              <Link to="/shop" onClick={toggleCart} className="text-accent text-sm hover:underline mt-2 block">Start Shopping</Link>
            </div>
          ) : items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                <p className="text-xs text-gray-500">{item.size} · {item.color}</p>
                <p className="text-sm font-bold text-accent mt-1">${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => handleQty(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded"><Minus size={14} /></button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <button onClick={() => handleQty(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded"><Plus size={14} /></button>
                  <button onClick={() => handleRemove(item.id)} className="ml-auto p-1 text-red-400 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={toggleCart} className="block w-full bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors">Checkout</Link>
            <Link to="/cart" onClick={toggleCart} className="block w-full text-center text-sm text-gray-500 hover:text-primary">View Cart</Link>
          </div>
        )}
      </div>
    </>
  );
}
