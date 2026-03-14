import { Star } from 'lucide-react';

interface Props { rating: number; interactive?: boolean; onRate?: (r: number) => void; size?: number; }

export default function StarRating({ rating, interactive, onRate, size = 16 }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
}
