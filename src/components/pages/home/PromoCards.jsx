import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Update with your local image paths
const promoItems = [
  { image: "/images/promo/bonus-1.webp", path: "/" },
  { image: "/images/promo/bonus-2.webp", path: "/" },
  { image: "/images/promo/bonus-3.webp", path: "/" },
];

// Update with your 2 GIF paths
const gifItems = [
  { image: "/images/promo/RDGIF-1.gif", path: "/" },
  { image: "/images/promo/RDGIF-2.gif", path: "/" },
];

// 1. Two arrays are perfectly safe when managing the early reset check
const extendedItems = [...promoItems, ...promoItems];

const PromoCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, []);

  // 2. Clear reset condition to prevent empty trailing items
  const handleTransitionEnd = () => {
    if (currentIndex >= promoItems.length) {
      setIsTransitioning(false);
      setCurrentIndex(0); // Snap instantly back to the first item
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 pt-1 md:pt-2 space-y-1 sm:space-y-2 ">
      {/* Mobile & Tablet Slider */}
      <div className="block md:hidden w-full overflow-hidden gap-1 sm:gap-2">
        <div
          className="flex"
          onTransitionEnd={handleTransitionEnd}
          style={{
            // Shows two items at a time (each item is 50% width)
            transform: `translateX(-${currentIndex * 50}%)`,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
          }}
        >
          {extendedItems.map((item, index) => (
            <div
              key={index}
              className="w-1/2 shrink-0 px-0.5 sm:px-1 box-border"
            >
              <Link to={item.path} className="block w-full">
                <img
                  src={item.image}
                  alt={`Promo Mobile ${index + 1}`}
                  className="w-full h-auto object-contain block rounded-sm shadow-lg hover:scale-[1.02] transition duration-300"
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Large Screens Static 3-Card Grid */}
      <div className="hidden md:grid grid-cols-3 !mt-[0px] gap-1 sm:gap-2">
        {promoItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="w-full overflow-hidden rounded-sm shadow-lg hover:scale-[1.02] transition duration-300 block"
          >
            <img
              src={item.image}
              alt={`Promo Desktop ${index + 1}`}
              className="w-full h-auto object-contain block"
            />
          </Link>
        ))}
      </div>

      {/* Bottom Section: 2 Side-by-Side GIFs with Redirection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
        {gifItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="w-full overflow-hidden rounded-sm shadow-lg hover:brightness-105 transition block"
          >
            <img
              src={item.image}
              alt={`Featured GIF ${idx + 1}`}
              className="w-full h-auto object-contain block"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromoCards;
