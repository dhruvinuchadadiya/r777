import React from 'react';
import { ChevronRight } from 'lucide-react';
import { promoCards } from '../mockData';

const PromoCards = () => {
  const getIcon = (iconType) => {
    const icons = {
      cricket: (
        <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path d="M12 2 L12 22 M2 12 L22 12" strokeWidth="2"/>
        </svg>
      ),
      slot: (
        <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" opacity="0.9"/>
          <text x="12" y="14" fontSize="14" textAnchor="middle" fill="white" fontWeight="bold">777</text>
        </svg>
      ),
      tennis: (
        <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2"/>
          <path d="M12 3 Q18 12 12 21 M12 3 Q6 12 12 21" strokeWidth="2" fill="none"/>
        </svg>
      )
    };
    return icons[iconType];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promoCards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-2xl p-8 overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 shadow-2xl"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white text-3xl font-black mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-white text-lg font-bold whitespace-pre-line">
                  {card.subtitle}
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {card.category}
                  </span>
                </div>
              </div>

              <div className="ml-4 flex-shrink-0">
                {getIcon(card.icon)}
              </div>
            </div>

            {/* Arrow Button */}
            <div className="absolute bottom-8 right-8 bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition">
              <ChevronRight className="text-white" size={28} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoCards;
