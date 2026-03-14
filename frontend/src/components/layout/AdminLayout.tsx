import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/users', icon: Users, label: 'Users' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="text-xl font-bold">MENS<span className="text-accent">SHOP</span></Link>
          <p className="text-xs text-white/50 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${pathname === to ? 'bg-accent text-white' : 'text-white/70 hover:bg-white/10'}`}
            >
              <Icon size={18} />{label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
