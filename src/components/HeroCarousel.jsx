import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroBanners } from '../mockData';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] overflow-hidden">
      {/* Desktop Carousel */}
      <div className="hidden md:block relative h-[600px]">
        <div className="absolute inset-0">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroBanners.map((banner, index) => (
              <div key={banner.id} className="min-w-full h-full relative flex items-center justify-center">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40"></div>
                
                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 flex items-center justify-between">
                  <div className="max-w-2xl">
                    <h1 className="text-7xl font-black text-white mb-4 leading-tight">
                      {banner.title}
                      <br />
                      <span className="text-6xl">{banner.subtitle}</span>
                    </h1>
                    <div className="flex items-center space-x-3 text-white text-lg mb-8">
                      {banner.sports.map((sport, idx) => (
                        <React.Fragment key={sport}>
                          <span className="font-medium">{sport}</span>
                          {idx < banner.sports.length - 1 && <span className="text-cyan-400">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <button className="bg-gradient-to-r from-[#7B2FFF] to-[#3B82F6] hover:from-[#6B1FEF] hover:to-[#2563EB] text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl transform hover:scale-105 transition duration-300">
                      BET NOW
                    </button>
                  </div>
                  
                  {/* Athletes Image Placeholder */}
                  <div className="hidden lg:block">
                    <div className="w-[500px] h-[400px] relative">
                      {/* Simulated athletes silhouettes */}
                      <div className="absolute inset-0 flex items-end justify-center space-x-8">
                        <div className="w-32 h-64 bg-gradient-to-t from-blue-500/30 to-transparent rounded-t-full"></div>
                        <div className="w-32 h-72 bg-gradient-to-t from-purple-500/30 to-transparent rounded-t-full"></div>
                        <div className="w-32 h-64 bg-gradient-to-t from-cyan-500/30 to-transparent rounded-t-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition z-20"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition z-20"
        >
          <ChevronRight size={32} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative h-[400px]">
        <div className="absolute inset-0">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroBanners.map((banner) => (
              <div key={banner.id} className="min-w-full h-full relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-blue-900/50"></div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                  <h1 className="text-4xl font-black text-white mb-3 leading-tight">
                    {banner.title}
                    <br />
                    {banner.subtitle}
                  </h1>
                  <div className="flex items-center justify-center space-x-2 text-white text-sm mb-6">
                    {banner.sports.slice(0, 3).map((sport, idx) => (
                      <React.Fragment key={sport}>
                        <span>{sport}</span>
                        {idx < 2 && <span className="text-cyan-400">•</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <button className="bg-gradient-to-r from-[#7B2FFF] to-[#3B82F6] text-white px-8 py-3 rounded-full font-bold shadow-xl">
                    BET NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
