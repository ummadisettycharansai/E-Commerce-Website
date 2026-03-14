import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useState } from 'react';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await authApi.register(data);
      login(res.user, res.token);
      navigate('/');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-primary">MENS<span className="text-accent">SHOP</span></Link>
          <h1 className="text-2xl font-bold mt-4">Create account</h1>
          <p className="text-gray-500 mt-1">Join MensShop today</p>
        </div>
        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })} error={errors.name?.message as string} />
            <Input label="Email" type="email" {...register('email', { required: 'Email is required' })} error={errors.email?.message as string} />
            <Input label="Phone (optional)" type="tel" {...register('phone')} />
            <Input label="Password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })} error={errors.password?.message as string} />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" loading={loading} className="w-full" size="lg">Create Account</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
