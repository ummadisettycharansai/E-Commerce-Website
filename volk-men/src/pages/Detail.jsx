import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, ChevronLeft, Minus, Plus, Share2 } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedImg(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 text-center pb-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 btn-primary">BACK TO SHOP</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    // Add toast or direct to cart
  };

  return (
    <div className="pt-24 pb-20 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-8">
          <button onClick={() => navigate('/')} className="hover:text-gold">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/shop')} className="hover:text-gold uppercase">{product.category}</button>
          <ChevronRight size={12} />
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-white rounded-[8px] overflow-hidden shadow-sm group">
              <img 
                src={product.images[selectedImg]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <button 
                onClick={() => setSelectedImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setSelectedImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex space-x-4">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImg(i)}
                  className={`w-24 aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-gold shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-gold uppercase tracking-[0.2em]">{product.brand}</span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-navy mt-1">{product.name}</h1>
              </div>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-full transition-all ${isInWishlist(product.id) ? 'bg-gold text-navy shadow-lg' : 'bg-white text-navy hover:bg-gold hover:text-navy shadow-sm border border-charcoal/5'}`}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-charcoal/20"} />
                ))}
                <span className="ml-2 text-sm font-bold text-navy">{product.rating}</span>
              </div>
              <span className="text-charcoal/30 text-sm">|</span>
              <span className="text-charcoal/50 text-sm underline underline-offset-4 cursor-pointer hover:text-gold transition-colors">{product.reviewCount} Reviews</span>
            </div>

            <div className="flex items-end space-x-4 mb-8">
              <span className="text-3xl font-extrabold text-navy">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-charcoal/30 line-through font-medium">₹{product.originalPrice}</span>
                  <span className="bg-navy text-gold text-xs font-bold px-2 py-1 rounded-sm">SAVE {product.discountPercent}%</span>
                </>
              )}
            </div>

            <div className="space-y-8 mb-10">
              {/* Color Selection */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Color: <span className="text-charcoal/40">{selectedColor}</span></h4>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedColor === color ? 'border-gold p-1 scale-110' : 'border-transparent'}`}
                    >
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.toLowerCase() === 'navy' ? '#0A1628' : color.toLowerCase() }}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest">Select Size</h4>
                  <button className="text-[10px] font-bold text-gold border-b border-gold pb-0.5 tracking-tighter">SIZE GUIDE</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-12 flex items-center justify-center px-4 rounded-sm border-2 font-bold text-sm transition-all ${selectedSize === size ? 'bg-navy border-navy text-gold shadow-lg transform -translate-y-1' : 'bg-white border-charcoal/5 text-navy hover:border-gold'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-6">
                <h4 className="text-xs font-bold uppercase tracking-widest">Quantity</h4>
                <div className="flex items-center border border-charcoal/10 rounded-sm bg-white overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gold transition-colors border-r border-charcoal/5"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-gold transition-colors border-l border-charcoal/5"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:row gap-4 mb-10">
              <button 
                onClick={handleAddToCart}
                className="flex-[2] btn-primary flex items-center justify-center space-x-2 py-4"
              >
                <ShoppingBag size={20} />
                <span className="text-sm font-bold tracking-widest">ADD TO BAG</span>
              </button>
              <button className="flex-1 btn-secondary py-4 hover:bg-navy hover:text-white">
                BUY IT NOW
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-charcoal/5 pt-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck size={20} className="text-gold" />
                <span className="text-[10px] font-bold text-charcoal/50 leading-tight">FREE <br /> SHIPPING</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 border-x border-charcoal/5">
                <RotateCcw size={20} className="text-gold" />
                <span className="text-[10px] font-bold text-charcoal/50 leading-tight">15 DAY <br /> RETURNS</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheck size={20} className="text-gold" />
                <span className="text-[10px] font-bold text-charcoal/50 leading-tight">SECURE <br /> CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Full Info */}
        <div className="mt-20">
          <div className="flex border-b border-charcoal/5 mb-10 overflow-x-auto">
            {['Description', 'Material & Care', 'Shipping', 'Reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'border-gold text-navy' : 'border-transparent text-charcoal/40 hover:text-navy'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[8px] shadow-sm">
            {activeTab === 'description' && (
              <div className="max-w-3xl animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-6">Product Insight</h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {product.description}
                </p>
                <ul className="space-y-3 text-sm text-charcoal/60">
                  <li className="flex items-center"><ChevronRight size={14} className="text-gold mr-2" /> Fabric: {product.fabric}</li>
                  <li className="flex items-center"><ChevronRight size={14} className="text-gold mr-2" /> Fit: Slim Fit</li>
                  <li className="flex items-center"><ChevronRight size={14} className="text-gold mr-2" /> Model height: 6'1", wearing size M</li>
                </ul>
              </div>
            )}
            {activeTab === 'material & care' && (
              <div className="max-w-3xl animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-6">Material Details</h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {product.fabric}. Sourced from responsibly managed forests and produced in a closed-loop system that recycles water and solvents.
                </p>
                <h4 className="font-bold mb-4">Care Instructions</h4>
                <p className="text-charcoal/60 italic text-sm border-l-4 border-gold pl-4 py-2">
                  {product.careInstructions}
                </p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex flex-col md:row items-center gap-12 mb-16">
                  <div className="text-center">
                    <p className="text-6xl font-extrabold text-navy">{product.rating}</p>
                    <div className="flex justify-center mt-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-gold fill-gold" />)}
                    </div>
                    <p className="text-xs font-bold text-charcoal/40 mt-4 uppercase tracking-widest">Based on {product.reviewCount} Ratings</p>
                  </div>
                  <div className="flex-1 w-full space-y-3">
                    {[5,4,3,2,1].map(s => (
                      <div key={s} className="flex items-center space-x-4">
                        <span className="text-xs font-bold text-charcoal/60 w-4">{s}★</span>
                        <div className="flex-1 bg-offwhite h-2 rounded-full overflow-hidden">
                          <div className="bg-gold h-full" style={{ width: s === 5 ? '80%' : s === 4 ? '15%' : '5%' }}></div>
                        </div>
                        <span className="text-[10px] text-charcoal/40 font-bold w-6">{s === 5 ? '80%' : s === 4 ? '15%' : '5%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Items Carousel Placeholder */}
        <div className="mt-24">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Complete The Look</h2>
            <div className="flex space-x-2">
              <button className="p-2 border border-charcoal/10 rounded-sm hover:bg-navy hover:text-white transition-all"><ChevronLeft size={20}/></button>
              <button className="p-2 border border-charcoal/10 rounded-sm hover:bg-navy hover:text-white transition-all"><ChevronRight size={20}/></button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
               <div key={p.id} className="group cursor-pointer">
                 <div className="aspect-[3/4] overflow-hidden rounded-[8px] mb-4 bg-white relative">
                   <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <button className="absolute bottom-4 left-4 right-4 bg-navy/90 text-gold text-[10px] font-bold py-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">VIEW PIECE</button>
                 </div>
                 <h4 className="font-bold text-sm text-navy truncate">{p.name}</h4>
                 <p className="font-extrabold text-navy mt-1">₹{p.price}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
