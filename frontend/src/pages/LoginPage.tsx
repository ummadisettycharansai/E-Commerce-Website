import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useState } from 'react';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuthStore();
  const { syncWithServer } = useCartStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login(data);
      login(res.user, res.token);
      await syncWithServer();
      navigate(res.user.role === 'ADMIN' ? '/admin' : '/');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-primary">MENS<span className="text-accent">SHOP</span></Link>
          <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>
        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Email" type="email" {...register('email', { required: 'Email is required' })} error={errors.email?.message as string} />
            <Input label="Password" type="password" {...register('password', { required: 'Password is required' })} error={errors.password?.message as string} />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" loading={loading} className="w-full" size="lg">Sign In</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account? <Link to="/register" className="text-accent hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
