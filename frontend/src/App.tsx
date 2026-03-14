import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from './store/authStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/account/AccountPage';
import OrdersPage from './pages/account/OrdersPage';
import OrderDetailPage from './pages/account/OrderDetailPage';
import WishlistPage from './pages/account/WishlistPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  return user?.role === 'ADMIN' ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Public layout */}
          <Route path="/" element={<><Navbar /><main><HomePage /></main><Footer /></>} />
          <Route path="/shop" element={<><Navbar /><main><ShopPage /></main><Footer /></>} />
          <Route path="/shop/:category" element={<><Navbar /><main><CategoryPage /></main><Footer /></>} />
          <Route path="/product/:slug" element={<><Navbar /><main><ProductDetailPage /></main><Footer /></>} />
          <Route path="/cart" element={<><Navbar /><main><CartPage /></main><Footer /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected */}
          <Route path="/checkout" element={<ProtectedRoute><><Navbar /><main><CheckoutPage /></main><Footer /></></ProtectedRoute>} />
          <Route path="/order-success/:id" element={<ProtectedRoute><><Navbar /><main><OrderSuccessPage /></main><Footer /></></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><><Navbar /><main><AccountPage /></main><Footer /></></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute><><Navbar /><main><OrdersPage /></main><Footer /></></ProtectedRoute>} />
          <Route path="/account/orders/:id" element={<ProtectedRoute><><Navbar /><main><OrderDetailPage /></main><Footer /></></ProtectedRoute>} />
          <Route path="/account/wishlist" element={<ProtectedRoute><><Navbar /><main><WishlistPage /></main><Footer /></></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProductsPage /></AdminLayout></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrdersPage /></AdminLayout></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsersPage /></AdminLayout></AdminRoute>} />
        </Routes>
      </Elements>
    </BrowserRouter>
  );
}
