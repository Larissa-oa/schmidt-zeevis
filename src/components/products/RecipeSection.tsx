import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Product, Recipe, getProductBySlug, products } from "@/data/collections";
import { getNewProductImage } from "@/data/productImageAssets";
import salmonImage from "@/assets/salmon-collection.jpg";
import shrimpImage from "@/assets/shrimp-collection.jpg";
import oysterImage from "@/assets/oyster-collection.jpg";
import mackerelImage from "@/assets/mackerel-collection.jpg";
import octopusTentaclesImage from "@/assets/octopus-tentacles.png";
import dutchShrimpImage from "@/assets/dutch-shrimp.avif";
import oceanParadiseImage from "@/assets/ocean-paradise.png";
import zeebassImage from "@/assets/zeebass.avif";
import octopusImage from "@/assets/octopus.avif";
import reviewIcon from "@/assets/review-icon.png";
import lobsterHeroImage from "@/assets/lobster-hero.png";
import seafoodSpreadImage from "@/assets/seafood-spread.png";
import schmidtFish from "@/assets/schmidt-fish.png";
import groeneVis from "@/assets/Groene-vis.png";
import blauweVis from "@/assets/Blauwe-vis.png";

interface RecipeSectionProps {
  product: Product;
  images: string[];
}

interface RecipeWithProduct {
  recipe: Recipe;
  product: Product;
  productImages: string[];
}

const productImageMap: Record<string, string> = {
  "octopus-tentakels": octopusTentaclesImage,
  "hollandse-garnalen-fresh": dutchShrimpImage,
  "ocean-paradise": oceanParadiseImage,
  "zeebaars-fresh": zeebassImage,
  "verse-zalm-filet": salmonImage,
  "hollandse-garnalen": shrimpImage,
  "zeeuwse-platte-oesters": oysterImage,
  "zeeuwse-kreeft": mackerelImage,
};

// Recipe hero images from assets (outside new-images) – used for accordion and content
const recipeImagesFromAssets: string[] = [
  salmonImage,
  shrimpImage,
  oysterImage,
  mackerelImage,
  octopusTentaclesImage,
  oceanParadiseImage,
  zeebassImage,
  lobsterHeroImage,
  seafoodSpreadImage,
  dutchShrimpImage,
  octopusImage,
];

