import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/product/FilterSidebar';
import { SlidersHorizontal, X } from 'lucide-react';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>({ search: searchParams.get('search') || undefined });
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const params = { ...filters, sizes: filters.sizes?.join(','), colors: filters.colors?.join(','), page };
  const { data, isLoading } = useQuery({ queryKey: ['products', params], queryFn: () => productsApi.getProducts(params) });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          {data && <p className="text-sm text-gray-500 mt-1">{data.total} products found</p>}
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm">
          <SlidersHorizontal size={16} />Filters
        </button>
      </div>

      <div className="flex gap-8">
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
        </div>

        <div className="flex-1 min-w-0">
          <ProductGrid products={data?.products || []} loading={isLoading} />
          {data && data.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-primary text-white' : 'border border-gray-300 hover:border-primary'}`}>{p}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
