import { useEffect, useRef, useState } from "react";
import { topGames } from "../../../core/data/mockData";

const extendedGames = [...topGames, ...topGames];

const TopGames = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const itemRef = useRef(null); // Ref to measure a single item dynamically
  const isResettingRef = useRef(false);

  useEffect(() => {
    if (topGames.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic width (item width + gap)
  const getItemStepWidth = () => {
    if (!itemRef.current || !scrollContainerRef.current) return 0;

    // Get the element width (w-28 or w-32 depending on screen size)
    const elementWidth = itemRef.current.getBoundingClientRect().width;

    // Read the actual column gap from the container style (space-x-4 = 16px)
    const computedStyle = window.getComputedStyle(scrollContainerRef.current);
    const gap = parseFloat(computedStyle.columnGap) || 16;

    return elementWidth + gap;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const stepWidth = getItemStepWidth();
    const targetScrollLeft = currentIndex * stepWidth;

    if (isResettingRef.current) {
      container.scrollTo({ left: targetScrollLeft, behavior: "auto" });
      isResettingRef.current = false;
    } else {
      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const stepWidth = getItemStepWidth();
    const singleSetWidth = topGames.length * stepWidth;

    // Check if we scrolled past the original set of items minus a small pixel tolerance buffer
    if (container.scrollLeft >= singleSetWidth - 2 && !isResettingRef.current) {
      isResettingRef.current = true;
      setCurrentIndex(0);
    }
  };

  return (
    <div className="bg-[#0b0b12]">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-3 sm:space-y-4 bg-transparent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-3xl font-bold">Top Games</h2>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {extendedGames.map((game, index) => (
            <div
              key={`${game.id}-${index}`}
              // Attach ref to the very first item to measure it
              ref={index === 0 ? itemRef : null}
              className="flex-shrink-0 w-20 sm:w-28 md:w-32 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-xl transform group-hover:scale-105 transition duration-300 bg-neutral-900">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-14 sm:h-20 md:h-24 object-contain block"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                  <button className="bg-white text-[#0B5563] px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                    Play Now
                  </button>
                </div> */}
              </div>
              <p className="text-white text-center mt-3 font-medium text-sm md:text-base">
                {game.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGames;
