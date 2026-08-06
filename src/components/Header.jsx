import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Coins,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const languages = [
    { code: "EN", flag: "/images/flags/in.png" },
    { code: "US", flag: "/images/flags/us.png" },
    { code: "CA", flag: "/images/flags/ca.png" },
  ];

  const navItems = [
    { name: "Home", path: "/", highlight: true },
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
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0B5563] font-bold text-xl">R</span>
              </div>
              <span className="text-white font-bold text-3xl tracking-wider">
                R777
              </span>
            </Link>

            {/* Language Dropdown - Desktop */}
            <div className="hidden md:block relative ml-8">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-2 bg-[#0D6F7E] hover:bg-[#0f7e8f] border border-[#2a95a8] rounded-full pl-2 pr-3 py-1.5 transition"
              >
              <img
                  src={languages.find((l) => l.code === selectedLang)?.flag}
                  alt={selectedLang}
                  className="w-6 h-4 rounded-sm"
                />
                <span className="text-white text-sm font-medium">
                  {selectedLang}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-white transition-transform ${langMenuOpen ? "rotate-180" : ""}`}
              />
              </button>

              {langMenuOpen && (
                <div className="absolute left-0 mt-2 w-36 bg-[#1a1a2e] border border-[#0B5563] rounded-lg shadow-xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2.5 text-sm text-white hover:bg-[#2d2d44] transition"
                    >
              <img
                        src={lang.flag}
                        alt={lang.code}
                        className="w-6 h-4 rounded-sm"
              />
                      <span>{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center ml-4">
              {navItems.slice(0, 10).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded text-sm font-medium transition relative ${
                    item.highlight
                      ? "bg-[#34D399] text-white"
                      : "text-white hover:bg-[#0D6F7E]"
                  }`}
                >
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="inline w-4 h-4 mr-1"
                    />
                  )}
                  {item.name}
                  {item.badge && (
                    <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Login Button */}
            <div className="hidden md:block">
              <Button
                className="bg-[#1E88E5] hover:bg-[#1976D2] text-white px-6 py-2 rounded-full font-semibold shadow-lg transition"
                onClick={() => setLoginOpen(true)}
              >
                LOG IN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Secondary Navigation - Desktop */}
          <div className="hidden lg:flex items-center justify-center space-x-1 pb-2">
            {navItems.slice(10).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0D6F7E] rounded transition"
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="inline w-4 h-4 mr-1"
                  />
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D6F7E] border-t border-[#0B5563]">
            <nav className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-3 rounded text-sm font-medium transition ${
                    item.highlight
                      ? "bg-[#34D399] text-white"
                      : "text-white hover:bg-[#0B5563]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Button
                className="bg-[#1E88E5] hover:bg-[#1976D2] text-white w-full mt-4"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginOpen(true);
                }}
              >
                LOG IN
              </Button>
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
