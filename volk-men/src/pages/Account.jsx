import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, Award, Settings, LogOut, ChevronRight, Star, Clock, ShoppingBag, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const activeTab = searchParams.get('tab') || 'profile';

  const orders = [
    { id: 'M-829102', date: 'Oct 12, 2026', total: 3499, status: 'Processing', items: 2 },
    { id: 'M-712391', date: 'Sep 28, 2026', total: 1899, status: 'Delivered', items: 1 },
    { id: 'M-610239', date: 'Sep 15, 2026', total: 5299, status: 'Shipped', items: 3 },
  ];

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const SidebarItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => handleTabChange(id)}
      className={`w-full flex items-center space-x-4 px-6 py-4 transition-all border-r-4 ${activeTab === id ? 'bg-navy text-gold border-gold font-bold shadow-lg' : 'bg-white text-charcoal/40 border-transparent hover:bg-offwhite hover:text-navy'}`}
    >
      <Icon size={20} />
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-navy p-8 rounded-t-[8px] text-offwhite relative overflow-hidden">
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-2xl mb-4 shadow-xl">
                   {user?.name?.charAt(0) || 'U'}
                 </div>
                 <h2 className="text-xl font-extrabold tracking-tight">{user?.name || 'Guest User'}</h2>
                 <p className="text-xs text-white/40 mt-1 uppercase font-bold tracking-widest">{user?.email || 'guest@mall.com'}</p>
               </div>
               <div className="absolute top-0 right-0 -tr-10 -mr-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
            </div>
            <div className="bg-white rounded-b-[8px] shadow-sm border border-charcoal/5 overflow-hidden">
              <SidebarItem id="profile" label="Profile Overview" icon={User} />
              <SidebarItem id="orders" label="My Orders" icon={Package} />
              <SidebarItem id="wishlist" label="Wishlist" icon={Heart} />
              <SidebarItem id="address" label="Address Book" icon={MapPin} />
              <SidebarItem id="wallet" label="Wallet & Points" icon={Wallet} />
              <SidebarItem id="settings" label="Settings" icon={Settings} />
              <button 
                onClick={logout}
                className="w-full flex items-center space-x-4 px-6 py-4 text-red-500 hover:bg-red-50 transition-all font-bold"
              >
                <LogOut size={20} />
                <span className="text-xs uppercase tracking-widest">Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white p-8 md:p-12 rounded-[8px] shadow-sm border border-charcoal/5 min-h-[600px] animate-in fade-in duration-500">
               {activeTab === 'profile' && (
                 <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-8">Dashboard Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                       <div className="bg-offwhite p-6 rounded-[8px] border-l-4 border-gold shadow-sm">
                          <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Total Points</p>
                          <div className="flex items-end space-x-2">
                             <Award className="text-gold mb-1" />
                             <span className="text-3xl font-extrabold text-navy">{user?.points || 0}</span>
                          </div>
                       </div>
                       <div className="bg-offwhite p-6 rounded-[8px] border-l-4 border-navy shadow-sm">
                          <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Wallet Credits</p>
                          <div className="flex items-end space-x-2">
                             <CreditCard className="text-navy mb-1" />
                             <span className="text-3xl font-extrabold text-navy">₹{user?.credits || 0}</span>
                          </div>
                       </div>
                       <div className="bg-offwhite p-6 rounded-[8px] border-l-4 border-charcoal/20 shadow-sm">
                          <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Ongoing Orders</p>
                          <div className="flex items-end space-x-2">
                             <Clock className="text-charcoal/40 mb-1" />
                             <span className="text-3xl font-extrabold text-navy">2</span>
                          </div>
                       </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-navy mb-6">Recent Activity</h4>
                    <div className="space-y-4">
                       <div className="p-4 border border-charcoal/5 rounded-sm flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                             <div className="w-2 h-2 bg-gold rounded-full"></div>
                             <span>Order <b>#VOLK-829102</b> is currently being processed.</span>
                          </div>
                          <span className="text-[10px] font-bold opacity-30">2 HOURS AGO</span>
                       </div>
                       <div className="p-4 border border-charcoal/5 rounded-sm flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                             <span>You earned <b>50 Reward Points</b> on your last purchase.</span>
                          </div>
                          <span className="text-[10px] font-bold opacity-30">1 DAY AGO</span>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'orders' && (
                 <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-8">Purchase History</h3>
                    <div className="space-y-6">
                       {orders.map(order => (
                         <div key={order.id} className="border border-charcoal/5 rounded-[8px] overflow-hidden">
                            <div className="bg-offwhite p-4 flex justify-between items-center flex-wrap gap-4">
                               <div className="flex gap-8">
                                  <div>
                                     <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Order ID</p>
                                     <p className="text-xs font-extrabold mt-1">#{order.id}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Placed On</p>
                                     <p className="text-xs font-bold mt-1">{order.date}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Total Value</p>
                                     <p className="text-xs font-extrabold mt-1 text-gold">₹{order.total}</p>
                                  </div>
                               </div>
                               <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase shadow-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-navy text-gold'}`}>
                                 {order.status}
                               </span>
                            </div>
                            <div className="p-6 flex items-center justify-between">
                               <div className="flex items-center space-x-4">
                                  <div className="flex -space-x-3 overflow-hidden">
                                     {[1,2].map(i => (
                                       <div key={i} className="w-12 h-16 border-2 border-white rounded-sm overflow-hidden bg-offwhite flex-shrink-0">
                                          <img src={`https://placehold.co/100x150/2D2D2D/white?text=Item+${i}`} alt="" className="w-full h-full object-cover" />
                                       </div>
                                     ))}
                                  </div>
                                  <p className="text-sm font-bold opacity-60">And {order.items > 2 ? order.items - 2 : 'more'} items...</p>
                               </div>
                               <div className="flex space-x-3">
                                  <button className="px-4 py-2 border border-charcoal/10 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-navy hover:text-white transition-all">Track</button>
                                  <button className="px-4 py-2 bg-navy text-gold rounded-sm text-[10px] font-bold uppercase tracking-widest hover:brightness-110 shadow-md">Details</button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {activeTab === 'wishlist' && (
                 <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-8">My Collection</h3>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map(p => (
                          <div key={p.id} className="group border border-charcoal/5 rounded-[8px] overflow-hidden hover:shadow-xl transition-all">
                             <div className="aspect-[3/4] relative">
                                <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                <button className="absolute bottom-4 left-4 right-4 bg-navy text-gold text-[10px] font-bold py-3 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">Add To Bag</button>
                             </div>
                             <div className="p-4">
                               <h4 className="font-bold text-sm truncate uppercase tracking-tighter">{p.name}</h4>
                               <p className="font-extrabold text-navy mt-1">₹{p.price}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center bg-offwhite/30 rounded-[8px] border-2 border-dashed border-charcoal/10">
                        <Heart size={48} className="mx-auto mb-4 text-charcoal/10" />
                        <p className="text-charcoal/40 font-bold">Your wishlist is empty.</p>
                        <Link to="/shop" className="btn-primary mt-6 inline-block">EXPLORE PIECES</Link>
                      </div>
                    )}
                 </div>
               )}

                {activeTab === 'address' && (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-2xl font-extrabold text-navy">Address Book</h3>
                       <button className="btn-primary py-2 px-6 text-[10px] font-bold uppercase tracking-widest">Add New</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {[
                         { type: 'Primary Residence', address: '123 Luxury Lane, Jubilee Hills', city: 'Hyderabad, TS', zip: '500033', phone: '+91 98765 43210' },
                         { type: 'Office HQ', address: '45 Tech Plaza, Madhapur', city: 'Hyderabad, TS', zip: '500081', phone: '+91 98765 55555' }
                       ].map((addr, i) => (
                         <div key={i} className="p-6 border border-charcoal/5 rounded-[8px] hover:border-gold transition-colors relative group">
                            <span className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2 block">{addr.type}</span>
                            <p className="text-sm font-bold text-navy">{addr.address}</p>
                            <p className="text-sm text-charcoal/60">{addr.city}</p>
                            <p className="text-sm text-charcoal/60">{addr.zip}</p>
                            <p className="text-xs font-bold text-navy mt-4">{addr.phone}</p>
                            <div className="absolute top-6 right-6 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="text-[10px] font-bold text-charcoal/30 hover:text-navy uppercase">Edit</button>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'wallet' && (
                  <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-8">Credits & Rewards</h3>
                    <div className="bg-navy p-8 rounded-[8px] text-offwhite mb-8 flex justify-between items-center overflow-hidden relative">
                       <div className="relative z-10">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Available Balance</p>
                          <h2 className="text-4xl font-extrabold text-gold">₹{user?.credits || 1250}.00</h2>
                       </div>
                       <div className="relative z-10 text-right">
                          <button className="bg-gold text-navy py-2 px-6 rounded-sm text-[10px] font-extrabold uppercase tracking-widest shadow-lg shadow-gold/20">Add Funds</button>
                       </div>
                       <CreditCard className="absolute -bottom-4 -right-4 w-32 h-32 opacity-5 text-white" />
                    </div>

                    <h4 className="text-lg font-bold text-navy mb-6">Transaction History</h4>
                    <div className="space-y-4">
                       {[
                         { desc: 'Refund for Order #M-55210', date: 'Oct 05, 2026', type: 'credit', amount: 1299 },
                         { desc: 'Used for Order #M-82910', date: 'Oct 12, 2026', type: 'debit', amount: 500 },
                         { desc: 'Referral Bonus', date: 'Sep 20, 2026', type: 'credit', amount: 200 }
                       ].map((tx, i) => (
                         <div key={i} className="flex justify-between items-center p-4 border-b border-charcoal/5">
                            <div>
                               <p className="text-sm font-bold text-navy">{tx.desc}</p>
                               <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">{tx.date}</p>
                            </div>
                            <span className={`font-extrabold ${tx.type === 'credit' ? 'text-green-500' : 'text-navy'}`}>
                               {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                            </span>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-8">Profile Settings</h3>
                    <form className="max-w-xl space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Full Name</label>
                             <input type="text" defaultValue={user?.name || "Charan Sai"} className="w-full bg-offwhite/50 border border-charcoal/10 rounded-sm py-3 px-4 text-xs outline-none focus:border-gold" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Email Address</label>
                             <input type="email" defaultValue={user?.email || "charan@mall.com"} className="w-full bg-offwhite/50 border border-charcoal/10 rounded-sm py-3 px-4 text-xs outline-none focus:border-gold" />
                          </div>
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-offwhite/50 border border-charcoal/10 rounded-sm py-3 px-4 text-xs outline-none focus:border-gold" />
                       </div>
                       <div className="pt-6">
                          <button type="submit" className="btn-primary py-3 px-12 text-xs font-bold uppercase tracking-widest">Save Changes</button>
                       </div>
                    </form>
                  </div>
                )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
