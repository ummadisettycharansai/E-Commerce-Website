import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ChevronRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/mockData';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = () => {
    if (promoCode === 'MALL10') {
      setDiscount(subtotal * 0.1);
      setPromoError('');
    } else if (promoCode === 'FLAT200') {
      setDiscount(200);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setDiscount(0);
    }
  };

  const shipping = subtotal > 999 ? 0 : 150;
  const total = subtotal - discount + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-charcoal/5">
          <ShoppingBag size={48} className="text-charcoal/20" />
        </div>
        <h2 className="text-3xl font-extrabold text-navy">Your Bag is Empty</h2>
        <p className="text-charcoal/50 mt-4 max-w-sm mx-auto">Looks like you haven't added anything yet. Explore our latest collection to find your style.</p>
        <Link to="/shop" className="mt-8 btn-primary inline-flex items-center">
          CONTINUE SHOPPING <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center space-x-2 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-8">
          <Link to="/">Home</Link>
          <ChevronRight size={10} />
          <span className="text-navy">Shopping Bag</span>
        </div>

        <h1 className="text-4xl font-extrabold text-navy mb-10">Shopping Bag <span className="text-charcoal/20">({cart.length})</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[8px] shadow-sm overflow-hidden border border-charcoal/5">
              <div className="hidden md:grid grid-cols-5 gap-4 p-6 border-b border-charcoal/5 text-xs font-bold uppercase tracking-widest text-charcoal/40">
                <div className="col-span-2">Product Piece</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
                <div className="text-right">Action</div>
              </div>
              <div className="divide-y divide-charcoal/5">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.variant.size}-${item.variant.color}`} className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    <div className="col-span-2 flex items-center space-x-6">
                      <div className="w-24 h-32 rounded-sm overflow-hidden flex-shrink-0 bg-offwhite">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <Link to={`/product/${item.id}`} className="font-bold text-navy hover:text-gold transition-colors block truncate">{item.name}</Link>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          <span className="text-[10px] font-bold text-charcoal/40 uppercase">Size: <span className="text-navy">{item.variant.size}</span></span>
                          <span className="text-[10px] font-bold text-charcoal/40 uppercase">Color: <span className="text-navy">{item.variant.color}</span></span>
                        </div>
                        <p className="mt-3 font-extrabold text-navy">₹{item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="flex items-center border border-charcoal/10 rounded-sm bg-offwhite/50">
                        <button 
                          onClick={() => updateQuantity(item.id, item.variant.size, item.variant.color, item.quantity - 1)}
                          className="p-1.5 hover:bg-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.variant.size, item.variant.color, item.quantity + 1)}
                          className="p-1.5 hover:bg-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block text-right font-extrabold text-navy">
                      ₹{item.price * item.quantity}
                    </div>

                    <div className="flex md:justify-end">
                      <button 
                        onClick={() => removeFromCart(item.id, item.variant.size, item.variant.color)}
                        className="text-charcoal/20 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/shop" className="inline-flex items-center text-xs font-bold text-navy hover:text-gold transition-all uppercase tracking-widest group">
              <ChevronRight size={14} className="rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="space-y-8">
            <div className="bg-navy text-offwhite p-8 rounded-[8px] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 flex items-center">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-60">Subtotal</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-60">Estimated Shipping</span>
                    <span className="font-bold">{shipping > 0 ? `₹${shipping}` : 'FREE'}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-gold">
                      <span>Promo Discount</span>
                      <span className="font-bold">-₹{discount}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-white/10 flex justify-between">
                    <span className="font-bold">Order Total</span>
                    <span className="text-2xl font-extrabold text-gold">₹{total}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold tracking-widest opacity-40 uppercase mb-3">Promotional Code</p>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text" 
                        placeholder="MALL10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <button 
                      onClick={handleApplyPromo}
                      className="bg-gold text-navy text-[10px] font-bold px-4 rounded-sm hover:brightness-110 active:scale-95 transition-all"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && <p className="text-red-400 text-[10px] mt-2 font-bold">{promoError}</p>}
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary py-4 flex items-center justify-center space-x-3 text-sm tracking-[0.2em]"
                >
                  <span>SECURE CHECKOUT</span>
                  <ArrowRight size={18} />
                </button>

                <p className="text-[10px] text-center mt-6 text-white/30 font-medium">Free standard shipping on orders over ₹999. Duties & taxes included.</p>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white p-6 rounded-[8px] shadow-sm border border-charcoal/5">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Available Offers</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 border-b border-charcoal/5 pb-4">
                  <div className="bg-offwhite p-2 rounded-sm text-gold"><Tag size={16}/></div>
                  <div>
                    <h5 className="text-xs font-bold text-navy">NEW CUSTOMER</h5>
                    <p className="text-[10px] text-charcoal/50 mt-1">Get 10% OFF on your first purchase using code <b>MALL10</b></p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-offwhite p-2 rounded-sm text-gold"><Tag size={16}/></div>
                  <div>
                    <h5 className="text-xs font-bold text-navy">FLAT DISCOUNT</h5>
                    <p className="text-[10px] text-charcoal/50 mt-1">Get FLAT ₹200 OFF on orders above ₹1,999 using code <b>FLAT200</b></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upsell: Complete the Look */}
        <div className="mt-24">
          <h2 className="text-2xl font-extrabold text-navy mb-10">Complete The Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.slice(3, 7).map(p => (
              <div key={p.id} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-[8px] mb-4 bg-white relative">
                  <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Link to={`/product/${p.id}`} className="absolute bottom-4 left-4 right-4 bg-navy/90 text-gold text-[10px] font-bold py-3 text-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all uppercase tracking-widest">Add To Bag</Link>
                </div>
                <h4 className="font-bold text-sm text-navy truncate uppercase tracking-tight">{p.name}</h4>
                <p className="font-extrabold text-navy mt-1">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
