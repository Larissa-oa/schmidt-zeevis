/**
 * Reusable review card — used by ReviewsSection in both mobile and desktop views.
 */
import reviewIcon from "@/assets/review-icon.png";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
  style?: React.CSSProperties;
}

/** Softer, modern star icon with rounded points */
const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    stroke="currentColor"
    strokeWidth="1"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.5-6.3 4.5 2.3-7-6-4.6h7.6z" />
  </svg>
);

const ReviewCard = ({ review, className = "", style }: ReviewCardProps) => (
  <div
    className={`relative group bg-card rounded-2xl p-6 card-3d-border-review overflow-hidden ${className}`}
    style={style}
  >
    {/* Decorative background icon */}
    <img
      src={reviewIcon}
      alt=""
      className="absolute -top-4 -right-4 h-24 w-24 object-contain opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300"
    />

    {/* Quote mark accent */}
    <div className="absolute top-4 left-4 text-collection-circle/30 text-6xl font-serif leading-none">
      "
    </div>

    <div className="relative z-10">
      <div className="flex items-center gap-1 mb-4 pl-2 mt-8">
        {[...Array(review.rating)].map((_, i) => (
          <StarIcon
            key={i}
            className="h-5 w-5 text-accent-green drop-shadow-[0_1px_2px_hsl(var(--accent-green)/0.3)]"
          />
        ))}
        <span className="text-xs text-muted-foreground/70 font-medium flex items-baseline">
          <span className="font-semibold">{review.rating}</span>
          <span className="text-[10px] leading-none">&nbsp;op 5</span>
        </span>
      </div>
      <p className="text-muted-foreground mb-5 text-sm md:text-base leading-relaxed pl-2">
        {review.text}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="font-semibold text-foreground">{review.name}</span>
        <span className="text-xs text-muted-foreground">{review.date}</span>
      </div>
    </div>
  </div>
);

export { StarIcon };
export type { Review };
export default ReviewCard;
