import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronRight } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Listing from './pages/Listing';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Admin from './pages/Admin';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Casuals', path: '/shop?category=Casuals' },
    { name: 'Formals', path: '/shop?category=Formals' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-navy text-offwhite z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <span className="text-2xl font-bold font-montserrat tracking-tighter text-gold">M ALL</span>
            <span className="text-[10px] tracking-[0.2em] -mt-1 uppercase opacity-80">Dress Sharp</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium hover:text-gold transition-colors ${location.pathname === link.path ? 'text-gold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <div className="hidden lg:flex items-center bg-white/10 px-3 py-1.5 rounded-sm border border-white/20">
              <Search size={18} className="text-offwhite/50" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-xs ml-2 w-32 placeholder:text-offwhite/30"
              />
            </div>
            
            <Link to="/account" className="hover:text-gold transition-colors">
              <User size={22} />
            </Link>
            
            <Link to="/account?tab=wishlist" className="relative hover:text-gold transition-colors">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative hover:text-gold transition-colors">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 py-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-lg font-medium border-b border-white/5 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center bg-white/10 px-3 py-3 rounded-sm">
            <Search size={18} />
            <input type="text" placeholder="Search products..." className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full" />
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-offwhite pt-16 pb-8 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold font-montserrat tracking-tighter text-gold capitalize">M all</span>
          </Link>
          <p className="text-offwhite/60 text-sm leading-relaxed">
            Premium menswear for the urban professional. Built for those who lead, designed for those who dare.
          </p>
          <div className="flex space-x-4 pt-2">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors cursor-pointer">In</div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors cursor-pointer">Tw</div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors cursor-pointer">Ig</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-6 text-gold">Collections</h4>
          <ul className="space-y-3 text-offwhite/60 text-sm">
            <li><Link to="/shop?category=Shirts" className="hover:text-offwhite transition-colors">Premium Shirts</Link></li>
            <li><Link to="/shop?category=Trousers" className="hover:text-offwhite transition-colors">Classic Trousers</Link></li>
            <li><Link to="/shop?category=Jackets" className="hover:text-offwhite transition-colors">Urban Jackets</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-offwhite transition-colors">Style Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-gold">Support</h4>
          <ul className="space-y-3 text-offwhite/60 text-sm">
            <li><Link to="/account?tab=orders" className="hover:text-offwhite transition-colors">Track Order</Link></li>
            <li><Link to="#" className="hover:text-offwhite transition-colors">Size Guide</Link></li>
            <li><Link to="#" className="hover:text-offwhite transition-colors">Shipping Policy</Link></li>
            <li><Link to="#" className="hover:text-offwhite transition-colors">Return & Exchange</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-gold">Newsletter</h4>
          <p className="text-offwhite/60 text-sm mb-4">Subscribe to receive stylistic updates and 10% off your first order.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-gold w-full"
            />
            <button className="bg-gold text-navy px-4 font-semibold text-sm hover:brightness-110">JOIN</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-offwhite/40 text-[10px]">© 2026 M all CLOTHING. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center space-x-4 opacity-30 grayscale">
          <span className="text-xs font-bold">VISA</span>
          <span className="text-xs font-bold">MASTER</span>
          <span className="text-xs font-bold">AMEX</span>
          <span className="text-xs font-bold">UPI</span>
        </div>
      </div>
    </footer>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Listing />} />
                <Route path="/product/:id" element={<Detail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin/*" element={<Admin />} />
              </Routes>
            </MainLayout>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
