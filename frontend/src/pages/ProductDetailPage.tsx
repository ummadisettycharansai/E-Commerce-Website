import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { cartApi, wishlistApi } from '../api/cart';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import ImageGallery from '../components/product/ImageGallery';
import StarRating from '../components/ui/StarRating';
import Button from '../components/ui/Button';
import { Heart, Truck, RotateCcw, Shield } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['BLACK', 'WHITE', 'NAVY', 'GREY', 'BLUE', 'RED', 'GREEN', 'BROWN', 'BEIGE', 'OLIVE'];
const COLOR_HEX: Record<string, string> = { BLACK: '#000', WHITE: '#fff', NAVY: '#001f5b', GREY: '#808080', BLUE: '#1e90ff', RED: '#dc2626', GREEN: '#16a34a', BROWN: '#92400e', BEIGE: '#d4b896', OLIVE: '#6b7c3a' };

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem, toggleCart } = useCartStore();
  const { token, user } = useAuthStore();
  const qc = useQueryClient();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [wishlisted, setWishlisted] = useState(false);

  const { data: product, isLoading } = useQuery({ queryKey: ['product', slug], queryFn: () => productsApi.getProduct(slug!) });

  const addToCartMutation = useMutation({
    mutationFn: () => cartApi.addItem({ productId: product.id, quantity: qty, size: selectedSize, color: selectedColor }),
    onSuccess: (item) => { addItem(item); toggleCart(); },
  });

  const reviewMutation = useMutation({
    mutationFn: () => productsApi.addReview(product.id, { rating: reviewRating, comment: reviewComment }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['product', slug] }); setReviewComment(''); },
  });

  if (isLoading) return <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse"><div className="grid md:grid-cols-2 gap-12"><div className="bg-gray-200 aspect-square rounded-xl" /><div className="space-y-4"><div className="h-8 bg-gray-200 rounded w-3/4" /><div className="h-6 bg-gray-200 rounded w-1/4" /></div></div></div>;
  if (!product) return <div className="text-center py-24">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        <ImageGallery images={product.images} />

        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.brand} · {product.category?.name}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={Math.round(product.rating)} size={18} />
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {product.salePrice ? (
              <>
                <span className="text-3xl font-bold text-accent">${product.salePrice.toFixed(2)}</span>
                <span className="text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-accent/10 text-accent text-sm px-2 py-0.5 rounded-full font-medium">{Math.round((1 - product.salePrice / product.price) * 100)}% OFF</span>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div>
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-2 flex-wrap">
              {SIZES.filter((s) => product.sizes.includes(s)).map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${selectedSize === s ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:border-primary'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Color</p>
            <div className="flex gap-2 flex-wrap">
              {COLORS.filter((c) => product.colors.includes(c)).map((c) => (
                <button key={c} onClick={() => setSelectedColor(c)} title={c} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? 'border-primary scale-110' : 'border-gray-200'}`} style={{ backgroundColor: COLOR_HEX[c] }} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-50">-</button>
              <span className="px-4 py-2 font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-gray-50">+</button>
            </div>
            <Button onClick={() => addToCartMutation.mutate()} loading={addToCartMutation.isPending} disabled={!selectedSize || !selectedColor} className="flex-1">Add to Cart</Button>
            <button onClick={async () => { if (!token) return; wishlisted ? await wishlistApi.removeFromWishlist(product.id) : await wishlistApi.addToWishlist(product.id); setWishlisted(!wishlisted); }} className={`p-3 border rounded-lg hover:border-accent transition-colors ${wishlisted ? 'text-accent border-accent' : 'border-gray-300'}`}>
              <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {(!selectedSize || !selectedColor) && <p className="text-sm text-amber-600">Please select size and color</p>}

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[{ icon: <Truck size={16} />, text: 'Free shipping over $75' }, { icon: <RotateCcw size={16} />, text: '30-day returns' }, { icon: <Shield size={16} />, text: 'Secure checkout' }].map((f) => (
              <div key={f.text} className="flex flex-col items-center gap-1 text-center p-3 bg-gray-50 rounded-lg">
                <span className="text-primary">{f.icon}</span>
                <span className="text-xs text-gray-600">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {token && (
          <div className="card p-6 mb-6">
            <h3 className="font-semibold mb-3">Write a Review</h3>
            <StarRating rating={reviewRating} interactive onRate={setReviewRating} size={24} />
            <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Share your experience..." className="w-full mt-3 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none" rows={3} />
            <Button onClick={() => reviewMutation.mutate()} loading={reviewMutation.isPending} disabled={!reviewComment} size="sm" className="mt-3">Submit Review</Button>
          </div>
        )}
        <div className="space-y-4">
          {product.reviews?.map((r: any) => (
            <div key={r.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">{r.user.name[0]}</div>
                  <span className="font-medium text-sm">{r.user.name}</span>
                </div>
                <StarRating rating={r.rating} size={14} />
              </div>
              <p className="text-sm text-gray-600">{r.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
