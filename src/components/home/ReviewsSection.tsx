/**
 * Reviews section — customer testimonials with background image.
 * Uses ReviewCard for each testimonial.
 */
import schmidtZeevisBg from "@/assets/Schmidt-Zeevis.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReviewCard, { type Review } from "./ReviewCard";

const reviews: Review[] = [
  {
    id: 1,
    name: "Jan de Vries",
    rating: 5,
    text: "Geweldige kwaliteit! De zalm was super vers en smolt op de tong.",
    date: "2 dagen geleden",
  },
  {
    id: 2,
    name: "Marie van den Berg",
    rating: 5,
    text: "Snelle levering en de oesters waren perfect. Aanrader!",
    date: "1 week geleden",
  },
  {
    id: 3,
    name: "Peter Bakker",
    rating: 5,
    text: "Al jaren klant en nooit teleurgesteld. Top service!",
    date: "2 weken geleden",
  },
];

const ReviewsSection = () => {
  return (
    <section
      className="relative pt-20 overflow-hidden flex flex-col justify-end"
      style={{ minHeight: "70vh", paddingBottom: "3rem" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={schmidtZeevisBg}
          alt="Schmidt Zeevis background"
          className="w-full h-full object-cover"
          style={{ objectPosition: "left 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-background/15 to-background/25" />
        <div className="absolute inset-0 bg-secondary/10" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.35) 10%, transparent 25%)",
          }}
        />
      </div>

      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="text-center md:text-left mb-44 md:mb-56 max-w-2xl mx-auto md:mx-0 md:ml-2">
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground -mt-10 md:mt-0 drop-shadow-lg">
            Wat onze klanten zeggen over{" "}
            <span className="text-primary">Schmidt Zeevis</span>
          </h2>
        </div>

        {/* Mobile slider */}
        <div className="md:hidden group -mx-4 mt-24 mb-8">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-4 basis-5/6 sm:basis-2/3">
                  <ReviewCard review={review} className="h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-card/80 border-border hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CarouselNext className="right-2 bg-card/80 border-border hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Carousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
