import schmidtFish from "@/assets/schmidt-fish.png";

/** Fish icon (Schmidt fish) in primary blue, flipped to face left. Use className for size. Set inheritColor to inherit parent text color (e.g. white on hover). */
export const FishIcon = ({ className = "h-5 w-5", inheritColor = false }: { className?: string; inheritColor?: boolean }) => (
  <span
    className={`inline-block flex-shrink-0 ${inheritColor ? "text-inherit" : "text-primary"} ${className}`}
    style={{
      WebkitMaskImage: `url(${schmidtFish})`,
      WebkitMaskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskImage: `url(${schmidtFish})`,
      maskSize: "contain",
      maskRepeat: "no-repeat",
      maskPosition: "center",
      backgroundColor: inheritColor ? "currentColor" : "#193A54",
      transform: "scaleX(-1)",
    }}
    aria-hidden
  />
);
