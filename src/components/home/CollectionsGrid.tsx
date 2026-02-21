import { Link } from "react-router-dom";
import { collections } from "@/data/collections";
import { FishIcon } from "@/components/ui/FishIcon";
import { Button } from "@/components/ui/button";
import { getCollectionImage } from "@/data/collectionImageMap";

const CollectionsGrid = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Onze Categorieën
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ontdek ons uitgebreide assortiment verse vis en zeevruchten
          </p>
        </div>

        {/* Collections Grid - 4 columns, bigger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => {
            return (
              <Link
                key={collection.id}
                to={`/collections/${collection.slug}`}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="collection-card-border relative overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {/* Card content */}
                  <div className="p-4 md:p-6">
                    {/* Product image with circular accent - mobile: shorter cards, bigger circle & images; desktop unchanged */}
                    <div className="relative h-32 md:h-[260px] flex items-center justify-center mb-2 md:mb-3">
                      {/* Circular accent behind product - light blue */}
                      <div 
                        className="absolute rounded-full bg-[hsl(var(--collection-circle)/0.5)] transition-all duration-300 w-[132px] h-[132px] md:w-[230px] md:h-[230px] group-hover:w-[140px] group-hover:h-[140px] md:group-hover:w-[240px] md:group-hover:h-[240px]"
                      />
                      
                      {/* Product image - mobile: smaller for alle-producten/verse-vis/delicatessen/conserven, bigger for rest; circles bigger on mobile */}
                      {(() => {
                        const biggerImageSlugs = ["schotels", "specials", "diepvries", "diversen", "sushi-en-sashimi", "sauzen", "olie-en-azijn"];
                        const biggestImageSlugs = ["schotels", "diepvries", "sushi-en-sashimi"];
                        const smallerImageSlugs = ["alle-producten", "verse-vis", "delicatessen", "conserven"];
                        const biggerOnMobileSlugs = ["diversen", "diepvries", "sauzen", "olie-en-azijn"];
                        const isBiggestImage = biggestImageSlugs.includes(collection.slug);
                        const isBiggerImage = biggerImageSlugs.includes(collection.slug);
                        const isAlleProducten = collection.slug === "alle-producten";
                        const isSmallerOnMobile = smallerImageSlugs.includes(collection.slug);
                        const isBiggerOnMobile = biggerOnMobileSlugs.includes(collection.slug);
                        const mobileScale = isSmallerOnMobile ? "scale-100" : isBiggerOnMobile ? "scale-[1.4]" : "scale-[1.15]";
                        const scaleClass = isAlleProducten
                          ? `${mobileScale} md:scale-110 group-hover:scale-95 md:group-hover:scale-115`
                          : isBiggestImage
                            ? `${mobileScale} md:scale-[1.5] group-hover:scale-[1.05] md:group-hover:scale-[1.6]`
                            : isBiggerImage
                              ? `${mobileScale} md:scale-[1.35] group-hover:scale-[1.05] md:group-hover:scale-[1.45]`
                              : `${mobileScale} md:scale-[1.2] group-hover:scale-105 md:group-hover:scale-[1.3]`;
                        const translateClass = isAlleProducten ? "translate-x-6 md:translate-x-8" : "";
                        return (
                          <img
                            src={getCollectionImage(collection.slug)}
                            alt={collection.name}
                            className={`relative z-10 h-full max-h-full w-auto object-contain drop-shadow-lg transition-transform duration-300 ${scaleClass} ${translateClass}`}
                          />
                        );
                      })()}
                    </div>

                    {/* Collection info */}
                    <div className="text-center">
                      <h3 className="text-base md:text-lg lg:text-xl mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors font-bold">
                        {collection.name}
                      </h3>
                      
                      {/* CTA Button */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all text-xs md:text-sm border-primary/50 text-primary"
                      >
                        Bekijk collectie
                        <FishIcon className="h-3 w-3 md:h-3.5 md:w-3.5" inheritColor />
                      </Button>
                    </div>

                    {/* Hover - Product count */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--collection-circle)/0.5)] text-primary text-xs font-medium">
                        {collection.productCount} producten
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;