import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Hero = () => (
  <section className="relative h-[85vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-navy">
      <img 
        src="https://placehold.co/1920x1080/0A1628/white?text=M+ALL+HERO" 
        alt="Hero Banner" 
        className="w-full h-full object-cover opacity-50"
      />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 lg:px-8 w-full z-10">
      <div className="max-w-xl animate-in fade-in slide-in-from-left-8 duration-1000">
        <h2 className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">New Arrivals</h2>
        <h1 className="text-5xl md:text-7xl text-offwhite font-extrabold mb-6 leading-tight">
          Built for the <br /> <span className="text-gold">Bold.</span>
        </h1>
        <p className="text-offwhite/80 text-lg mb-8 max-w-md">
          Experience premium craftsmanship and timeless style. Discover the collection that defines modern masculinity.
        </p>
        <div className="flex space-x-4">
          <Link to="/shop" className="btn-primary flex items-center">
            SHOP NOW <ArrowRight className="ml-2" size={18} />
          </Link>
          <Link to="/#story" className="btn-secondary text-offwhite border-offwhite hover:bg-offwhite hover:text-navy" onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
            OUR STORY
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const CategoryGrid = () => (
  <section className="py-20 bg-offwhite">
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl mb-4">Explore Categories</h2>
        <div className="w-20 h-1 bg-gold mx-auto"></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.slice(0, 6).map((cat) => (
          <Link 
            key={cat} 
            to={`/shop?category=${cat}`}
            className="group relative h-64 md:h-80 overflow-hidden rounded-[8px] shadow-sm"
          >
            <img 
              src={`https://placehold.co/600x800/2D2D2D/white?text=${cat}`} 
              alt={cat} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl text-offwhite font-bold mb-1">{cat}</h3>
                <span className="text-gold text-sm font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  SHOP NOW <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const TrendingProducts = () => {
  const trending = PRODUCTS.filter(p => p.isTrending).slice(0, 4);
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <p className="text-charcoal/60 mt-2">The most wanted styles this season.</p>
          </div>
          <Link to="/shop" className="text-navy font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trending.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] mb-4">
                {product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded-sm">
                    {product.discountPercent}% OFF
                  </span>
                )}
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img 
                  src={product.images[1]} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full bg-navy text-white text-xs font-bold py-3 hover:bg-gold hover:text-navy transition-colors">
                    QUICK ADD
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-navy hover:text-gold transition-colors truncate">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-charcoal/40 text-sm line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center text-xs text-charcoal/60">
                  <Star size={12} className="text-gold fill-gold mr-1" />
                  {product.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandStory = () => (
  <section id="story" className="py-24 bg-navy text-offwhite overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 items-center gap-16">
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
        <img 
          src="https://placehold.co/600x400/2D2D2D/white?text=Our+Craftsmanship" 
          alt="Craft" 
          className="rounded-[8px] shadow-2xl relative z-10"
        />
        <div className="absolute -bottom-6 -right-6 bg-gold p-8 rounded-sm hidden lg:block z-20 shadow-xl">
          <p className="text-navy font-bold text-2xl">10+ Years</p>
          <p className="text-navy/70 text-sm uppercase tracking-wider">Of Excellence</p>
        </div>
      </div>
      <div>
        <h2 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Our Heritage</h2>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Meticulously Crafted <br /> For The Modern Man</h2>
        <p className="text-offwhite/60 text-lg leading-relaxed mb-8">
          At M all, we believe that style is a reflection of character. Our journey began with a simple mission: to provide premium, well-fitted clothing that exudes confidence and sophistication.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-gold font-bold text-xl mb-2">Quality</h4>
            <p className="text-offwhite/40 text-sm">Finest fabrics sourced globally from ethical mills.</p>
          </div>
          <div>
            <h4 className="text-gold font-bold text-xl mb-2">Precision</h4>
            <p className="text-offwhite/40 text-sm">Every stitch and button placed with absolute care.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Team = () => (
  <section id="team" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">The Visionaries</h2>
        <h2 className="text-4xl font-extrabold text-navy mb-4">Meet Our Leadership</h2>
        <div className="w-20 h-1 bg-gold mx-auto"></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Charan Sai", role: "Founder", image: "https://placehold.co/400x500/0A1628/C9A84C?text=Charan+Sai" },
          { name: "Abhiram", role: "CEO", image: "https://placehold.co/400x500/2D2D2D/C9A84C?text=Abhiram" },
          { name: "Ganesh", role: "Creative Lead", image: "https://placehold.co/400x500/0A1628/C9A84C?text=Ganesh" },
          { name: "Nikitha", role: "Brand Manager", image: "https://placehold.co/400x500/2D2D2D/C9A84C?text=Nikitha" }
        ].map((member, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] mb-6 grayscale hover:grayscale-0 transition-all duration-700">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-xl font-bold text-navy text-center">{member.name}</h3>
            <p className="text-gold text-xs font-bold uppercase tracking-widest text-center mt-2">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-offwhite">
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-16 underline decoration-gold underline-offset-8">Words of Approval</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Vikram S.", review: "The fit of the Oxford shirt is unparalleled. Finally, a brand that understands the urban man's build.", role: "Architect" },
          { name: "Rahul M.", review: "Exceptional quality. The blazer feels like a bespoke piece. M all is now my go-to for formals.", role: "Manager" },
          { name: "Arjun K.", review: "Fast delivery and premium packaging. The leather jacket is a masterpiece. Highly recommended!", role: "Product Designer" }
        ].map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-[8px] shadow-sm relative italic">
            <div className="text-gold text-4xl absolute top-4 left-6 opacity-20">"</div>
            <p className="text-charcoal/80 mb-6 relative z-10 leading-relaxed text-sm">
              {t.review}
            </p>
            <div>
              <p className="font-bold text-navy not-italic">{t.name}</p>
              <p className="text-charcoal/40 text-[10px] uppercase tracking-widest not-italic">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-12 bg-navy border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹999" },
        { icon: RotateCcw, title: "15-Day Returns", desc: "Hassle-free exchange policy" },
        { icon: ShieldCheck, title: "Secure Payment", desc: "PCI-compliant checkout" }
      ].map((f, i) => (
        <div key={i} className="flex items-center space-x-4 text-offwhite border-r border-white/5 last:border-0 pr-8">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <f.icon size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide">{f.title}</h4>
            <p className="text-offwhite/40 text-xs">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
      <CategoryGrid />
      <TrendingProducts />
      <BrandStory />
      <Team />
      <Testimonials />
      
      {/* Newsletter Signup is already in Footer but we can add a bigger one if needed */}
      <section className="py-24 bg-gold relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-navy mb-6">Join The Elite.</h2>
          <p className="text-navy/70 text-lg mb-8">Sign up for our newsletter to receive styling tips, trend reports, and 10% off your first purchase.</p>
          <div className="flex flex-col sm:row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-navy/5 border-2 border-navy/10 px-6 py-4 rounded-sm focus:outline-none focus:border-navy text-navy w-full placeholder:text-navy/40"
            />
            <button className="bg-navy text-gold px-10 py-4 font-bold rounded-sm hover:bg-navy/90 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-navy/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
