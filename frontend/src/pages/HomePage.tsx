import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '../api/products';
import ProductGrid from '../components/product/ProductGrid';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const { data: featuredData, isLoading } = useQuery({ queryKey: ['products', 'featured'], queryFn: () => productsApi.getProducts({ featured: 'true', limit: 8 }) });
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.getCategories });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
          <p className="text-accent font-medium mb-3 tracking-widest text-sm uppercase">New Collection 2024</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Dress Like<br />You Mean It</h1>
          <p className="text-white/70 text-lg mb-8 max-w-md">Premium men's fashion for every occasion. From casual to formal, we've got you covered.</p>
          <div className="flex gap-4">
            <Link to="/shop" className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors">Shop Now</Link>
            <Link to="/shop?featured=true" className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">View Lookbook</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Truck size={24} />, title: 'Free Shipping', desc: 'On orders over $75' },
            { icon: <RotateCcw size={24} />, title: 'Easy Returns', desc: '30-day return policy' },
            { icon: <Shield size={24} />, title: 'Secure Payment', desc: 'SSL encrypted checkout' },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="text-accent">{f.icon}</div>
              <div><p className="font-semibold">{f.title}</p><p className="text-sm text-gray-500">{f.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/shop" className="text-accent text-sm flex items-center gap-1 hover:underline">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat: any) => (
            <Link key={cat.id} to={`/shop/${cat.slug}`} className="group relative overflow-hidden rounded-xl aspect-square">
              <img src={cat.image || 'https://via.placeholder.com/300'} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white font-semibold">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/shop?featured=true" className="text-accent text-sm flex items-center gap-1 hover:underline">View All <ArrowRight size={14} /></Link>
        </div>
        <ProductGrid products={featuredData?.products || []} loading={isLoading} />
      </section>

      {/* Banner */}
      <section className="bg-accent text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-3">End of Season Sale</h2>
          <p className="text-white/80 mb-6">Up to 50% off on selected items. Limited time only.</p>
          <Link to="/shop" className="bg-white text-accent px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">Shop Sale</Link>
        </div>
      </section>
    </div>
  );
}
