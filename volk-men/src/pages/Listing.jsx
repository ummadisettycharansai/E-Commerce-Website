import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, Star, Heart, ShoppingBag, X, LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES, COLORS, SIZES } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Filters from URL
  const activeCategory = searchParams.get('category');
  const activeColor = searchParams.get('color');
  const activePriceRange = searchParams.get('price');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeColor) {
      result = result.filter(p => p.colors.includes(activeColor));
    }
    if (activePriceRange) {
      const [min, max] = activePriceRange.split('-').map(Number);
      result = result.filter(p => p.price >= min && p.price <= (max || Infinity));
    }

    // Sort
    if (sortBy === 'price-low-high') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high-low') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'popular') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, activeColor, activePriceRange, sortBy, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeColor, activePriceRange, sortBy, searchQuery]);

  const toggleFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="pt-24 pb-20 bg-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Search Bar */}
        <div className="mb-10 relative group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30 group-focus-within:text-gold transition-colors" size={20} />
           <input 
             type="text" 
             placeholder="Search our premium collection (e.g. Denim, Shirts, Suits)..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-white border border-charcoal/5 rounded-[8px] py-6 pl-16 pr-6 shadow-sm outline-none focus:border-gold/30 focus:ring-4 focus:ring-gold/5 transition-all text-sm font-medium"
           />
           {searchQuery && (
             <button onClick={() => setSearchQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-navy">
               <X size={18} />
             </button>
           )}
        </div>

        {/* Header/Breadcrumbs */}
        <div className="flex flex-col md:row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy">
              {activeCategory ? activeCategory : 'All Collection'}
            </h1>
            <p className="text-charcoal/50 text-sm mt-1">Showing {filteredProducts.length} premium pieces</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-navy text-white px-4 py-2 rounded-sm text-sm"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-sm shadow-sm border border-charcoal/5">
              <span className="text-xs font-bold text-charcoal/40 uppercase tracking-wider">Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="popular">Popularity</option>
              </select>
            </div>
            
            <div className="hidden md:flex border border-charcoal/10 rounded-sm overflow-hidden shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-navy text-gold' : 'bg-white text-charcoal/40'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-navy text-gold' : 'bg-white text-charcoal/40'}`}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-64 space-y-10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold uppercase tracking-widest text-xs">Categories</h3>
                {activeCategory && (
                  <button onClick={() => toggleFilter('category', activeCategory)} className="text-[10px] text-gold font-bold">CLEAR</button>
                )}
              </div>
              <div className="space-y-3">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={activeCategory === cat}
                      onChange={() => toggleFilter('category', cat)}
                    />
                    <div className={`w-4 h-4 border border-navy/20 mr-3 flex items-center justify-center transition-colors ${activeCategory === cat ? 'bg-navy border-navy' : 'group-hover:border-gold'}`}>
                      {activeCategory === cat && <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>}
                    </div>
                    <span className={`text-sm ${activeCategory === cat ? 'font-bold text-navy' : 'text-charcoal/60 group-hover:text-navy transition-colors'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-6">Price Range</h3>
              <div className="space-y-3">
                {[
                  { label: "Under ₹1,000", value: "0-1000" },
                  { label: "₹1,000 - ₹3,000", value: "1000-3000" },
                  { label: "₹3,000 - ₹5,000", value: "3000-5000" },
                  { label: "Over ₹5,000", value: "5000-100000" }
                ].map(range => (
                  <button 
                    key={range.value}
                    onClick={() => toggleFilter('price', range.value)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded-sm transition-all ${activePriceRange === range.value ? 'bg-navy text-gold font-bold' : 'text-charcoal/60 hover:bg-white hover:text-navy'}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-6">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {COLORS.slice(0, 8).map(color => (
                  <button 
                    key={color}
                    onClick={() => toggleFilter('color', color)}
                    title={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-90 ${activeColor === color ? 'border-gold shadow-lg scale-110' : 'border-transparent shadow-sm'}`}
                    style={{ backgroundColor: color === 'Navy' ? '#0A1628' : color.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="bg-navy p-6 rounded-[8px] text-offwhite relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-gold font-bold mb-2">Need Help?</h4>
                <p className="text-xs text-white/60 mb-4">Our styling experts are available 24/7 to assist you.</p>
                <button className="w-full bg-white text-navy text-[10px] font-bold py-2 rounded-sm hover:bg-gold transition-colors">CHAT NOW</button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold/10 rounded-full"></div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            {paginatedProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                {paginatedProducts.map((product) => (
                  <div key={product.id} className={`group bg-white rounded-[8px] shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 flex ${viewMode === 'list' ? 'row h-64' : 'flex-col'}`}>
                    {/* Image Area */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64' : 'aspect-[3/4]'}`}>
                      {product.discountPercent > 0 && (
                        <div className="absolute top-4 left-4 z-10 bg-gold text-navy text-[10px] font-bold px-2.5 py-1 rounded-sm shadow-md">
                          -{product.discountPercent}%
                        </div>
                      )}
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${isInWishlist(product.id) ? 'bg-gold text-navy' : 'bg-white/80 text-navy hover:bg-gold hover:text-navy shadow-sm'}`}
                      >
                        <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                      </button>
                      <Link to={`/product/${product.id}`} className="block h-full">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                        />
                        <img 
                          src={product.images[1]} 
                          alt={product.name} 
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        />
                      </Link>
                      <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                        <button 
                          onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                          className="flex-1 bg-navy text-gold text-[10px] font-bold py-3 hover:bg-gold hover:text-navy transition-colors flex items-center justify-center space-x-2"
                        >
                          <ShoppingBag size={14} />
                          <span>QUICK ADD</span>
                        </button>
                      </div>
                    </div>

                    {/* Info Area */}
                    <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">{product.category}</span>
                          <div className="flex items-center text-[10px] font-bold text-charcoal/60 bg-offwhite px-2 py-0.5 rounded-full">
                            <Star size={10} className="text-gold fill-gold mr-1" />
                            {product.rating}
                          </div>
                        </div>
                        <h3 className="font-bold text-navy text-lg group-hover:text-gold transition-colors truncate">
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className={`text-charcoal/60 text-sm mt-3 line-clamp-2 ${viewMode === 'list' ? 'block' : 'hidden'}`}>
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-end justify-between">
                        <div className="flex flex-col">
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-charcoal/30 line-through font-bold">₹{product.originalPrice}</span>
                          )}
                          <span className="text-xl font-extrabold text-navy tracking-tight">₹{product.price}</span>
                        </div>
                        <div className="flex -space-x-1">
                          {product.colors.slice(0, 3).map(c => (
                            <div key={c} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: c.toLowerCase() === 'navy' ? '#0A1628' : c.toLowerCase() }}></div>
                          ))}
                          {product.colors.length > 3 && <span className="text-[8px] font-bold text-charcoal/40 ml-2">+{product.colors.length - 3}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-[8px] border-2 border-dashed border-charcoal/10">
                <div className="w-16 h-16 bg-offwhite rounded-full flex items-center justify-center mx-auto mb-4 text-charcoal/20">
                  <Filter size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy">No pieces found</h3>
                <p className="text-charcoal/50 mt-2">Try adjusting your filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="mt-6 btn-primary">CLEAR ALL FILTERS</button>
              </div>
            )}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center space-x-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className={`px-4 h-10 flex items-center justify-center rounded-sm font-bold shadow-sm transition-all ${currentPage === 1 ? 'bg-charcoal/5 text-charcoal/20 cursor-not-allowed' : 'bg-white text-navy hover:bg-gold'}`}
                >
                  PREV
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-sm font-bold shadow-sm transition-all ${currentPage === i + 1 ? 'bg-navy text-gold' : 'bg-white text-navy hover:bg-gold'}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`px-4 h-10 flex items-center justify-center rounded-sm font-bold shadow-sm transition-all ${currentPage === totalPages ? 'bg-charcoal/5 text-charcoal/20 cursor-not-allowed' : 'bg-white text-navy hover:bg-gold'}`}
                >
                  NEXT
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm pointer-events-auto" onClick={() => setIsSidebarOpen(false)}></div>
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            className="absolute top-0 right-0 h-full w-[85%] bg-offwhite shadow-2xl p-6 pointer-events-auto flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-navy">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-8 pb-10">
              {/* Reuse Desktop Sidebar components here but simplified */}
              <div>
                <h3 className="font-bold text-sm mb-4">CATEGORIES</h3>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => toggleFilter('category', cat)}
                      className={`py-2 px-3 rounded-sm text-xs border transition-all ${activeCategory === cat ? 'bg-navy border-navy text-gold font-bold' : 'bg-white border-charcoal/10 text-charcoal/60'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-sm mb-4">PRICE RANGE</h3>
                <div className="space-y-3">
                  {["0-1000", "1000-3000", "3000-5000", "5000-100000"].map(range => (
                    <button 
                      key={range}
                      onClick={() => toggleFilter('price', range)}
                      className={`flex justify-between items-center w-full p-4 rounded-sm border ${activePriceRange === range ? 'bg-navy border-navy text-gold ring-2 ring-gold/20' : 'bg-white border-charcoal/10'}`}
                    >
                      <span className="text-sm font-semibold">{range === '0-1000' ? 'Under ₹1000' : range === '5000-100000' ? 'Above ₹5000' : `₹${range.split('-')[0]} - ₹${range.split('-')[1]}`}</span>
                      {activePriceRange === range && <div className="w-2 h-2 bg-gold rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-full bg-navy text-gold py-4 font-bold shadow-xl"
            >
              SHOW RESULTS
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Listing;
