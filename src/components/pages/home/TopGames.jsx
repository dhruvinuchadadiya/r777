import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { topGames } from "../../../mockData";

const TopGames = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0f0f1e] to-[#1a1a2e] py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-3xl font-bold">Top Games</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="bg-[#0B5563] hover:bg-[#0D6F7E] text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-[#0B5563] hover:bg-[#0D6F7E] text-white p-2 rounded-full transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {topGames.map((game) => (
            <div
              key={game.id}
              className="flex-shrink-0 w-48 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-xl transform group-hover:scale-105 transition duration-300">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                  <button className="bg-white text-[#0B5563] px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                    Play Now
                  </button>
                </div>
              </div>
              <p className="text-white text-center mt-3 font-medium">
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
