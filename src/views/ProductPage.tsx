"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Truck, Clock, Shield, ChevronLeft, ChevronRight, Fish, Ban, Info } from "lucide-react";
import SEO from "@/components/seo/SEO";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/products/ProductCard";
import RecipeSection from "@/components/products/RecipeSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { products, getProductBySlug } from "@/data/collections";
import { getNewProductImage } from "@/data/productImageAssets";
import { getProductImage, PRODUCT_FALLBACK_IMAGES, DEFAULT_PRODUCT_IMAGE } from "@/data/productImageMap";
import { useCart } from "@/hooks/useCart";
import octopusImage from "@/assets/octopus.avif";
import groeneVisImage from "@/assets/Groene-vis.png";
import blauweVisImage from "@/assets/Blauwe-vis.png";

/** Gallery images for products with multiple views (fallback only) */
const productGalleryImages: Record<string, string[]> = {
  "octopus-tentakels": [PRODUCT_FALLBACK_IMAGES["octopus-tentakels"], PRODUCT_FALLBACK_IMAGES["ocean-paradise"], octopusImage],
  "hollandse-garnalen-fresh": [PRODUCT_FALLBACK_IMAGES["hollandse-garnalen-fresh"], PRODUCT_FALLBACK_IMAGES["hollandse-garnalen"], DEFAULT_PRODUCT_IMAGE],
  "ocean-paradise": [PRODUCT_FALLBACK_IMAGES["ocean-paradise"], DEFAULT_PRODUCT_IMAGE, PRODUCT_FALLBACK_IMAGES["hollandse-garnalen"]],
  "zeebaars-fresh": [PRODUCT_FALLBACK_IMAGES["zeebaars-fresh"], DEFAULT_PRODUCT_IMAGE, PRODUCT_FALLBACK_IMAGES["zeeuwse-kreeft"]],
  "verse-zalm-filet": [DEFAULT_PRODUCT_IMAGE, PRODUCT_FALLBACK_IMAGES["hollandse-garnalen"], PRODUCT_FALLBACK_IMAGES["zeeuwse-platte-oesters"]],
  "hollandse-garnalen": [PRODUCT_FALLBACK_IMAGES["hollandse-garnalen"], DEFAULT_PRODUCT_IMAGE, PRODUCT_FALLBACK_IMAGES["zeeuwse-platte-oesters"]],
  "zeeuwse-platte-oesters": [PRODUCT_FALLBACK_IMAGES["zeeuwse-platte-oesters"], DEFAULT_PRODUCT_IMAGE, PRODUCT_FALLBACK_IMAGES["hollandse-garnalen"]],
  "zeeuwse-kreeft": [PRODUCT_FALLBACK_IMAGES["zeeuwse-kreeft"], DEFAULT_PRODUCT_IMAGE, PRODUCT_FALLBACK_IMAGES["zeeuwse-platte-oesters"]],
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [addOnQuantity, setAddOnQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSkin, setSelectedSkin] = useState<"Met vel" | "Zonder vel">("Met vel");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <PageLayout mainClassName="flex items-center justify-center">
        <div className="text-center">
          <Fish className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Product niet gevonden</h1>
          <Button asChild>
            <Link to="/collections/alle-producten">Terug naar producten</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Set default option if not selected
  if (!selectedOption && product.variants.length > 0 && product.variants[0].options.length > 0) {
    setSelectedOption(product.variants[0].options[0]);
  }

  const fromDataImage = product.image && getNewProductImage(product.image);
  const images = fromDataImage
    ? [fromDataImage]
    : (productGalleryImages[product.slug] || [DEFAULT_PRODUCT_IMAGE]);
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 5);
  const addOnProduct = products.find(p => p.slug === "garnalen-kant-en-klaar");
  const addOnProductImage = addOnProduct ? getProductImage(addOnProduct) : DEFAULT_PRODUCT_IMAGE;

  const getSeasonIcon = (status: string) => {
    switch (status) {
      case "in-season":
        return <img src={groeneVisImage} alt="In seizoen" className="h-3.5 w-5 object-contain scale-x-[-1]" />;
      case "available":
        return <img src={blauweVisImage} alt="Beschikbaar" className="h-3.5 w-5 object-contain" />;
      default:
        return <Ban className="h-3.5 w-3.5" />;
    }
  };

  const getSeasonStatusColor = (status: string) => {
    switch (status) {
      case "in-season":
        return "bg-success";
      case "available":
        return "bg-secondary";
      default:
        return "bg-muted";
    }
  };

  const isFishCategory = product.collectionId === "2";
  const cartOptionLabel = isFishCategory ? `${selectedOption} • ${selectedSkin}` : selectedOption;

  const handleAddToCart = () => {
    addItem(product, quantity, cartOptionLabel);
  };

  return (
    <PageLayout mainClassName="bg-background">
      <SEO
        title={product.name}
        description={`${product.name} — ${product.description || "Verse premium kwaliteit bij Schmidt Zeevis, rechtstreeks van Nederlandse vissers."}`}
        canonical={`/products/${product.slug}`}
      />
        <div className="container py-8 px-4 sm:px-4 md:px-20 lg:px-20 overflow-visible">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections/alle-producten" className="hover:text-primary transition-colors">Producten</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20 md:mb-24 items-start overflow-visible">
            {/* Images - Sticky on desktop */}
            <div className="space-y-4 lg:sticky lg:top-8 w-full overflow-visible">
              {/* Main Image - green-blue gradient border + corner fish like recipes */}
              <div className="relative px-2 pt-2 pb-14 md:pb-16 overflow-visible w-full max-w-[380px] lg:max-w-[420px] mx-auto">
                <div className="relative gradient-border-green-blue overflow-visible shrink-0 w-full">
                  <div className="relative w-full rounded-[14px] overflow-hidden bg-card">
                    <img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-auto block object-contain"
                    />
                    {product.seasonality === "in-season" && (
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-accent-green/65 border border-accent-green/70 text-black text-sm font-semibold rounded-full flex items-center gap-1.5 shadow-sm z-10">
                        <img
                          src={groeneVisImage}
                          alt="In seizoen"
                          className="h-4 w-5 object-contain drop-shadow-sm scale-x-[-1]"
                        />
                        <span>In Seizoen</span>
                      </span>
                    )}
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors z-10"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors z-10"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                  <img src={groeneVisImage} alt="" className="absolute -top-4 -right-4 w-10 h-10 object-contain drop-shadow-lg z-10 pointer-events-none" style={{ transform: "rotate(18deg)" }} aria-hidden />
                  <img src={blauweVisImage} alt="" className="absolute -bottom-4 -left-5 w-10 h-10 object-contain drop-shadow-lg z-10 pointer-events-none" style={{ transform: "rotate(18deg)" }} aria-hidden />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-2 ring-primary ring-offset-2 scale-105"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Weight */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Gewicht per portie:</span>
                <span className="font-medium text-foreground">{product.weight}</span>
              </div>

              {/* Variant Selectors: first variant (e.g. Opties) */}
              {product.variants.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">{product.variants[0].name}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[0].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          selectedOption === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Skin option for fish category (Verse Vis) */}
              {isFishCategory && product.variants[1]?.name === "Vel" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">{product.variants[1].name}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[1].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedSkin(option as "Met vel" | "Zonder vel")}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          selectedSkin === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Price */}
              <div className="flex items-center justify-between pt-4 gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg sm:text-xl font-semibold w-8 sm:w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground">
                    €{(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <Button 
                size="lg" 
                className="w-full h-14 text-base font-semibold shadow-md hover:shadow-lg transition-shadow" 
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                In Winkelwagen
              </Button>

              {/* Simple Add-on Upsell */}
              {addOnProduct && (
                <div className="bg-secondary/50 rounded-xl p-3 sm:p-4 border border-border pt-6">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">Voeg toe aan bestelling</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={addOnProductImage}
                      alt={addOnProduct.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                        {addOnProduct.name}
                        <span className="text-xs text-muted-foreground"> • </span>
                        <span className="text-xs text-muted-foreground">
                          {addOnProduct.weight}
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm text-primary font-semibold">
                          €{addOnProduct.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg"
                        onClick={() => setAddOnQuantity((q) => Math.max(1, q - 1))}
                      >
                        <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </Button>
                      <span className="text-xs sm:text-sm font-medium w-5 sm:w-6 text-center">{addOnQuantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg"
                        onClick={() => setAddOnQuantity((q) => q + 1)}
                      >
                        <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </Button>
                      <Button
                        variant="default"
                        className="h-7 w-7 sm:h-8 sm:w-8 sm:px-4 rounded-lg flex-shrink-0 font-medium shadow-sm hover:shadow transition-shadow sm:ml-3"
                        onClick={() => {
                          if (addOnProduct && addOnQuantity > 0) {
                            addItem(addOnProduct, addOnQuantity, addOnProduct.variants[0]?.options[0] || "");
                            setAddOnQuantity(1);
                          }
                        }}
                      > <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Info Bubbles */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <div className="bg-secondary rounded-2xl p-3 sm:p-4 text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-collection-circle/20 flex items-center justify-center mx-auto mb-2">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground">Gratis verzending</p>
                  <p className="text-xs text-muted-foreground">vanaf €200</p>
                </div>
                <div className="bg-secondary rounded-2xl p-3 sm:p-4 text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-collection-circle/20 flex items-center justify-center mx-auto mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground">Snelle levering</p>
                  <p className="text-xs text-muted-foreground">binnen 24 uur</p>
                </div>
                <div className="bg-secondary rounded-2xl p-3 sm:p-4 text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-collection-circle/20 flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground">Versgarantie</p>
                  <p className="text-xs text-muted-foreground">100% vers</p>
                </div>
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="w-full pt-2">
                <AccordionItem value="allergens" className="border-border">
                  <AccordionTrigger className="text-foreground hover:text-primary">
                    <span className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Allergenen
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen) => (
                        <span
                          key={allergen}
                          className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="nutrition" className="border-border">
                  <AccordionTrigger className="text-foreground hover:text-primary">
                    <span className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Voedingswaarden
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {product.nutritionalInfo.map((info) => (
                        <div key={info.name} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{info.name}</span>
                          <span className="font-medium text-foreground">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Fish Calendar / Seizoenskalender */}
          <div className="bg-card rounded-3xl p-6 md:p-8 border-l-[6px] border-l-accent-green border border-border mb-24 md:mb-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center">
                <img src={groeneVisImage} alt="Seizoenskalender" className="h-6 w-7 object-contain scale-x-[-1]" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Seizoenskalender</h2>
                <p className="text-xs md:text-sm text-muted-foreground break-words">Wanneer is dit product beschikbaar?</p>
              </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {product.seasonCalendar.map((month, index) => (
                <div
                  key={month.month}
                  className={`relative rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 border-l-4 ${
                    month.status === "in-season" 
                      ? "border-l-accent-green bg-accent-green/15" 
                      : month.status === "available" 
                        ? "border-l-primary bg-secondary" 
                        : "border-l-muted bg-muted/50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="text-xs font-medium mb-1 text-foreground">{month.month}</p>
                  <div className={`flex justify-center ${
                    month.status === "in-season" 
                      ? "text-accent-green" 
                      : month.status === "available" 
                        ? "text-primary" 
                        : "text-muted-foreground"
                  }`}>
                    {getSeasonIcon(month.status)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent-green/20 flex items-center justify-center flex-shrink-0">
                  <img src={groeneVisImage} alt="" className="h-3 w-3.5 object-contain scale-x-[-1]" />
                </div>
                <span className="text-accent-green font-medium">In Seizoen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <img src={blauweVisImage} alt="" className="h-3 w-3.5 object-contain" />
                </div>
                <span className="text-primary font-medium">Beschikbaar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                  <Ban className="h-2.5 w-2.5 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">Niet Beschikbaar</span>
              </div>
            </div>
          </div>

          {/* Upsell Section with Slider */}
          <div className="mb-24 md:mb-28">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Klanten kochten ook
                </h2>
                <p className="text-sm text-muted-foreground">Perfect om te combineren</p>
              </div>
            </div>

            <div className="-mx-4 sm:mx-0">
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="!ml-0 sm:ml-0 !pr-0">
                  {relatedProducts.map((p, index) => (
                    <CarouselItem key={p.id} className={`${index === 0 ? 'pl-4' : 'pl-3'} sm:pl-4 basis-2/3 sm:basis-1/2 lg:basis-[28.57%] flex-shrink-0`}>
                      <ProductCard product={p} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border hover:bg-secondary" />
                <CarouselNext className="hidden md:flex -right-4 bg-card border-border hover:bg-secondary" />
              </Carousel>
            </div>
          </div>

          {/* Recipes Section */}
          <RecipeSection product={product} images={images} />
        </div>
    </PageLayout>
  );
};

export default ProductPage;
