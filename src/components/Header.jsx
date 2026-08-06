import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  Coins,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Bell,
} from "lucide-react";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const { user, isAuthenticated, logout } = useAuth();

  // 📍 GET CURRENT ROUTE PATH
  const location = useLocation();

  // 🔒 LOCK BACKGROUND SCROLL WHEN MOBILE MENU IS OPEN
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

  const languages = [
    { code: "EN", flag: "/images/flags/in.png" },
    { code: "US", flag: "/images/flags/us.png" },
    { code: "CA", flag: "/images/flags/ca.png" },
  ];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "In-Play", path: "/in-play" },
    { name: "Hundred Cup", path: "/hundred-cup", badge: "0" },
    { name: "Cricket", path: "/cricket", badge: "0" },
    { name: "Soccer", path: "/soccer", badge: "0" },
    { name: "Tennis", path: "/tennis" },
    { name: "Indian Poker", path: "/indian-poker" },
    { name: "Indian Poker II", path: "/indian-poker-2" },
    { name: "RV Games", path: "/rv-games" },
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
    { name: "Ezugi", path: "/ezugi" },
    { name: "Evolution", path: "/evolution" },
    { name: "Live Casino", path: "/live-casino" },
    { name: "Vivo", path: "/vivo" },
    { name: "Betgames", path: "/betgames" },
    { name: "Casino III", path: "/casino-3" },
  ];

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
          <div className="flex items-center justify-between py-3 w-full gap-2 md:gap-4">
            {/* 1. LEFT SECTION: Logo */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[#0B5563] font-bold text-xl">R</span>
                </div>
                <span className="text-white font-bold text-3xl tracking-wider">
                  R777
                </span>
              </Link>
            </div>

            {/* 2. MIDDLE SECTION: Desktop Scrollable Nav */}
            <div className="hidden md:flex items-center flex-1 min-w-0 mx-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center space-x-1 flex-nowrap mx-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`whitespace-nowrap px-2.5 py-1.5 rounded text-xs xl:text-sm font-medium transition shrink-0 flex items-center space-x-1.5 ${
                        isActive
                          ? "bg-[#34D399] text-white"
                          : "text-white hover:bg-[#0D6F7E]"
                      }`}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0"
                        />
                      )}
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-1 px-1.5 py-0.2 text-[9px] xl:text-[10px] bg-red-500 text-white rounded-full font-bold uppercase shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. RIGHT SECTION: Account & Controls */}
            <div className="flex items-center justify-end space-x-2 md:space-x-3 shrink-0 ml-auto">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 md:space-x-3">
                  {/* Wallet Cluster */}
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

                  {/* Right Controls */}
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
                          className="w-9 h-9 flex items-center justify-center bg-[#34D399] rounded-full hover:brightness-110 transition shrink-0"
                        >
                          <UserIcon size={18} className="text-white" />
                        </button>

                        {userMenuOpen && (
                          <div className="absolute right-0 mt-2 w-44 bg-[#1a1a2e] border border-[#0B5563] rounded-lg shadow-xl overflow-hidden z-50">
                            <div className="px-4 py-2.5 border-b border-[#2d2d44]">
                              <p className="text-white text-sm font-medium truncate">
                                {user?.username || "Player"}
                              </p>
                            </div>
                            <button
                              onClick={async () => {
                                setUserMenuOpen(false);
                                await logout();
                              }}
                              className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-400 hover:bg-[#2d2d44] transition"
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
                        className="flex items-center space-x-1.5 bg-[#0D6F7E] hover:bg-[#0f7e8f] border border-[#2a95a8] rounded-full px-2.5 py-0.5 transition"
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
                              className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-white hover:bg-[#2d2d44] transition"
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

              {/* Mobile Menu Toggle Button */}
              <button
                className="md:hidden text-white shrink-0 ml-1 p-1 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 FIXED & ISOLATED MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[121px] bottom-0 bg-[#0D6F7E] border-t border-[#0B5563] overflow-y-auto z-50">
            <nav className="flex flex-col space-y-1 p-4 pb-24">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded text-sm font-medium transition ${
                      isActive
                        ? "bg-[#34D399] text-white"
                        : "text-white hover:bg-[#0B5563]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-4 h-4 shrink-0"
                        />
                      )}
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
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

      {/* Dialogs */}
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <SignUpDialog open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  );
};

export default Header;
