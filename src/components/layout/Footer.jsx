import { gameProviders } from "../../core/data/mockData";

const Footer = () => {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Terms and Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Betting Rules", path: "/betting-rules" },
    { name: "Deposits and Withdrawals Rules", path: "/payment-rules" },
  ];

  return (
    <footer className="pb-12 md:pb-0 bg-white md:bg-[#0B5563] text-black md:text-white">
      <div className="w-full max-w-7xl max-md:max-w-none mx-auto px-2 sm:px-4 py-4 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 mx-auto">
          {gameProviders.map((provider) => (
            <div
              key={provider.id}
              className="cursor-pointer hover:scale-110 transition transform duration-300 min-w-[60px] flex justify-center"
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="hidden md:block w-auto h-[32px] max-h-12 object-contain filter brightness-90 hover:brightness-110"
              />
              <img
                src={provider.mbLogo}
                alt={provider.name}
                className="block md:hidden w-auto h-[24px] max-h-12 object-contain filter brightness-90 hover:brightness-110"
              />
            </div>
          ))}
          <div className="cursor-pointer hover:scale-110 transition transform duration-300 min-w-[32px] flex justify-center">
            <img
              src="/images/providers/mb-18plus.svg"
              alt="18+"
              className="w-auto h-[24px] max-h-12 object-contain"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-black md:text-white text-[10px] font-bold">
          <p>
            You must be over 18 years old, or the legal age at which gambling or
            gaming activities are allowed under the law or jurisdiction that
            applies to you. You must reside in a country in which access to
            online gambling to its residents.
          </p>
        </div>
        {/* <div className="flex flex-wrap justify-center items-center space-x-4 space-y-2 md:space-y-0">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link
                to={link.path}
                className="text-sm hover:text-cyan-300 transition"
              >
                {link.name}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="hidden md:inline text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-6 text-sm text-gray-300">
          <p>&copy; 2026 R777. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
