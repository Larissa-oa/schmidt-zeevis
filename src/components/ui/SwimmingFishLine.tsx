import blauweVis from "@/assets/Blauwe-vis.png";
import groeneVis from "@/assets/Groene-vis.png";

const FISH = [
  { src: blauweVis, alt: "", isGreen: false },
  { src: groeneVis, alt: "", isGreen: true },
  { src: blauweVis, alt: "", isGreen: false },
  { src: groeneVis, alt: "", isGreen: true },
  { src: blauweVis, alt: "", isGreen: false },
  { src: groeneVis, alt: "", isGreen: true },
  { src: blauweVis, alt: "", isGreen: false },
  { src: groeneVis, alt: "", isGreen: true },
  { src: blauweVis, alt: "", isGreen: false },
  { src: groeneVis, alt: "", isGreen: true },
  { src: blauweVis, alt: "", isGreen: false },
  { src: groeneVis, alt: "", isGreen: true },
];

export const SwimmingFishLine = () => {
  return (
    <div
      className="w-full min-w-full overflow-hidden bg-primary pt-5 pb-3 px-4 md:px-6 flex items-center justify-between gap-2 md:gap-2"
      style={{ width: "100%", boxSizing: "border-box" }}
      aria-hidden
    >
      {FISH.map((fish, i) => (
        <div
          key={i}
          className={`flex-shrink-0 ${i >= 8 ? "hidden md:flex" : ""}`}
        >
          <img
            src={fish.src}
            alt={fish.alt}
            className={`h-6 w-8 md:h-8 md:w-10 object-contain object-center opacity-50 ${fish.isGreen ? "scale-x-[-1]" : ""}`}
          />
        </div>
      ))}
    </div>
  );
};
