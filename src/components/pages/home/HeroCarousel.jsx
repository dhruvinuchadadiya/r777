import { useEffect, useState } from "react";

const bannerImages = [
  "/images/hero/main-banner0.webp",
  "/images/hero/main-banner1.webp",
  "/images/hero/main-banner2.webp",
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mobile Touch Swipe States
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Auto-play interval
  useEffect(() => {
    if (isHovered || bannerImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length,
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch handlers for mobile horizontal swiping
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (!bannerImages.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden select-none bg-[#0B5563] touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Responsive Image Track */}
      <div
        className="flex transition-transform duration-500 ease-out w-full items-center"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((imagePath, index) => (
          <div key={index} className="w-full shrink-0 relative">
            <img
              src={imagePath}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-contain object-center block"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="hidden md:flex absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2  space-x-1.5 sm:space-x-2 z-20 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-4 sm:w-6 bg-[#34D399]"
                : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