const RecipeSection = ({ product, images }: RecipeSectionProps) => {
  const location = useLocation();
  const [openRecipe, setOpenRecipe] = useState<string | undefined>(undefined);

  // Close accordion when navigating to a different page or on mount
  useEffect(() => {
    setOpenRecipe(undefined);
  }, [location.pathname, product.id]);

  // Force close on mount
  useEffect(() => {
    setOpenRecipe(undefined);
  }, []);

  // Get recipes from current product
  const currentProductRecipes: RecipeWithProduct[] = (product.recipes || []).map((recipe) => ({
    recipe,
    product,
    productImages: images,
  }));

  // Find recipes from other products that use this product
  const crossSellRecipes: RecipeWithProduct[] = products
    .filter((p) => p.id !== product.id && p.recipes && p.recipes.length > 0)
    .flatMap((p) => {
      const matchingRecipes = p.recipes!.filter(
        (r) => r.usedProducts && r.usedProducts.includes(product.slug)
      );
      return matchingRecipes.map((recipe) => {
        // Get images for the product that owns this recipe
        const recipeProductImages: Record<string, string[]> = {
          "octopus-tentakels": [octopusTentaclesImage, oceanParadiseImage, octopusImage],
          "hollandse-garnalen-fresh": [dutchShrimpImage, shrimpImage, salmonImage],
          "ocean-paradise": [oceanParadiseImage, salmonImage, shrimpImage],
          "zeebaars-fresh": [zeebassImage, salmonImage, mackerelImage],
          "verse-zalm-filet": [salmonImage, shrimpImage, oysterImage],
        };
        return {
          recipe,
          product: p,
          productImages: recipeProductImages[p.slug] || [salmonImage],
        };
      });
    });

  // Combine all recipes
  const allRecipes = [...currentProductRecipes, ...crossSellRecipes];

  if (allRecipes.length === 0) {
    return null;
  }

  return (
    <section className="pb-12 md:pb-24 pt-8 md:pt-12 px-4 md:px-6 rounded-xl bg-secondary/30">
      <div className="flex items-center gap-3 mb-6 text-left">
        <img src={reviewIcon} alt="Recepten" className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 rounded-full object-cover aspect-square opacity-75" />
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          Recepten
        </h2>
      </div>
      <Accordion 
        key={product.id}
        type="single" 
        collapsible 
        className="w-full"
        value={openRecipe}
        onValueChange={setOpenRecipe}
      >
        {allRecipes.map((recipeWithProduct, idx) => {
          const { recipe, product: recipeProduct, productImages } = recipeWithProduct;
          
          // Get products used in recipe
          const usedProducts = recipe.usedProducts
            ?.map((slug) => getProductBySlug(slug))
            .filter((p): p is Product => p !== undefined) || [];

          // Build the list of products to show
          let allUsedProducts: Product[] = [];
          
          if (recipeProduct.slug === product.slug) {
            // Recipe from current product: show other products used in recipe
            allUsedProducts = usedProducts.filter((p) => p.slug !== product.slug);
          } else {
            // Cross-sell recipe: show current product + recipe owner + other products (excluding duplicates)
            const productSet = new Set<string>();
            allUsedProducts = [];
            
            // Add current product first
            allUsedProducts.push(product);
            productSet.add(product.slug);
            
            // Add recipe owner product
            if (!productSet.has(recipeProduct.slug)) {
              allUsedProducts.push(recipeProduct);
              productSet.add(recipeProduct.slug);
            }
            
            // Add other used products (excluding current and recipe owner)
            usedProducts.forEach((p) => {
              if (!productSet.has(p.slug) && p.slug !== product.slug && p.slug !== recipeProduct.slug) {
                allUsedProducts.push(p);
                productSet.add(p.slug);
              }
            });
          }

          // Create a stable key based on recipe title and product slug
          const recipeKey = `recipe-${recipeProduct.slug}-${recipe.title.toLowerCase().replace(/\s+/g, '-')}`;

          const recipeImage = recipeImagesFromAssets[idx % recipeImagesFromAssets.length];

          return (
            <AccordionItem key={recipeKey} value={recipeKey} className="border-border/50">
              <AccordionTrigger className="text-foreground hover:no-underline text-lg md:text-xl py-4 [&[data-state=open]>img]:rounded-b-none text-left">
                <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                  <img
                    src={recipeImage}
                    alt=""
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <span className="text-left">{recipe.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="overflow-visible">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Recipe image with thin gradient border and overlapping corner fish - extra pb so blue fish overflows visibly */}
                  <div className="relative pb-14 md:pb-16 overflow-visible">
                    <div className="relative aspect-[4/3] rounded-[12px] p-[1.5px] bg-gradient-to-br from-[hsl(var(--accent-green))] to-[hsl(var(--primary))] overflow-visible">
                      <div className="relative w-full h-full rounded-[10.5px] overflow-hidden flex items-center justify-center bg-card">
                        <img 
                          src={recipeImage} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <img src={groeneVis} alt="" className="absolute -top-4 -right-4 w-10 h-10 object-contain drop-shadow-lg z-10 pointer-events-none" style={{ transform: "rotate(18deg)" }} aria-hidden />
                      <img src={blauweVis} alt="" className="absolute -bottom-4 -left-5 w-10 h-10 object-contain drop-shadow-lg z-10 pointer-events-none" style={{ transform: "rotate(18deg)" }} aria-hidden />
                    </div>
                  </div>
                  
                  {/* Ingredients */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-foreground">Ingrediënten</h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground list-none">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <img
                            src={schmidtFish}
                            alt=""
                            className="h-3 w-4 flex-shrink-0 scale-x-[-1] invert mix-blend-multiply opacity-70"
                          />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-foreground">Bereiding</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary font-medium flex-shrink-0">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Products used in recipe (upsell) */}
                {allUsedProducts.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border/30 px-2 pb-2">
                    <p className="text-sm text-muted-foreground mb-3">Producten in dit recept:</p>
                    <div className="flex flex-wrap gap-3">
                        {allUsedProducts.map((prod, i) => {
                        const prodImage = (prod.image && getNewProductImage(prod.image)) || productImageMap[prod.slug] || salmonImage;

                        return (
                          <div
                            key={i}
                            className="p-[1.5px] rounded-[10px] bg-gradient-to-r from-[hsl(var(--accent-green))] to-[hsl(var(--primary))]"
                          >
                            <Link
                              to={`/products/${prod.slug}`}
                              className="flex items-center gap-3 px-4 py-3 rounded-[8.5px] bg-card transition-colors"
                            >
                              <img 
                                src={prodImage} 
                                alt={prod.name} 
                                className="w-10 h-10 object-cover rounded-lg" 
                              />
                              <div>
                                <span className="text-sm text-foreground block">{prod.name}</span>
                                <span className="text-xs text-primary">Vanaf €{prod.price.toFixed(2).replace(".", ",")}</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-primary ml-2" />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

export default RecipeSection;
