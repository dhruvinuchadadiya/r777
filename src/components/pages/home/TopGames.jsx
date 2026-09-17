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

    // Correctly reads whatever calculated fluid % width the browser assigned to the card
    const elementWidth = itemRef.current.getBoundingClientRect().width;

    // Read the actual column gap from the container style (space-x-2 = 8px)
    const computedStyle = window.getComputedStyle(scrollContainerRef.current);
    const gap = parseFloat(computedStyle.columnGap) || 8;

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

  // Recalculate if user rotates screen or resizes window
  useEffect(() => {
    const handleResize = () => {
      // Re-trigger placement calculations based on new fluid item widths
      setCurrentIndex((prev) => prev);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const stepWidth = getItemStepWidth();
    const singleSetWidth = topGames.length * stepWidth;

    if (container.scrollLeft >= singleSetWidth - 2 && !isResettingRef.current) {
      isResettingRef.current = true;
      setCurrentIndex(0);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 pt-1 md:pt-2 space-y-1 sm:space-y-2">
      <div className="flex items-center justify-between mb-0 md:mb-1">
        <h4 className="text-black text-base font-bold">Top Games</h4>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex space-x-2 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {extendedGames.map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            ref={index === 0 ? itemRef : null}
            /* 
              UPDATED UTILITIES:
              - Base screen: w-[calc(25%-6px)]   -> Exactly 4 items visible
              - sm screen:   w-[calc(20%-6.4px)] -> Exactly 5 items visible
              - md screen:   w-[calc(16.666%-6.7px)] -> Exactly 6 items visible
            */
            className="flex-shrink-0 max-w-[calc(25%-6px)] sm:max-w-[calc(20%-6.4px)] md:max-w-[calc(16.666%-6.7px)] group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-sm shadow-xl transform group-hover:scale-105 transition duration-300 bg-neutral-900">
              <img
                src={game.image}
                alt={game.name}
                className="w-full max-h-14 sm:max-h-20 md:max-h-24 object-contain block"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGames;
