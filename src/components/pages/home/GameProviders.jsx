import { gameProviders } from "@/core/data/mockData";

const GameProviders = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] py-12">
      <div className="container mx-auto px-4">
        {/* Banner */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src="https://images.staticcontent.io/rde/login/r77/pg-banner.webp"
            alt="Promotional Banner"
            className="w-full h-auto"
          />
        </div>

        {/* Desktop Providers */}
        <div className="hidden md:flex items-center justify-center space-x-8 mb-8">
          {gameProviders.map((provider) => (
            <div
              key={provider.id}
              className="cursor-pointer hover:scale-110 transition transform duration-300"
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="h-12 w-auto object-contain filter brightness-90 hover:brightness-110"
              />
            </div>
          ))}
          <div className="cursor-pointer hover:scale-110 transition transform duration-300">
            <img
              src="https://images.staticcontent.io/casino/banner/loginimages/logo-18plus.svg"
              alt="18+"
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile Providers */}
        <div className="md:hidden grid grid-cols-3 gap-4 mb-8">
          {gameProviders.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-center p-4 bg-[#2d2d44] rounded-lg cursor-pointer hover:bg-[#3d3d54] transition"
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
          <div className="flex items-center justify-center p-4 bg-[#2d2d44] rounded-lg">
            <img
              src="https://images.staticcontent.io/casino/banner/loginimages/mobile/logo-18plus.svg"
              alt="18+"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-gray-400 text-sm max-w-3xl mx-auto">
          <p>
            You must be over 18 years old, or the legal age at which gambling or
            gaming activities are allowed under the law or jurisdiction that
            applies to you. You must reside in a country in which access to
            online gambling to its residents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameProviders;
