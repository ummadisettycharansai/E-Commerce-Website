import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { count, toggleCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/shop?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/'); };

  const categories = ['T-Shirts', 'Shirts', 'Jeans', 'Shoes', 'Accessories'];

  return (
    <>
      <nav className="bg-primary text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            <Link to="/" className="text-xl font-bold tracking-wide shrink-0">MENS<span className="text-accent">SHOP</span></Link>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-4 pr-10 py-2 text-sm placeholder-white/60 focus:outline-none focus:bg-white/20"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2"><Search size={16} /></button>
              </div>
            </form>

            <div className="hidden md:flex items-center gap-6 ml-4">
              {categories.map((c) => (
                <Link key={c} to={`/shop/${c.toLowerCase().replace(' ', '-')}`} className="text-sm hover:text-accent transition-colors">{c}</Link>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button onClick={toggleCart} className="relative p-2 hover:text-accent transition-colors">
                <ShoppingCart size={22} />
                {count() > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count()}</span>}
              </button>

              {user ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-2 hover:text-accent transition-colors">
                    <User size={22} />
                    <span className="hidden md:block text-sm">{user.name.split(' ')[0]}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 rounded-xl shadow-xl w-48 py-2 z-50">
                      <Link to="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><User size={16} />My Account</Link>
                      <Link to="/account/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><ShoppingCart size={16} />Orders</Link>
                      <Link to="/account/wishlist" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><Heart size={16} />Wishlist</Link>
                      {user.role === 'ADMIN' && <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"><LayoutDashboard size={16} />Admin</Link>}
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm w-full text-red-500"><LogOut size={16} />Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-sm bg-accent px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors">Login</Link>
              )}

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm placeholder-white/60 focus:outline-none" />
                <button type="submit" className="p-2"><Search size={18} /></button>
              </form>
              {categories.map((c) => (
                <Link key={c} to={`/shop/${c.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm hover:text-accent">{c}</Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      <CartDrawer />
    </>
  );
}
