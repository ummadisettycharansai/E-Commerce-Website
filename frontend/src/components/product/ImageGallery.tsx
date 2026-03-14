import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square cursor-zoom-in" onClick={() => setZoomed(!zoomed)}>
        <img src={images[active]} alt="Product" className={`w-full h-full object-cover transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`} />
        <button className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-lg"><ZoomIn size={16} /></button>
        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + images.length) % images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow"><ChevronLeft size={18} /></button>
            <button onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow"><ChevronRight size={18} /></button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)} className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === active ? 'border-primary' : 'border-transparent'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
