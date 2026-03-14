import { useQuery, useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { addressesApi } from '../../api/cart';
import { useAuthStore } from '../../store/authStore';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, Package, Heart, User } from 'lucide-react';

export default function AccountPage() {
  const { user, setUser } = useAuthStore();
  const [tab, setTab] = useState<'profile' | 'addresses' | 'password'>('profile');
  const { register, handleSubmit } = useForm({ defaultValues: { name: user?.name, phone: '' } });

  const { data: addresses = [], refetch } = useQuery({ queryKey: ['addresses'], queryFn: addressesApi.getAddresses });

  const updateProfile = useMutation({
    mutationFn: (data: any) => authApi.getMe().then(() => data),
    onSuccess: (data) => setUser({ ...user!, ...data }),
  });

  const deleteAddress = useMutation({
    mutationFn: addressesApi.deleteAddress,
    onSuccess: () => refetch(),
  });

  const setDefault = useMutation({
    mutationFn: addressesApi.setDefault,
    onSuccess: () => refetch(),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <aside className="space-y-1">
          {[
            { key: 'profile', icon: <User size={16} />, label: 'Profile' },
            { key: 'addresses', icon: <MapPin size={16} />, label: 'Addresses' },
            { key: 'password', icon: <User size={16} />, label: 'Password' },
          ].map((item) => (
            <button key={item.key} onClick={() => setTab(item.key as any)} className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${tab === item.key ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-600'}`}>
              {item.icon}{item.label}
            </button>
          ))}
          <Link to="/account/orders" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 text-gray-600"><Package size={16} />Orders</Link>
          <Link to="/account/wishlist" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 text-gray-600"><Heart size={16} />Wishlist</Link>
        </aside>

        <div className="md:col-span-3 card p-6">
          {tab === 'profile' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <form onSubmit={handleSubmit((d) => updateProfile.mutate(d))} className="space-y-4">
                <Input label="Full Name" {...register('name')} />
                <Input label="Email" value={user?.email} disabled />
                <Input label="Phone" {...register('phone')} />
                <Button type="submit" loading={updateProfile.isPending}>Save Changes</Button>
              </form>
            </div>
          )}

          {tab === 'addresses' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
              <div className="space-y-3">
                {addresses.map((addr: any) => (
                  <div key={addr.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                    <div className="text-sm">
                      <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                      <p className="text-gray-500">{addr.city}, {addr.state} {addr.zip}, {addr.country}</p>
                      {addr.isDefault && <span className="text-xs text-green-600 font-medium">Default</span>}
                    </div>
                    <div className="flex gap-2">
                      {!addr.isDefault && <button onClick={() => setDefault.mutate(addr.id)} className="text-xs text-accent hover:underline">Set Default</button>}
                      <button onClick={() => deleteAddress.mutate(addr.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
                {!addresses.length && <p className="text-gray-500 text-sm">No addresses saved yet.</p>}
              </div>
            </div>
          )}

          {tab === 'password' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <ChangePasswordForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChangePasswordForm() {
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState('');
  const mutation = useMutation({
    mutationFn: (data: any) => authApi.changePassword(data),
    onSuccess: () => { setMsg('Password changed successfully'); reset(); },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
      <Input label="Current Password" type="password" {...register('currentPassword', { required: true })} />
      <Input label="New Password" type="password" {...register('newPassword', { required: true, minLength: 8 })} />
      {msg && <p className="text-sm text-green-600">{msg}</p>}
      <Button type="submit" loading={mutation.isPending}>Update Password</Button>
    </form>
  );
}
