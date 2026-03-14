import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/product/FilterSidebar';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [filters, setFilters] = useState<any>({ category });
  const [page, setPage] = useState(1);

  const params = { ...filters, sizes: filters.sizes?.join(','), colors: filters.colors?.join(','), page };
  const { data, isLoading } = useQuery({ queryKey: ['products', params], queryFn: () => productsApi.getProducts(params) });

  const categoryName = category ? category.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>
      <div className="flex gap-8">
        <FilterSidebar filters={filters} onChange={(f) => { setFilters({ ...f, category }); setPage(1); }} />
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
