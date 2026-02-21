import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/lobster-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[280px] md:min-h-[360px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fresh seafood"
          className="w-full h-full object-cover"
          style={{ objectPosition: "left center" }}
        />
        <div className="absolute inset-0 bg-foreground/10" />
      </div>

      {/* Content */}
      <div className="container relative z-10 -my-4 sm:my-0">
        <div className="max-w-[70%] sm:max-w-lg space-y-3 sm:space-y-5 animate-fade-in text-left">
          {/* Green accent eyebrow */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-accent-green rounded-full" />
            <span className="text-[9px] sm:text-xs font-medium tracking-widest uppercase text-accent-green">
              Koninklijke Schmidt Zeevis Rotterdam
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Verse vis &{" "}
            <span className="text-primary">zeevruchten</span>
          </h1>

          <p className="hidden sm:block text-sm sm:text-base text-muted-foreground sm:max-w-sm">
            Verse vis en zeevruchten direct van Nederlandse vissers.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="default" size="sm" className="w-auto text-xs sm:text-sm h-8 px-2 sm:h-10 sm:px-4 max-w-fit" asChild>
              <Link to="/collections">
                Bekijk alle Producten
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-auto text-xs sm:text-sm h-8 px-2 sm:h-10 sm:px-4 max-w-fit" asChild>
              <Link to="/collections/catch-of-the-month">
                Vangst van de Maand
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
