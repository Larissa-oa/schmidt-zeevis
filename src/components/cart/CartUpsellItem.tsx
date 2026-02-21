/**
 * Upsell product row inside the cart drawer.
 */
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/collections";
import { getProductImage } from "@/data/productImageMap";

interface CartUpsellItemProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const CartUpsellItem = ({ product, onSelect }: CartUpsellItemProps) => (
  <div className="flex items-center gap-2 p-1.5 bg-card rounded-lg border border-border">
    <img
      src={getProductImage(product)}
      alt={product.name}
      className="w-10 h-10 object-cover rounded-md"
    />
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h4>
      <p className="text-sm text-primary font-bold">€{product.price.toFixed(2)}</p>
    </div>
    <Button size="sm" variant="outline" onClick={() => onSelect(product)}>
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

export default CartUpsellItem;
