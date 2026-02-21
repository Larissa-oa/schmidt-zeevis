/**
 * Single cart item row — extracted from CartDrawer for reusability and readability.
 */
import { Plus, Minus, Trash2, Package } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CartItem } from "@/hooks/useCart";
import { getProductImage } from "@/data/productImageMap";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, selectedOption: string, quantity: number) => void;
  onRemove: (productId: string, selectedOption: string) => void;
  onToggleVacuum: (productId: string, selectedOption: string) => void;
}

const CartItemRow = ({ item, onUpdateQuantity, onRemove, onToggleVacuum }: CartItemRowProps) => {
  const itemTotal = (item.product.price * item.quantity) + (item.vacuumSealing ? 1.5 * item.quantity : 0);

  return (
    <div className="flex gap-2.5 p-2.5 bg-secondary/50 rounded-xl">
      <img
        src={getProductImage(item.product)}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground text-sm line-clamp-1">
          {item.product.name}
        </h4>
        <p className="text-xs text-muted-foreground">{item.selectedOption}</p>

        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <Checkbox
            checked={item.vacuumSealing}
            onCheckedChange={() => onToggleVacuum(item.product.id, item.selectedOption)}
            className="h-4 w-4"
          />
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Package className="h-3 w-3" />
            Vacuüm verpakken (+€1,50)
          </span>
        </label>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 bg-card rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.selectedOption, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-secondary rounded-l-lg transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.selectedOption, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-secondary rounded-r-lg transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">€{itemTotal.toFixed(2)}</span>
            <button
              onClick={() => onRemove(item.product.id, item.selectedOption)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
