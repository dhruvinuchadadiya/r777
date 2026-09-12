import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../core/context/AuthContext";
import AccountDrawer from "./AccountDrawer";
import LoginDialog from "./LoginDialog";

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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

  const handleAccountDrawer = () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    setDrawerOpen(true);
  };

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
                className={`group flex items-center px-3 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-gradient-to-b from-[#5ecbdd] to-[#0d5563] border border-[#2a95a8] text-[#34D399] font-bold brightness-110"
                    : "text-white hover:text-[#34D399] hover:bg-gradient-to-b hover:from-[#5ecbdd] hover:to-[#0d5563] hover:border hover:border-[#2a95a8] hover:font-bold hover:brightness-110"
                }`}
              >
                {/* Icon */}
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 shrink-0 object-contain"
                  />
                )}

                {/* Text: Hidden by default, visible when active or on hover */}
                <span
                  className={`text-xs ml-2 whitespace-nowrap ${
                    isActive
                      ? "inline-block"
                      : "hidden group-hover:inline-block"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          <button
            onClick={handleAccountDrawer}
            className={`group flex items-center px-3 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
              drawerOpen
                ? "bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] text-[#34D399] font-bold brightness-110"
                : "text-white hover:text-[#34D399] hover:bg-gradient-to-b hover:from-[#5ecbdd] hover:to-[#0d5563] hover:border hover:border-[#2a95a8] hover:font-bold hover:brightness-110"
            }`}
          >
            <img
              src="/images/icons/menu.svg"
              alt="Account"
              className="w-5 h-5 shrink-0 object-contain"
            />
            <span
              className={`text-xs ml-2 whitespace-nowrap ${
                drawerOpen ? "inline-block" : "hidden group-hover:inline-block"
              }`}
            >
              Account
            </span>
          </button>
        </div>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <AccountDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default MobileBottomNav;
