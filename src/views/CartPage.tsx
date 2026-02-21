"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag, Package, ArrowRight, Truck, ShoppingCart } from "lucide-react";
import SEO from "@/components/seo/SEO";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCart } from "@/hooks/useCart";
import { products, Product } from "@/data/collections";
import { getProductImage } from "@/data/productImageMap";
import QuickAddModal from "@/components/products/QuickAddModal";
import reviewIcon from "@/assets/review-icon.png";

/** Full-page cart with order summary and upsell slider. */
const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    toggleVacuumSealing,
    cartTotal,
  } = useCart();

  const [selectedUpsellProduct, setSelectedUpsellProduct] = useState<Product | null>(null);

  const cartProductIds = items.map(item => item.product.id);
  const upsellProducts = products
    .filter(p => !cartProductIds.includes(p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const shippingCost = cartTotal >= 200 ? 0 : 6.95;
  const freeShippingRemaining = Math.max(0, 200 - cartTotal);

  return (
    <PageLayout mainClassName="bg-background py-8">
      <SEO
        title="Winkelwagen"
        description="Bekijk uw winkelwagen bij Schmidt Zeevis en rond uw bestelling af."
        canonical="/cart"
      />
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Winkelwagen</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          Winkelwagen
          <img src={reviewIcon} alt="Review icon" className="h-16 w-16 object-contain -ml-4" />
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground/30 mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Je winkelwagen is leeg</h2>
            <p className="text-muted-foreground mb-6">Ontdek onze verse producten en voeg ze toe aan je winkelwagen</p>
            <Button size="lg" asChild>
              <Link to="/collections/alle-producten">
                Bekijk Producten
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {freeShippingRemaining > 0 && (
                <div className="bg-secondary/50 rounded-xl p-4 flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      Nog <span className="font-bold">€{freeShippingRemaining.toFixed(2)}</span> voor gratis verzending!
                    </p>
                    <div className="w-full bg-border rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (cartTotal / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {items.map((item) => {
                const itemTotal = (item.product.price * item.quantity) + (item.vacuumSealing ? 1.5 * item.quantity : 0);
                return (
                  <div
                    key={`${item.product.id}-${item.selectedOption}`}
                    className="flex gap-2.5 md:gap-3 p-2.5 md:p-3 bg-card rounded-2xl border border-border"
                  >
                    <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                      <img
                        src={getProductImage(item.product)}
                        alt={item.product.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.product.slug}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.selectedOption}</p>

                      <label className="flex items-center gap-2 mt-3 cursor-pointer">
                        <Checkbox
                          checked={item.vacuumSealing}
                          onCheckedChange={() => toggleVacuumSealing(item.product.id, item.selectedOption)}
                        />
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          Vacuüm verpakken (+€1,50 per stuk)
                        </span>
                      </label>

                      <div className="flex items-center justify-between mt-4 gap-2">
                        <div className="flex items-center gap-1 bg-secondary rounded-xl p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedOption, item.quantity - 1)}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-card rounded-lg transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </button>
                          <span className="w-8 md:w-10 text-center text-sm md:text-base font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedOption, item.quantity + 1)}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-card rounded-lg transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                          <span className="text-base md:text-lg font-bold text-foreground whitespace-nowrap">
                            €{itemTotal.toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedOption)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1.5 md:p-2 flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-4">Overzicht</h2>

                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotaal</span>
                    <span className="font-medium">€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verzendkosten</span>
                    <span className={`font-medium ${shippingCost === 0 ? "text-success" : ""}`}>
                      {shippingCost === 0 ? "Gratis" : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-lg font-bold">Totaal</span>
                  <span className="text-xl font-bold text-primary">€{(cartTotal + shippingCost).toFixed(2)}</span>
                </div>

                <Button className="w-full" size="lg">
                  Afrekenen
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Veilig betalen met iDEAL, creditcard of PayPal
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upsell slider */}
        {items.length > 0 && upsellProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Klanten kochten ook</h2>
                <p className="text-sm text-muted-foreground">Perfect om te combineren</p>
              </div>
            </div>
            <Carousel className="w-full -mx-4 sm:mx-0">
              <CarouselContent className="-ml-4 sm:ml-0 !pr-0">
                {upsellProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 basis-[58%] md:basis-[26%] flex-shrink-0">
                    <div className="bg-card rounded-xl border border-border overflow-hidden group h-full">
                      <Link to={`/products/${product.slug}`}>
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="p-2.5">
                        <Link to={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-foreground text-sm line-clamp-1 hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">€{product.price.toFixed(2)}</span>
                          <Button size="sm" variant="secondary" onClick={() => setSelectedUpsellProduct(product)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 bg-primary text-primary-foreground border-0 hover:bg-primary/90" />
              <CarouselNext className="-right-4 bg-primary text-primary-foreground border-0 hover:bg-primary/90" />
            </Carousel>
          </div>
        )}
      </div>

      {selectedUpsellProduct && (
        <QuickAddModal
          product={selectedUpsellProduct}
          isOpen={!!selectedUpsellProduct}
          onClose={() => setSelectedUpsellProduct(null)}
        />
      )}
    </PageLayout>
  );
};

export default CartPage;
