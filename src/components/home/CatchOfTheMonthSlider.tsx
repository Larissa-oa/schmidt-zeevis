import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { getProductsByCollection } from "@/data/collections";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CatchOfTheMonthSlider = () => {
  const catchProducts = getProductsByCollection("16"); // Vangst van de Maand

  return (
    <section className="pt-8 md:pt-16 pb-12 md:pb-40 bg-secondary/30">
      <div className="container">
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Vangst van de Maand
          </h2>
          <p className="text-muted-foreground mt-1">
            De versste vis van dit seizoen
          </p>
        </div>

        <div className="!pr-0 -mr-4 sm:mr-0">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full !pr-0"
          >
            <CarouselContent className="!ml-0 sm:!ml-0 sm:ml-0 !pr-0">
              {catchProducts.map((product, index) => (
                <CarouselItem key={product.id} className={`${index === 0 ? 'pl-4' : 'pl-2'} sm:pl-4 basis-2/3 sm:basis-1/2 lg:basis-[28.57%] flex-shrink-0`}>
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
              
              {/* See All Card */}
              <CarouselItem className="pl-3 sm:pl-4 basis-2/3 sm:basis-1/2 lg:basis-[28.57%] flex-shrink-0">
              <Link
                to="/collections/vangst-van-de-maand"
                className="flex flex-col items-center justify-center h-full min-h-[280px] bg-card rounded-2xl border border-border border-dashed hover:border-primary hover:bg-secondary/50 transition-all duration-300 group"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Bekijk Alles
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  Ontdek meer producten
                </span>
              </Link>
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border hover:bg-secondary" />
            <CarouselNext className="hidden md:flex -right-4 bg-card border-border hover:bg-secondary" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CatchOfTheMonthSlider;
