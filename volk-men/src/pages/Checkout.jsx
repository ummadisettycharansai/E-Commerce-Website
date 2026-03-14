import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, CreditCard, Truck, ShieldCheck, ArrowRight, User, MapPin, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = subtotal > 999 ? 0 : 150;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const placeOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      const newOrderId = `M-${Math.floor(Math.random() * 900000) + 100000}`;
      setOrderId(newOrderId);
      setIsProcessing(false);
      setStep(4);
      clearCart();
    }, 2000);
  };

  if (step === 4) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-gold text-navy rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500 shadow-xl">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-navy mb-4 uppercase tracking-tighter">Order Confirmed</h1>
        <p className="text-charcoal/50 mb-8 font-medium">Thank you for choosing M all. Your style upgrade is on its way.</p>
        
        <div className="bg-white p-8 rounded-[8px] border border-charcoal/5 shadow-sm text-left mb-10">
          <div className="flex justify-between items-center pb-4 border-b border-charcoal/5 mb-4">
            <span className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">Order ID</span>
            <span className="font-extrabold text-navy">{orderId}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-charcoal/5 mb-4">
            <span className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">Estimated Delivery</span>
            <span className="font-bold text-navy">By Oct 24, 2026</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">Status</span>
            <span className="text-xs font-bold bg-navy text-gold px-3 py-1 rounded-full uppercase tracking-tighter">Processing</span>
          </div>
        </div>

        <div className="flex flex-col sm:row gap-4">
          <Link to="/account?tab=orders" className="flex-1 btn-primary py-4 text-sm tracking-widest">VIEW ORDER</Link>
          <Link to="/shop" className="flex-1 btn-secondary py-4 text-sm tracking-widest">CONTINUE SHOPPING</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-charcoal/5 -translate-y-1/2 z-0"></div>
            {[
              { id: 1, label: 'Delivery', icon: MapPin },
              { id: 2, label: 'Payment', icon: Wallet },
              { id: 3, label: 'Confirm', icon: ShieldCheck }
            ].map(s => (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${step >= s.id ? 'bg-navy border-gold text-gold shadow-lg ring-8 ring-gold/5' : 'bg-white border-charcoal/5 text-charcoal/20'}`}>
                  <s.icon size={20} />
                </div>
                <span className={`mt-3 text-[10px] font-bold uppercase tracking-[0.2em] ${step >= s.id ? 'text-navy' : 'text-charcoal/30'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white p-8 md:p-12 rounded-[8px] shadow-sm border border-charcoal/5 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-extrabold text-navy mb-10 flex items-center">
                  <User className="mr-4 text-gold" /> Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">First Name</label>
                    <input name="firstName" value={orderDetails.firstName} onChange={handleInputChange} type="text" className="input-field" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Last Name</label>
                    <input name="lastName" value={orderDetails.lastName} onChange={handleInputChange} type="text" className="input-field" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Email Address</label>
                    <input name="email" value={orderDetails.email} onChange={handleInputChange} type="email" className="input-field" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Phone Number</label>
                    <input name="phone" value={orderDetails.phone} onChange={handleInputChange} type="tel" className="input-field" placeholder="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Street Address</label>
                    <input name="address" value={orderDetails.address} onChange={handleInputChange} type="text" className="input-field" placeholder="House No, Street, Area" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">City</label>
                    <input name="city" value={orderDetails.city} onChange={handleInputChange} type="text" className="input-field" placeholder="New Delhi" />
                  </div>
                  <div className="space-y-2 text-navy text-xs">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2 block">State</label>
                    <select name="state" value={orderDetails.state} onChange={handleInputChange} className="input-field bg-white">
                      <option value="">Select State</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Pincode</label>
                    <input name="pincode" value={orderDetails.pincode} onChange={handleInputChange} type="text" className="input-field" placeholder="110001" />
                  </div>
                </div>
                <div className="mt-12 flex justify-end">
                  <button onClick={handleNext} className="btn-primary flex items-center space-x-2 px-10">
                    <span>NEXT STEP</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 md:p-12 rounded-[8px] shadow-sm border border-charcoal/5 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-extrabold text-navy mb-10 flex items-center">
                  <Wallet className="mr-4 text-gold" /> Payment Method
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI (PhonePe, Google Pay)', icon: CheckCircle },
                    { id: 'net', label: 'Net Banking', icon: ArrowRight },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                  ].map(method => (
                    <label key={method.id} className={`flex items-center justify-between p-6 rounded-[8px] border-2 cursor-pointer transition-all ${orderDetails.paymentMethod === method.id ? 'border-navy bg-navy/5 shadow-inner' : 'border-charcoal/5 hover:border-gold'}`}>
                      <div className="flex items-center space-x-6">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${orderDetails.paymentMethod === method.id ? 'border-navy' : 'border-charcoal/30'}`}>
                          {orderDetails.paymentMethod === method.id && <div className="w-3 h-3 bg-navy rounded-full"></div>}
                        </div>
                        <span className="font-bold text-navy uppercase tracking-widest text-sm">{method.label}</span>
                      </div>
                      <method.icon size={24} className={orderDetails.paymentMethod === method.id ? 'text-navy' : 'text-charcoal/20'} />
                      <input type="radio" name="paymentMethod" value={method.id} className="hidden" onChange={handleInputChange} checked={orderDetails.paymentMethod === method.id} />
                    </label>
                  ))}
                </div>
                
                {orderDetails.paymentMethod === 'card' && (
                  <div className="mt-8 grid grid-cols-2 gap-6 p-6 bg-offwhite rounded-[8px] animate-in slide-in-from-top-4">
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Card Number</label>
                       <input type="text" className="input-field" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Expiry Date</label>
                       <input type="text" className="input-field" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">CVV</label>
                       <input type="password" size="3" className="input-field" placeholder="***" />
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-between">
                  <button onClick={handleBack} className="btn-secondary px-8">BACK</button>
                  <button onClick={handleNext} className="btn-primary flex items-center space-x-2 px-10">
                    <span>NEXT STEP</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-8 md:p-12 rounded-[8px] shadow-sm border border-charcoal/5 animate-in fade-in slide-in-from-bottom-4 text-navy">
                <h2 className="text-2xl font-extrabold mb-10">Review & Confirm</h2>
                
                <div className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10 bg-offwhite p-8 rounded-[8px]">
                    <div>
                      <h4 className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] mb-4">Delivery Address</h4>
                      <p className="font-bold">{orderDetails.firstName} {orderDetails.lastName}</p>
                      <p className="text-sm opacity-60 mt-1">{orderDetails.address}, {orderDetails.city}, {orderDetails.state} - {orderDetails.pincode}</p>
                      <p className="text-sm opacity-60 mt-1">{orderDetails.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] mb-4">Payment Method</h4>
                      <div className="flex items-center space-x-4">
                         <CreditCard className="text-gold" />
                         <span className="font-bold uppercase text-sm">{orderDetails.paymentMethod === 'card' ? 'Credit Card' : orderDetails.paymentMethod.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                     <h4 className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] mb-6">Order Details ({cart.length} Pieces)</h4>
                     <div className="space-y-4">
                       {cart.map(item => (
                         <div key={`${item.id}-${item.variant.size}`} className="flex justify-between items-center text-sm border-b border-charcoal/5 pb-4 last:border-0">
                           <div className="flex items-center space-x-4">
                              <div className="w-12 h-16 bg-offwhite rounded-sm overflow-hidden flex-shrink-0">
                                 <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-bold">{item.name}</p>
                                <p className="text-[10px] opacity-40 uppercase font-bold">{item.variant.size} • {item.variant.color} • Qty: {item.quantity}</p>
                              </div>
                           </div>
                           <span className="font-extrabold">₹{item.price * item.quantity}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>

                <div className="mt-16 flex justify-between gap-6">
                  <button onClick={handleBack} className="btn-secondary px-8 flex-1 sm:flex-none">BACK</button>
                  <button 
                    onClick={placeOrder} 
                    disabled={isProcessing}
                    className="btn-primary flex-[2] sm:flex-none flex items-center justify-center space-x-3 px-16 relative"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-navy border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="font-bold tracking-widest uppercase">PLACE ORDER</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
             <div className="bg-navy p-8 rounded-[8px] text-offwhite sticky top-24">
               <h3 className="font-extrabold text-xl mb-8 flex justify-between items-end">
                 Summary
                 <span className="text-gold text-[10px] translate-y-[-4px] uppercase tracking-tighter">SECURE</span>
               </h3>
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-sm">
                   <span className="opacity-60">Subtotal</span>
                   <span className="font-bold">₹{subtotal}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="opacity-60">Delivery Charges</span>
                   <span className="font-bold">{shipping > 0 ? `₹${shipping}` : 'FREE'}</span>
                 </div>
                 <div className="pt-6 border-t border-white/10 flex justify-between">
                   <span className="font-bold uppercase tracking-widest text-xs">Total Amount</span>
                   <span className="text-2xl font-extrabold text-gold">₹{total}</span>
                 </div>
               </div>
               
               <div className="space-y-4 pt-4">
                 <div className="flex items-center space-x-3 text-[10px] font-bold text-white/40">
                   <ShieldCheck size={16} className="text-gold" />
                   <span>100% DATA PROTECTION</span>
                 </div>
                 <div className="flex items-center space-x-3 text-[10px] font-bold text-white/40">
                   <CheckCircle size={16} className="text-gold" />
                   <span>EASY 15 DAY RETURNS</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
