import AccountDrawer from "@/components/layout/AccountDrawer";
import LoginDialog from "@/components/layout/LoginDialog";
import SignUpDialog from "@/components/layout/SignUpDialog";
import SportIcon from "@/components/layout/SportIcon";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/core/context/AuthContext";
import { getSportLiveCount, getTotalLiveCount } from "@/core/data/liveMatches";
import { useOutsideClick } from "@/core/hooks/useOutsideClick";
import {
  Bell,
  ChevronDown,
  Coins,
  LogOut,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
    { name: "Ezugi", path: "/ezugi", iconKey: "rvGames" },
    { name: "Evolution", path: "/evolution", iconKey: "rvGames" },
    { name: "Live Casino", path: "/live-casino", iconKey: "poker" },
    { name: "Vivo", path: "/vivo", iconKey: "rvGames" },
    { name: "Betgames", path: "/betgames", iconKey: "rvGames" },
    { name: "Casino III", path: "/casino-3", iconKey: "poker" },
  ];

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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#0B5563] text-white py-2 px-4 text-center text-sm overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          Enjoy Unmatched Betting Excitement and Access 500+ Casino and Online
          Games
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[#0B5563] shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 w-full gap-2 md:gap-4">
            {/* 1. Logo */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[#0B5563] font-bold text-xl">R</span>
                </div>
                <span className="text-white font-bold text-2xl tracking-wider">
                  R777
                </span>
              </Link>
            </div>

            {/* 2. Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 min-w-0 mx-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center space-x-3 flex-nowrap mx-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      ref={isActive ? activeNavRef : null}
                      to={item.path}
                      className={`px-2 py-1.5 rounded-md transition-all duration-200 shrink-0 flex flex-col items-center justify-center group ${
                        isActive
                          ? "bg-[#094753] text-[#34D399] font-bold"
                          : "text-white hover:text-[#34D399]"
                      }`}
                    >
                      {/* Icon Container with Floating Badge */}
                      <div className="relative flex items-center justify-center pt-1">
                        {item.iconKey && (
                          <SportIcon name={item.iconKey} size={36} />
                        )}
                        {item.icon && (
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-8 h-8 shrink-0 object-contain overflow-hidden"
                          />
                        )}

                        {/* LIVE Badge attached to top-right of Icon */}
                        {item.badge !== undefined && item.badge !== null && (
                          <div className="absolute -top-1 -right-4 flex items-center overflow-hidden rounded-[3px] text-[9px] font-bold shadow-md z-10 leading-none">
                            <span className="bg-white text-red-600 px-1 py-[2px] tracking-tighter">
                              LIVE
                            </span>
                            <span className="bg-red-600 text-white px-1 py-[2px]">
                              {item.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Capitalized Name Below Icon */}
                      <span className="text-[11px] font-extrabold uppercase tracking-wide mt-1 whitespace-nowrap">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Controls & Account */}
            <div className="flex items-center justify-end space-x-2 md:space-x-3 shrink-0 ml-auto">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="hidden md:flex flex-col space-y-1 shrink-0">
                    <div className="flex items-center justify-center space-x-1.5 bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] rounded-full px-3 py-1 shadow-inner">
                      <Coins
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-white font-semibold text-xs">
                        {(user?.balance ?? 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] rounded-full px-3 py-1 shadow-inner">
                      <span className="text-white font-semibold text-xs text-center block">
                        Exp : {(user?.exposureLimit ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 shrink-0">
                    <div className="flex items-center space-x-2">
                      <button className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] rounded-full hover:brightness-110 transition shrink-0">
                        <Bell size={18} className="text-white" />
                        {notificationCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {notificationCount}
                          </span>
                        )}
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                          className="w-9 h-9 flex items-center justify-center bg-[#34D399] text-[#0B5563] rounded-full hover:brightness-110 transition shrink-0 shadow-md"
                        >
                          <UserIcon size={18} />
                        </button>

                        {userMenuOpen && (
                          <div className="absolute right-0 mt-2 w-44 bg-[#1a1a2e] border border-[#0B5563] rounded-lg shadow-xl overflow-hidden z-50">
                            <div className="px-4 py-2.5 border-b border-[#2d2d44]">
                              <p className="w-full flex items-center space-x-2 text-white text-sm font-medium truncate">
                                <UserIcon size={18} />
                                <span>{user?.username || "Player"}</span>
                              </p>
                            </div>
                            <div className="hidden md:flex flex-col space-y-1 shrink-0">
                              {isAuthenticated && (
                                <button
                                  onClick={() => setDrawerOpen(true)}
                                  className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-white hover:bg-[#34D399]/15 transition"
                                >
                                  <Menu size={16} />
                                  <span>Account</span>
                                </button>
                              )}
                            </div>
                            <button
                              onClick={async () => {
                                setUserMenuOpen(false);
                                await logout();
                              }}
                              className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-400 hover:bg-[#34D399]/15 transition"
                            >
                              <LogOut size={16} />
                              <span>Log Out</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setLangMenuOpen(!langMenuOpen)}
                        className="flex items-center space-x-1.5 bg-[#0D6F7E] hover:text-[#34D399] border border-[#2a95a8] rounded-full px-2.5 py-0.5 hover:brightness-110 transition"
                      >
                        <img
                          src={
                            languages.find((l) => l.code === selectedLang)?.flag
                          }
                          alt={selectedLang}
                          className="w-5 h-3.5 rounded-sm"
                        />
                        <span className="text-white text-xs font-medium">
                          {selectedLang}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`text-white transition-transform ${
                            langMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {langMenuOpen && (
                        <div className="absolute right-0 mt-1 w-32 bg-[#1a1a2e] border border-[#0B5563] rounded-lg shadow-xl overflow-hidden z-50">
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
                                className="w-5 h-3.5 rounded-sm"
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
                <Button
                  className="bg-[#1E88E5] hover:bg-[#1976D2] text-white px-4 md:px-6 py-2 rounded-full font-semibold shadow-lg transition text-sm md:text-base shrink-0"
                  onClick={() => setLoginOpen(true)}
                >
                  <UserIcon size={16} className="mr-1.5 md:hidden" />
                  LOG IN
                </Button>
              )}

              {/* Mobile Toggle */}
              <button
                className="md:hidden text-white shrink-0 ml-1 p-1 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[121px] bottom-0 bg-[#0D6F7E] border-t border-[#0B5563] overflow-y-auto z-50">
            <nav className="flex flex-col space-y-1.5 p-4 pb-24">
              {navItems.map((item) => {
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
                        <SportIcon name={item.iconKey} size={22} />
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

              {isAuthenticated ? (
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
              ) : null}
            </nav>
          </div>
        )}
      </header>

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
