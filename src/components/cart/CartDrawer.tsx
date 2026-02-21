/**
 * Cart drawer — slide-out panel showing cart contents.
 * Sub-components: CartItemRow, CartUpsellItem.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { products, Product } from "@/data/collections";
import QuickAddModal from "@/components/products/QuickAddModal";
import CartItemRow from "./CartItemRow";
import CartUpsellItem from "./CartUpsellItem";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    toggleVacuumSealing,
    cartTotal,
  } = useCart();

  const [selectedUpsellProduct, setSelectedUpsellProduct] = useState<Product | null>(null);

  useBodyScrollLock(isCartOpen);

  // Upsell: random products not already in cart
  const cartProductIds = items.map((item) => item.product.id);
  const upsellProducts = products
    .filter((p) => !cartProductIds.includes(p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-foreground/40 z-[45]"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 md:top-[7rem] h-full md:h-[calc(100vh-7rem)] w-full max-w-md bg-card z-50 shadow-float animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Winkelwagen</h2>
            <span className="text-sm text-muted-foreground">({items.length} items)</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Je winkelwagen is leeg</h3>
              <p className="text-sm text-muted-foreground mb-4">Ontdek onze verse producten</p>
              <Button onClick={() => setIsCartOpen(false)} asChild>
                <Link to="/collections/alle-producten">Bekijk Producten</Link>
              </Button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItemRow
                  key={`${item.product.id}-${item.selectedOption}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onToggleVacuum={toggleVacuumSealing}
                />
              ))}

              {/* Upsell */}
              {upsellProducts.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Klanten kochten ook</h3>
                  </div>
                  <div className="space-y-2">
                    {upsellProducts.map((product) => (
                      <CartUpsellItem
                        key={product.id}
                        product={product}
                        onSelect={setSelectedUpsellProduct}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotaal</span>
              <span className="text-xl font-bold text-foreground">€{cartTotal.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={() => setIsCartOpen(false)} asChild>
              <Link to="/cart">Naar Checkout</Link>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setIsCartOpen(false)}>
              Verder winkelen
            </Button>
          </div>
        )}
      </div>

      {/* Quick Add Modal for upsell */}
      {selectedUpsellProduct && (
        <QuickAddModal
          product={selectedUpsellProduct}
          isOpen={!!selectedUpsellProduct}
          onClose={() => setSelectedUpsellProduct(null)}
        />
      )}
    </>
  );
};

export default CartDrawer;
