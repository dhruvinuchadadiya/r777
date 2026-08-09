import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Flame, Gamepad2, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AccountDrawer from "./AccountDrawer";

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const baseItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "In-Play", path: "/in-play", icon: Flame },
    { name: "MiniGame", path: "/mini-game", icon: Gamepad2 },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B5563] border-t border-[#0D6F7E] z-50">
        <div className="flex items-center justify-around py-2">
          {baseItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition ${
                  isActive ? "text-[#34D399]" : "text-white"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* 4th button — only shown when logged in, opens account drawer */}
          {isAuthenticated && (
            <button
              onClick={() => setDrawerOpen(true)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition ${
                drawerOpen ? "text-[#34D399]" : "text-white"
              }`}
            >
              <Menu size={24} />
              <span className="text-xs font-medium">Account</span>
            </button>
          )}
        </div>
      </div>

      <AccountDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default MobileBottomNav;
