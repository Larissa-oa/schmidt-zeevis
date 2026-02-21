import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/data/collections";
import { getProductImage } from "@/data/productImageMap";
import QuickAddModal from "./QuickAddModal";
import groeneVisIcon from "@/assets/Groene-vis.png";

interface ProductCardProps {
  product: Product;
}

const SeasonalityBadge = ({ 
  seasonality, 
  hasSchmidtsTag 
}: { 
  seasonality: Product["seasonality"];
  hasSchmidtsTag: boolean;
}) => {
  if (seasonality !== "in-season") return null;

  // Position: beside Schmidt's tag when present; otherwise top-left
  const leftPosition = hasSchmidtsTag ? "left-[9.5rem] sm:left-[9.6rem]" : "left-3";

  return (
    <div className={`absolute top-3 ${leftPosition} z-20`}>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="relative w-6 h-6 rounded-full group/season overflow-hidden bg-accent-green/55 border-2 border-accent-green/70 hover:border-accent-green shadow-[0_0_0_1px_hsl(var(--accent-green)/0.2)] hover:shadow-[0_0_8px_hsl(var(--accent-green)/0.4)] transition-all duration-200 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <img
              src={groeneVisIcon}
              alt="In seizoen"
              className="h-3.5 w-3.5 object-contain object-center scale-x-[-1]"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={16}
          className="max-w-[min(20rem,calc(100vw-2rem))] w-56 sm:w-64 p-4 border-2 border-accent-green/30 rounded-lg shadow-xl bg-popover text-left"
        >
          <h4 className="text-sm font-semibold text-accent-green mb-1.5 flex items-center gap-2">
            <img src={groeneVisIcon} alt="" className="h-4 w-4 object-contain flex-shrink-0 scale-x-[-1]" />
            In seizoen
          </h4>
          <p className="text-xs text-popover-foreground leading-relaxed">
            Dit product is nu op z'n best: het is het juiste seizoen, dus vers en van topkwaliteit. Ideaal om nu te bestellen.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const SchmidtsChoiceBadge = ({ isSchmidtsChoice }: { isSchmidtsChoice?: boolean }) => {
  if (!isSchmidtsChoice) return null;

  return (
    <div className="absolute top-3 left-3 z-20">
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            Schmidt's Keuze
            <Info className="h-3 w-3 opacity-90" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={16}
          className="max-w-[min(20rem,calc(100vw-2rem))] w-48 sm:w-56 p-3.5 border-2 border-border rounded-lg shadow-xl bg-popover text-left"
        >
          <p className="text-xs text-popover-foreground leading-relaxed">
            Onze favoriete selectie van premium kwaliteit vis en zeevruchten.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-card rounded-xl overflow-visible border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-secondary rounded-t-xl">
          <Link to={`/products/${product.slug}`} className="block w-full h-full overflow-hidden rounded-t-xl">
            <img
              src={getProductImage(product)}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <SchmidtsChoiceBadge isSchmidtsChoice={product.rating >= 4.8} />
          <SeasonalityBadge 
            seasonality={product.seasonality} 
            hasSchmidtsTag={product.rating >= 4.8}
          />
        </div>

        {/* Content */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-b-xl">
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Price Row with Add Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-accent-green">vanaf</span>
              <span className="text-lg font-bold text-foreground">
                €{product.price.toFixed(2)}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-2 border-primary bg-transparent hover:bg-primary/10 text-primary hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <QuickAddModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
