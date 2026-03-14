import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { addressesApi, paymentsApi, ordersApi } from '../../api/cart';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, total, clearItems } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const { register, handleSubmit } = useForm();

  const { data: addresses = [], refetch } = useQuery({ queryKey: ['addresses'], queryFn: addressesApi.getAddresses });

  const handleAddAddress = async (data: any) => {
    await addressesApi.addAddress({ ...data, isDefault: true });
    await refetch();
    setShowNewAddress(false);
  };

  const onSubmit = async () => {
    if (!stripe || !elements || !selectedAddress) { setError('Please select an address'); return; }
    setLoading(true);
    setError('');
    try {
      const { clientSecret } = await paymentsApi.createIntent(total());
      const card = elements.getElement(CardElement)!;
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
      if (stripeError) { setError(stripeError.message || 'Payment failed'); return; }
      const order = await ordersApi.createOrder({
        addressId: selectedAddress,
        stripePayId: paymentIntent?.id,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, size: i.size, color: i.color })),
      });
      clearItems();
      navigate(`/order-success/${order.id}`);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
        <div className="space-y-3">
          {addresses.map((addr: any) => (
            <label key={addr.id} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedAddress === addr.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="address" value={addr.id} checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="mt-1" />
              <div className="text-sm">
                <p className="font-medium">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                <p className="text-gray-500">{addr.city}, {addr.state} {addr.zip}, {addr.country}</p>
              </div>
            </label>
          ))}
          <button onClick={() => setShowNewAddress(!showNewAddress)} className="text-sm text-accent hover:underline">+ Add new address</button>
        </div>

        {showNewAddress && (
          <form onSubmit={handleSubmit(handleAddAddress)} className="mt-4 grid grid-cols-2 gap-3">
            <Input label="Address Line 1" {...register('line1', { required: true })} className="col-span-2" />
            <Input label="Address Line 2" {...register('line2')} className="col-span-2" />
            <Input label="City" {...register('city', { required: true })} />
            <Input label="State" {...register('state', { required: true })} />
            <Input label="ZIP Code" {...register('zip', { required: true })} />
            <Input label="Country" {...register('country', { required: true })} />
            <Button type="submit" size="sm" className="col-span-2">Save Address</Button>
          </form>
        )}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Payment</h2>
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#1a1a2e' } } }} />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <Button onClick={onSubmit} loading={loading} disabled={!selectedAddress} className="w-full" size="lg">
        Pay ${total().toFixed(2)}
      </Button>
    </div>
  );
}
