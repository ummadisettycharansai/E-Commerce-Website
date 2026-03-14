import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '../../api/cart';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import StarRating from '../../components/ui/StarRating';

export default function WishlistPage() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: ['wishlist'], queryFn: wishlistApi.getWishlist });

  const remove = useMutation({
    mutationFn: (productId: string) => wishlistApi.removeFromWishlist(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  if (isLoading) return <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-xl" />)}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({items.length})</h1>
      {!items.length ? (
        <div className="text-center py-16 text-gray-500">
          <p>Your wishlist is empty</p>
          <Link to="/shop" className="text-accent hover:underline text-sm mt-2 block">Discover Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item: any) => (
            <div key={item.id} className="card overflow-hidden group">
              <div className="relative">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-48 object-cover" />
                <button onClick={() => remove.mutate(item.product.id)} className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
              <div className="p-3">
                <Link to={`/product/${item.product.slug}`} className="font-medium text-sm hover:text-accent line-clamp-1">{item.product.name}</Link>
                <StarRating rating={Math.round(item.product.rating)} size={12} />
                <p className="font-bold mt-1">{item.product.salePrice ? <><span className="text-accent">${item.product.salePrice.toFixed(2)}</span> <span className="text-xs text-gray-400 line-through">${item.product.price.toFixed(2)}</span></> : `$${item.product.price.toFixed(2)}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
