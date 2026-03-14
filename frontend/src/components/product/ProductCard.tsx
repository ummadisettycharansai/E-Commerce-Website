import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import StarRating from '../ui/StarRating';
import { useCartStore } from '../../store/cartStore';
import { cartApi } from '../../api/cart';
import { wishlistApi } from '../../api/cart';
import { useAuthStore } from '../../store/authStore';

interface Product {
  id: string; name: string; slug: string; price: number; salePrice?: number;
  images: string[]; rating: number; reviewCount?: number; brand: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleCart } = useCartStore();
  const { token } = useAuthStore();
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) return;
    setAdding(true);
    try {
      const item = await cartApi.addItem({ productId: product.id, quantity: 1, size: 'M', color: 'BLACK' });
      addItem(item);
      toggleCart();
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) return;
    if (wishlisted) { await wishlistApi.removeFromWishlist(product.id); setWishlisted(false); }
    else { await wishlistApi.addToWishlist(product.id); setWishlisted(true); }
  };

  return (
    <Link to={`/product/${product.slug}`} className="card overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.salePrice && (
          <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">SALE</span>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:scale-110 transition-transform ${wishlisted ? 'text-accent' : 'text-gray-400'}`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="absolute bottom-0 left-0 right-0 bg-primary text-white py-2.5 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform"
        >
          {adding ? 'Adding...' : 'Quick Add'}
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <StarRating rating={Math.round(product.rating)} size={12} />
          {product.reviewCount !== undefined && <span className="text-xs text-gray-500">({product.reviewCount})</span>}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {product.salePrice ? (
            <>
              <span className="font-bold text-accent">${product.salePrice.toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
