import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

interface Props { products: any[]; loading?: boolean; }

export default function ProductGrid({ products, loading }: Props) {
  if (loading) return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );

  if (!products.length) return (
    <div className="text-center py-16 text-gray-500">
      <p className="text-lg">No products found</p>
      <p className="text-sm mt-1">Try adjusting your filters</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
