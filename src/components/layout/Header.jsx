import {
  Bell,
  ChevronDown,
  Coins,
  LogOut,
  Megaphone,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../core/context/AuthContext";
import {
  getSportLiveCount,
  getTotalLiveCount,
} from "../../core/data/liveMatches";
import { useOutsideClick } from "../../core/hooks/useOutsideClick";
import { Button } from "../ui/button";
import AccountDrawer from "./AccountDrawer";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import SportIcon from "./SportIcon";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const { user, isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const location = useLocation();
  const activeNavRef = useRef(null);
  const activeMobileNavRef = useRef(null);
  const langMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const languages = [
    { code: "EN", flag: "/images/flags/in.png" },
    { code: "US", flag: "/images/flags/us.png" },
    { code: "CA", flag: "/images/flags/ca.png" },
  ];

  // Live counts pulled from shared data source
  const cricketLiveCount = getSportLiveCount("cricket");
  const soccerLiveCount = getSportLiveCount("soccer");
  const tennisLiveCount = getSportLiveCount("tennis");
  const totalLiveCount = getTotalLiveCount();

  const navItems = [
    { name: "Home", path: "/", iconKey: "home" },
    {
      name: "In-Play",
      path: "/in-play",
      iconKey: "inPlay",
      badge: String(totalLiveCount),
    },
    {
      name: "Hundred Cup",
      path: "/hundred-cup",
      iconKey: "hundredCup",
      badge: "0",
      isHidden: true,
    },
    {
      name: "Cricket",
      path: "/cricket",
      iconKey: "cricket",
      badge: String(cricketLiveCount),
    },
    {
      name: "Soccer",
      path: "/soccer",
      iconKey: "soccer",
      badge: String(soccerLiveCount),
    },
    {
      name: "Tennis",
      path: "/tennis",
      iconKey: "tennis",
      badge: String(tennisLiveCount),
    },
    { name: "Indian Poker", path: "/indian-poker", iconKey: "poker" },
    { name: "Indian Poker II", path: "/indian-poker-2", iconKey: "pokerII" },
    { name: "RV Games", path: "/rv-games", iconKey: "rvGames" },
    {
      name: "Aviator",
      path: "/aviator",
      icon: "/images/icons/aviator-icon.svg",
    },
    {
      name: "Chicken Road",
      path: "/chicken-road",
      icon: "/images/icons/inout-icon.svg",
    },
    { name: "Ezugi", path: "/ezugi", iconKey: "rvGames", isHot: true },
    { name: "Evolution", path: "/evolution", iconKey: "rvGames" },
    { name: "Live Casino", path: "/live-casino", iconKey: "poker" },
    { name: "Vivo", path: "/vivo", iconKey: "rvGames" },
    { name: "Betgames", path: "/betgames", iconKey: "rvGames" },
    { name: "Casino III", path: "/casino-3", iconKey: "poker" },
  ];

  // Live Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  };

  const marqueeText =
    "Enjoy Unmatched Betting Excitement and Access 500+ Casino and Online Games";

  useOutsideClick(langMenuRef, () => setLangMenuOpen(false));
  useOutsideClick(userMenuRef, () => setUserMenuOpen(false));

  useEffect(() => {
    if (activeNavRef.current) {
      activeNavRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen && activeMobileNavRef.current) {
      const timer = setTimeout(() => {
        activeMobileNavRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen, location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen || drawerOpen || loginOpen || signUpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, drawerOpen, loginOpen, signUpOpen]);

  return (
    <>
      {/* Sticky Parent Wrapper keeping the entire header stack locked together */}
      <div className="sticky md:top-0 z-40 w-full shadow-lg">
        <div className="w-full bg-[#0B5563] text-white py-1.5 px-3 text-xs flex items-center justify-between border-b border-[#094753] select-none">
          {/* Left Icon Section */}
          <div className="flex items-center space-x-2 shrink-0 z-10 bg-[#0B5563] pr-3">
            <Megaphone size={15} className="text-white fill-white shrink-0" />
          </div>

          {/* Marquee Wrapper - Fixed to take up all remaining middle space */}
          <div className="flex-1 min-w-0 overflow-hidden relative flex items-center h-full">
            <div className="ticker-track flex whitespace-nowrap">
              <span className="text-[12px] font-medium tracking-wide pr-16 shrink-0">
                {marqueeText}
              </span>
              <span className="text-[12px] font-medium tracking-wide pr-16 shrink-0">
                {marqueeText}
              </span>
              <span className="text-[12px] font-medium tracking-wide pr-16 shrink-0">
                {marqueeText}
              </span>
              <span className="text-[12px] font-medium tracking-wide pr-16 shrink-0">
                {marqueeText}
              </span>
            </div>
          </div>

          {/* Right Live Clock Section */}
          <div className="shrink-0 z-10 bg-[#0B5563] pl-3 text-[12px] font-semibold tracking-wider text-white whitespace-nowrap">
            {formatDateTime(currentTime)}
          </div>
        </div>

        {/* Main Header */}
        <header className="bg-gradient-to-b from-[#022c43] to-[#18b0c8]">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 bg-transparent">
            <div className="flex items-center justify-between py-2 w-full gap-2 md:gap-4">
              <div className="flex items-center shrink-0">
                <button
                  className="md:hidden text-white shrink-0 mr-1 pr-1 py-1 focus:outline-none"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/images/logo/brand_logo.svg"
                    alt="R777 Logo"
                    className="h-14 w-auto object-contain"
                  />
                </Link>
              </div>

              <div className="flex items-center justify-end space-x-2 md:space-x-3 shrink-0 ml-auto">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {/* Left Column: Balance & Exposure styled as clean data details (Non-button look) */}
                    <div className="flex flex-col space-y-0.5 shrink-0 px-4 py-2 bg-black/20 rounded-md border border-white/5">
                      <div className="flex items-center space-x-1.5">
                        <Coins
                          size={13}
                          className="text-yellow-400 fill-yellow-400 shrink-0"
                        />
                        <span className="text-white font-medium text-xs tracking-tight">
                          {(user?.balance ?? 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-white/70 text-[10px] uppercase font-medium">
                          Exp:
                        </span>
                        <span className="text-white font-medium text-xs tracking-tight">
                          {(user?.exposureLimit ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: 2-Row Compact Cluster for Utilities & Language */}
                    <div className="flex flex-col space-y-1 shrink-0 items-end">
                      {/* Top Row: Notifications & Profile Icon */}
                      <div className="flex items-center space-x-1.5">
                        <button className="relative w-7 h-7 flex items-center justify-center bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] rounded-full hover:brightness-110 transition shrink-0">
                          <Bell size={12} className="text-white" />
                          {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                              {notificationCount}
                            </span>
                          )}
                        </button>

                        <div className="relative" ref={userMenuRef}>
                          <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="w-7 h-7 flex items-center justify-center bg-[#34D399] text-[#0B5563] rounded-full hover:brightness-110 transition shrink-0 shadow-md"
                          >
                            <UserIcon size={12} />
                          </button>

                          {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-[#1a1a2e] border border-[#0B5563] rounded-lg shadow-xl overflow-hidden z-50">
                              <div className="px-4 py-2.5 border-b border-[#2d2d44]">
                                <p className="w-full flex items-center space-x-2 text-white text-sm font-medium truncate">
                                  <UserIcon size={14} />
                                  <span>{user?.username || "Player"}</span>
                                </p>
                              </div>

                              <button
                                onClick={() => {
                                  setUserMenuOpen(false);
                                  setDrawerOpen(true);
                                }}
                                className="hidden md:flex w-full items-center space-x-2 px-4 py-3 text-sm text-white hover:bg-[#34D399]/15 transition border-b border-[#2d2d44]"
                              >
                                <Menu size={14} />
                                <span>Account</span>
                              </button>

                              <button
                                onClick={async () => {
                                  setUserMenuOpen(false);
                                  await logout();
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-400 hover:bg-[#34D399]/15 transition"
                              >
                                <LogOut size={14} />
                                <span>Log Out</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Language Selector tucked neatly underneath */}
                      <div className="relative" ref={langMenuRef}>
                        <button
                          onClick={() => setLangMenuOpen(!langMenuOpen)}
                          className="flex items-center space-x-1 bg-[#0D6F7E] hover:text-[#34D399] border border-[#2a95a8] rounded-full px-2 py-0.5 hover:brightness-110 transition"
                        >
                          <img
                            src={
                              languages.find((l) => l.code === selectedLang)
                                ?.flag
                            }
                            alt={selectedLang}
                            className="w-4 h-3 rounded-sm"
                          />
                          <span className="text-white text-[10px] font-medium">
                            {selectedLang}
                          </span>
                          <ChevronDown
                            size={10}
                            className={`text-white transition-transform ${
                              langMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {langMenuOpen && (
                          <div className="absolute right-0 mt-1 w-28 bg-[#1a1a2e] border border-[#0B5563] rounded-lg shadow-xl overflow-hidden z-50">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => {
                                  setSelectedLang(lang.code);
                                  setLangMenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-white hover:bg-[#34D399]/20 hover:text-[#34D399] transition"
                              >
                                <img
                                  src={lang.flag}
                                  alt={lang.code}
                                  className="w-4 h-3 rounded-sm"
                                />
                                <span>{lang.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Unauthenticated View
                  <Button
                    className="flex items-center gap-1 w-[84px] h-[32px] bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] rounded-full hover:brightness-110 transition shrink-0"
                    onClick={() => setLoginOpen(true)}
                  >
                    <UserIcon size={14} />
                    LOG IN
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* 2. Desktop Navigation Bar */}
        <div className="bg-[#0B5563] text-white text-center text-xs overflow-hidden whitespace-nowrap">
          <div className="flex items-center flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center flex-nowrap mx-auto">
              {navItems.map((item) => {
                if (item.isHidden) return null;

                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    ref={isActive ? activeNavRef : null}
                    to={item.path}
                    className={`px-[15px] rounded-md transition-all duration-200 shrink-0 flex flex-col items-center justify-center group ${
                      isActive
                        ? "bg-gradient-to-b from-[#5ecbdd] to-[#146578] border border-[#2a95a8] rounded-none transition text-[#34D399] font-bold"
                        : "hover:brightness-110 text-white hover:text-[#34D399]"
                    }`}
                  >
                    <div className="relative flex items-center justify-center pt-1">
                      {item.iconKey && (
                        <SportIcon name={item.iconKey} size={28} />
                      )}
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-8 h-6 shrink-0 object-contain overflow-hidden"
                        />
                      )}

                      {item.badge !== undefined && item.badge !== null && (
                        <div className="absolute top-[5px] -right-[23px] flex items-center overflow-hidden rounded-[3px] text-[9px] font-bold shadow-md z-10 leading-none">
                          <span className="bg-white text-red-600 px-1 py-[2px] tracking-tighter">
                            LIVE
                          </span>
                          <span className="bg-red-600 text-white px-1 py-[2px]">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-[12px] ${
                        isActive ? "font-extrabold" : "font-bold"
                      } uppercase tracking-wide mt-1 whitespace-nowrap ${
                        item.isHot ? "animate-color-cycle" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-x-0 ${
            isAuthenticated ? "top-[93px]" : "top-[76px]"
          } bottom-0 bg-[#0D6F7E] border-t border-[#0B5563] overflow-y-auto z-50 shadow-2xl`}
        >
          <nav className={`flex flex-col space-y-1.5 p-4 pb-16`}>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDrawerOpen(true);
                }}
                className="flex items-center justify-between w-full px-4 py-3 bg-[#0B5563] hover:bg-[#1a7a8a] text-white rounded-lg font-bold text-xs uppercase transition shadow-md mb-2 border border-[#2a95a8]"
              >
                <div className="flex items-center space-x-2">
                  <UserIcon size={18} className="text-[#34D399]" />
                  <span>My Account</span>
                </div>
                <ChevronDown size={16} className="-rotate-90 text-[#34D399]" />
              </button>
            )}

            {navItems.map((item) => {
              if (item.isHidden) return null;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  ref={isActive ? activeMobileNavRef : null}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-md text-xs uppercase font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#34D399] text-[#0B5563] shadow-md"
                      : "text-white hover:bg-[#34D399]/20 hover:text-[#34D399]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    {item.iconKey && (
                      <SportIcon name={item.iconKey} size={30} />
                    )}
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-5 h-5 shrink-0"
                      />
                    )}
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== undefined && item.badge !== null && (
                    <div className="flex items-center overflow-hidden rounded-[3px] text-[10px] font-bold">
                      <span className="bg-white text-red-600 px-1.5 py-0.5">
                        LIVE
                      </span>
                      <span className="bg-red-600 text-white px-1.5 py-0.5">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}

            {isAuthenticated && (
              <div className="mt-4 space-y-2 pt-2 border-t border-[#0B5563]">
                <div className="flex items-center justify-between bg-[#0B5563] rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Coins
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-white text-sm font-medium">
                      {(user?.balance ?? 0).toFixed(2)}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">
                    Exp : {(user?.exposureLimit ?? 0).toFixed(2)}
                  </span>
                </div>

                <Button
                  className="bg-red-600 hover:bg-red-700 text-white w-full"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                >
                  LOG OUT
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}

      <AccountDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToSignUp={() => setSignUpOpen(true)}
      />
      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
    </>
  );
};

export default Header;
