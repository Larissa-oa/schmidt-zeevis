import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import banner3 from "@/assets/new-banner/banner3.avif";
import banner6 from "@/assets/new-banner/banner6.jpg";
import banner7 from "@/assets/new-banner/banner7.avif";
import banner8 from "@/assets/new-banner/banner8.avif";

const PromoBlocks = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-5 pt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Unieke Visbeleving
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {/* Left - Unieke producten → alle producten */}
          <Link
            to="/collections/alle-producten"
            className="relative overflow-hidden rounded-2xl md:rounded-r-none h-[180px] md:h-[280px] group"
          >
            <img
              src={banner6}
              alt="Unieke producten"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
              <div className="max-w-md space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                  Unieke producten
                </h3>
                <p className="text-sm text-white/95 leading-relaxed max-w-xs drop-shadow-sm">
                  Volledig assortiment, zorgvuldig geselecteerd.
                </p>
                <Button variant="secondary" size="sm" className="mt-2 self-start group-hover:bg-white transition-colors">
                  Alle producten
                </Button>
              </div>
            </div>
          </Link>

          {/* Right - Two containers in row on desktop */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
            <Link
              to="/collections/schaal-en-schelpdieren"
              className="relative overflow-hidden rounded-2xl md:rounded-none h-36 md:h-[280px] group flex-1"
            >
              <img
                src={banner3}
                alt="Schaal en schelpdieren"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e2d38]/70 via-[#1e2d38]/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md">
                    Schaal & schelpdieren
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed max-w-[12rem] drop-shadow-sm">
                    Kreeft, krab en schelpdieren — dagelijks vers.
                  </p>
                  <Button variant="secondary" size="sm" className="mt-1.5 self-start group-hover:bg-white transition-colors">
                    Bekijk collectie
                  </Button>
                </div>
              </div>
            </Link>

            <Link
              to="/collections/verse-vis"
              className="relative overflow-hidden rounded-2xl md:rounded-l-none md:rounded-r-2xl h-36 md:h-[280px] group flex-1"
            >
              <img
                src={banner7}
                alt="Verse vis"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md">
                    Verse vis
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed max-w-[12rem] drop-shadow-sm">
                    Dagverse vis van Nederlandse vissers.
                  </p>
                  <Button variant="secondary" size="sm" className="mt-1.5 self-start group-hover:bg-white transition-colors">
                    Bekijk collectie
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBlocks;