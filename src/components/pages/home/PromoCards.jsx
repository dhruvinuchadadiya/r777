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
    <div className="bg-[#0b0b12] w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-3 sm:space-y-4 ">
      {/* Mobile & Tablet Slider */}
      <div className="block md:hidden w-full overflow-hidden">
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
              className="w-1/2 shrink-0 px-1 sm:px-1.5 box-border"
            >
              <Link to={item.path} className="block w-full">
                <img
                  src={item.image}
                  alt={`Promo Mobile ${index + 1}`}
                  className="w-full h-auto object-contain block rounded-xl shadow-lg hover:scale-[1.02] transition duration-300"
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Large Screens Static 3-Card Grid */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {promoItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="w-full overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] transition duration-300 block"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        {gifItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="w-full overflow-hidden rounded-xl shadow-lg hover:brightness-105 transition block"
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
