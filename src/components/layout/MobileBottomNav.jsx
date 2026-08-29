import AccountDrawer from "@/components/layout/AccountDrawer";
import { useAuth } from "@/core/context/AuthContext";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const baseItems = [
    {
      name: "Home",
      path: "/",
      icon: "/images/icons/home.svg",
    },
    {
      name: "In-Play",
      path: "/in-play",
      icon: "/images/icons/inplay.svg",
    },
    {
      name: "MiniGame",
      path: "/mini-game",
      icon: "/images/icons/mini_games.gif",
    },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B5563] border-t border-[#0D6F7E] z-50">
        <div className="flex items-center justify-around py-2">
          {baseItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition ${
                  isActive ? "text-[#34D399]" : "text-white"
                }`}
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-6 h-6 xl:w-4 xl:h-4 shrink-0"
                  />
                )}
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
              <img
                src="/images/icons/menu.svg"
                alt="Account"
                className="w-6 h-6 xl:w-4 xl:h-4 shrink-0"
              />
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
