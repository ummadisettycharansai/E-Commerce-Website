import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../../api/products';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['BLACK', 'WHITE', 'NAVY', 'GREY', 'BLUE', 'RED', 'GREEN', 'BROWN', 'BEIGE', 'OLIVE'];
const COLOR_MAP: Record<string, string> = {
  BLACK: '#000', WHITE: '#fff', NAVY: '#001f5b', GREY: '#808080',
  BLUE: '#1e90ff', RED: '#dc2626', GREEN: '#16a34a', BROWN: '#92400e', BEIGE: '#d4b896', OLIVE: '#6b7c3a',
};

interface Filters { category?: string; brand?: string; sizes?: string[]; colors?: string[]; minPrice?: number; maxPrice?: number; sort?: string; }
interface Props { filters: Filters; onChange: (f: Filters) => void; }

export default function FilterSidebar({ filters, onChange }: Props) {
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.getCategories });

  const toggle = (key: 'sizes' | 'colors', val: string) => {
    const arr = filters[key] || [];
    onChange({ ...filters, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] });
  };

  return (
    <aside className="w-64 shrink-0 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <ul className="space-y-1">
          <li><button onClick={() => onChange({ ...filters, category: undefined })} className={`text-sm w-full text-left py-1 px-2 rounded hover:bg-gray-100 ${!filters.category ? 'font-medium text-primary' : 'text-gray-600'}`}>All</button></li>
          {categories.map((c: any) => (
            <li key={c.id}><button onClick={() => onChange({ ...filters, category: c.slug })} className={`text-sm w-full text-left py-1 px-2 rounded hover:bg-gray-100 ${filters.category === c.slug ? 'font-medium text-primary' : 'text-gray-600'}`}>{c.name}</button></li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => toggle('sizes', s)} className={`px-3 py-1 text-sm border rounded-lg transition-colors ${(filters.sizes || []).includes(s) ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:border-primary'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button key={c} onClick={() => toggle('colors', c)} title={c} className={`w-7 h-7 rounded-full border-2 transition-all ${(filters.colors || []).includes(c) ? 'border-primary scale-110' : 'border-gray-200'}`} style={{ backgroundColor: COLOR_MAP[c] }} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={(e) => onChange({ ...filters, minPrice: +e.target.value || undefined })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          <span className="text-gray-400">-</span>
          <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={(e) => onChange({ ...filters, maxPrice: +e.target.value || undefined })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <select value={filters.sort || ''} onChange={(e) => onChange({ ...filters, sort: e.target.value || undefined })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <button onClick={() => onChange({})} className="w-full text-sm text-accent hover:underline">Clear All Filters</button>
    </aside>
  );
}
