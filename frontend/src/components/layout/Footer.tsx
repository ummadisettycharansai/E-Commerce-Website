import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">MENS<span className="text-accent">SHOP</span></h3>
          <p className="text-white/60 text-sm">Premium men's fashion for the modern gentleman.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {['T-Shirts', 'Shirts', 'Jeans', 'Shoes', 'Accessories'].map((c) => (
              <li key={c}><Link to={`/shop/${c.toLowerCase().replace(' ', '-')}`} className="hover:text-accent transition-colors">{c}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/account" className="hover:text-accent transition-colors">My Account</Link></li>
            <li><Link to="/account/orders" className="hover:text-accent transition-colors">Orders</Link></li>
            <li><Link to="/account/wishlist" className="hover:text-accent transition-colors">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>support@mensshop.com</li>
            <li>+1 (800) 123-4567</li>
            <li>Mon-Fri 9am-6pm EST</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/50">
        © {new Date().getFullYear()} MensShop. All rights reserved.
      </div>
    </footer>
  );
}
