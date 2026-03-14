import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, Tag, BarChart3, Plus, Search, Edit3, Trash2, ChevronRight, TrendingUp, DollarSign, Box, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { PRODUCTS } from '../data/mockData';

const salesData = [
  { name: 'Mon', sales: 4200, orders: 12 },
  { name: 'Tue', sales: 3800, orders: 10 },
  { name: 'Wed', sales: 5100, orders: 18 },
  { name: 'Thu', sales: 4800, orders: 15 },
  { name: 'Fri', sales: 6200, orders: 22 },
  { name: 'Sat', sales: 8500, orders: 30 },
  { name: 'Sun', sales: 7900, orders: 28 },
];

const categoryData = [
  { name: 'Shirts', value: 400 },
  { name: 'Trousers', value: 300 },
  { name: 'Jackets', value: 200 },
  { name: 'Formals', value: 150 },
];

const COLORS = ['#0A1628', '#C9A84C', '#2D2D2D', '#F5E6BE'];

const AdminDashboard = () => (
  <div className="animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        { title: 'Total Revenue', value: '₹142,800', change: '+12.5%', icon: DollarSign, color: 'navy' },
        { title: 'Total Orders', value: '342', change: '+8.2%', icon: ShoppingCart, color: 'gold' },
        { title: 'Active Products', value: '124', change: '0%', icon: Package, color: 'charcoal' },
        { title: 'New Customers', value: '89', change: '+24%', icon: Users, color: 'navy' },
      ].map((kpi, i) => (
        <div key={i} className="bg-white p-6 rounded-[8px] border border-charcoal/5 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
                <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">{kpi.title}</p>
                <h4 className="text-2xl font-extrabold text-navy mt-1">{kpi.value}</h4>
                <p className={`text-[10px] font-bold mt-2 ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-charcoal/30'}`}>{kpi.change} vs last week</p>
             </div>
             <div className={`p-3 rounded-sm ${kpi.color === 'gold' ? 'bg-gold/10 text-gold' : kpi.color === 'navy' ? 'bg-navy/5 text-navy' : 'bg-charcoal/5 text-charcoal'}`}>
                <kpi.icon size={20} />
             </div>
           </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2 bg-white p-8 rounded-[8px] border border-charcoal/5 shadow-sm">
        <h3 className="font-bold text-navy mb-8 flex items-center justify-between">
          Sales Performance
          <TrendingUp size={16} className="text-green-500" />
        </h3>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={salesData}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
               <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#0A1628', border: 'none', borderRadius: '4px', color: '#FFF' }}
                 itemStyle={{ fontSize: '12px' }}
               />
               <Line type="monotone" dataKey="sales" stroke="#C9A84C" strokeWidth={3} dot={{ fill: '#C9A84C', r: 4 }} activeDot={{ r: 6 }} />
             </LineChart>
           </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[8px] border border-charcoal/5 shadow-sm">
        <h3 className="font-bold text-navy mb-8">Category Mix</h3>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                   {categoryData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                </Pie>
                <Tooltip />
             </PieChart>
           </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
           {categoryData.map((c, i) => (
             <div key={i} className="flex justify-between items-center text-xs">
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="font-bold text-charcoal/60">{c.name}</span>
               </div>
               <span className="font-extrabold text-navy">{Math.round((c.value/1050)*100)}%</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductManager = () => (
  <div className="animate-in fade-in duration-500">
     <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold text-navy">Product Inventory</h2>
        <button className="btn-primary py-2 px-6 flex items-center space-x-2 text-xs">
           <Plus size={16} />
           <span>ADD NEW PRODUCT</span>
        </button>
     </div>

     <div className="bg-white rounded-[8px] border border-charcoal/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-charcoal/5 flex items-center bg-offwhite/30">
           <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
              <input type="text" placeholder="Search by name, SKU or category..." className="w-full bg-white border border-charcoal/10 rounded-sm py-2 pl-10 pr-4 text-xs outline-none focus:border-gold" />
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-offwhite text-[10px] uppercase font-bold tracking-widest text-charcoal/40">
                    <th className="px-6 py-4">Product Piece</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                 {PRODUCTS.map(product => (
                    <tr key={product.id} className="hover:bg-offwhite/20 transition-colors">
                       <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-12 bg-offwhite rounded-sm overflow-hidden">
                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <p className="text-xs font-bold text-navy truncate max-w-[150px]">{product.name}</p>
                                <p className="text-[10px] text-charcoal/30 font-bold uppercase">SKU: M-{product.id.toUpperCase()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-[10px] font-bold text-charcoal/60 uppercase">{product.category}</td>
                       <td className="px-6 py-4 font-bold text-navy text-xs">₹{product.price}</td>
                       <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                             <div className="w-16 bg-offwhite h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gold h-full w-4/5"></div>
                             </div>
                             <span className="text-[10px] font-bold text-charcoal/40">42 units</span>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-[8px] font-bold uppercase tracking-widest rounded-full">Active</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                             <button className="p-2 text-charcoal/30 hover:text-navy transition-colors"><Edit3 size={16} /></button>
                             <button className="p-2 text-charcoal/30 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
  </div>
);

const OrderManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-extrabold text-navy">Order Management</h2>
      <div className="flex space-x-3">
        <button className="bg-white border border-charcoal/10 py-2 px-6 rounded-sm text-[10px] font-bold uppercase tracking-widest">Export CSV</button>
      </div>
    </div>
    
    <div className="bg-white rounded-[8px] border border-charcoal/5 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-offwhite text-[10px] uppercase font-bold tracking-widest text-charcoal/40">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {[
              { id: 'M-1029', customer: 'Rahul Sharma', date: 'Oct 14, 2026', amount: 4599, status: 'Processing' },
              { id: 'M-1028', customer: 'Priya Patel', date: 'Oct 13, 2026', amount: 2100, status: 'Shipped' },
              { id: 'M-1027', customer: 'Amit Singh', date: 'Oct 13, 2026', amount: 12500, status: 'Delivered' },
              { id: 'M-1026', customer: 'Sita Ram', date: 'Oct 12, 2026', amount: 3200, status: 'Cancelled' },
            ].map(order => (
              <tr key={order.id} className="hover:bg-offwhite/20 transition-colors">
                <td className="px-6 py-4 text-xs font-extrabold text-navy">#{order.id}</td>
                <td className="px-6 py-4 text-xs font-bold text-charcoal/60">{order.customer}</td>
                <td className="px-6 py-4 text-[10px] font-bold text-charcoal/30">{order.date}</td>
                <td className="px-6 py-4 text-xs font-extrabold text-gold">₹{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-charcoal/10 text-charcoal'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-navy hover:text-gold transition-colors font-bold text-[10px] uppercase tracking-widest">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CustomerManager = () => (
  <div className="animate-in fade-in duration-500">
    <h2 className="text-2xl font-extrabold text-navy mb-8">Customer Directory</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Rahul Sharma', email: 'rahul@example.com', orders: 12, spend: 45000, joined: 'Aug 2026' },
        { name: 'Priya Patel', email: 'priya@example.com', orders: 5, spend: 12000, joined: 'Sep 2026' },
        { name: 'Amit Singh', email: 'amit@example.com', orders: 24, spend: 125000, joined: 'May 2026' },
      ].map((customer, i) => (
        <div key={i} className="bg-white p-6 rounded-[8px] border border-charcoal/5 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center text-navy font-bold">{customer.name.charAt(0)}</div>
            <div>
              <h4 className="font-extrabold text-navy">{customer.name}</h4>
              <p className="text-[10px] text-charcoal/30 font-bold uppercase tracking-widest">{customer.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-charcoal/5 mb-4">
            <div>
              <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">Total Orders</p>
              <p className="font-extrabold text-navy">{customer.orders}</p>
            </div>
            <div>
              <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">Total Spend</p>
              <p className="font-extrabold text-gold">₹{customer.spend}</p>
            </div>
          </div>
          <p className="text-[10px] text-charcoal/30 font-bold uppercase text-center">Customer since {customer.joined}</p>
        </div>
      ))}
    </div>
  </div>
);

const PromoManager = () => (
   <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-extrabold text-navy">Promo Codes</h2>
         <button className="btn-primary py-2 px-6 flex items-center space-x-2 text-xs">
            <Plus size={16} />
            <span>CREATE CODE</span>
         </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {[
           { code: 'MALL10', discount: '10% OFF', usage: '142/500', status: 'Active', expiry: 'Dec 31, 2026' },
           { code: 'WELCOME25', discount: '25% OFF', usage: '891/∞', status: 'Active', expiry: 'Never' },
           { code: 'FESTIVE50', discount: '₹500 OFF', usage: '50/50', status: 'Expired', expiry: 'Oct 01, 2026' },
         ].map((promo, i) => (
           <div key={i} className="bg-white p-6 rounded-[8px] border border-charcoal/5 shadow-sm border-l-4 border-gold">
              <div className="flex justify-between items-start">
                 <div>
                    <h4 className="text-2xl font-extrabold text-navy tracking-tighter">{promo.code}</h4>
                    <p className="text-xs font-bold text-gold mt-1 uppercase tracking-widest">{promo.discount}</p>
                 </div>
                 <span className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full ${promo.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {promo.status}
                 </span>
              </div>
              <div className="mt-6 flex justify-between items-center text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">
                 <span>Used: {promo.usage}</span>
                 <span>Expiry: {promo.expiry}</span>
              </div>
           </div>
         ))}
      </div>
   </div>
);

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Promo Codes', path: '/admin/promo', icon: Tag },
  ];

  return (
    <div className="pt-16 min-h-screen bg-offwhite flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-navy text-offwhite fixed left-0 top-16 bottom-0 z-40 hidden lg:block overflow-y-auto border-r border-white/5 shadow-2xl">
        <div className="flex flex-col h-full py-10 px-6">
          <div className="mb-10 flex items-center space-x-4">
             <div className="w-10 h-10 bg-gold text-navy rounded-sm flex items-center justify-center font-bold">A</div>
             <div>
                <h4 className="font-extrabold text-sm tracking-tight">Admin Portal</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Ver. 2.0.4</p>
             </div>
          </div>
          <nav className="space-y-2 flex-grow">
            {menuItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`flex items-center space-x-4 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold text-navy font-extrabold shadow-lg shadow-gold/10' : 'text-white/40 hover:text-offwhite hover:bg-white/5'}`}
                >
                  <item.icon size={18} />
                  <span className="text-[10px] uppercase tracking-widest">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-10">
             <button className="w-full flex items-center space-x-4 px-4 py-4 text-white/30 hover:text-offwhite border-t border-white/5 transition-colors">
                <LayoutDashboard size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Public Site</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 lg:ml-64 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
           {/* Top Info */}
           <div className="flex justify-between items-center mb-12">
              <div>
                 <h1 className="text-3xl font-extrabold text-navy uppercase tracking-tighter">
                   {location.pathname === '/admin' ? 'System Overview' : location.pathname.split('/').pop().toUpperCase()}
                 </h1>
                 <p className="text-xs font-bold text-charcoal/40 mt-1 uppercase tracking-widest">Welcome back, Administrator</p>
              </div>
              <div className="flex items-center space-x-6">
                 <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">Server Status</p>
                    <div className="flex items-center space-x-2 justify-end mt-1">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                       <span className="text-xs font-extrabold text-navy uppercase">Operational</span>
                    </div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center relative">
                    <CheckCircle className="text-navy" size={20} />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-gold rounded-full border-2 border-offwhite"></span>
                 </div>
              </div>
           </div>

           <Routes>
             <Route path="/" element={<AdminDashboard />} />
             <Route path="/products" element={<ProductManager />} />
             <Route path="/orders" element={<OrderManager />} />
             <Route path="/customers" element={<CustomerManager />} />
             <Route path="/promo" element={<PromoManager />} />
             <Route path="*" element={<div className="py-20 text-center"><h2 className="text-2xl font-bold opacity-20 uppercase tracking-widest">Analytics Section Coming Soon</h2></div>} />
           </Routes>
        </div>
      </main>
    </div>
  );
};

export default Admin;
