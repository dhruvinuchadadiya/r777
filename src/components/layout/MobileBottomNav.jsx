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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B5563] border-t border-[#0D6F7E] z-50 w-full overflow-hidden">
        {/* CHANGED: Swapped justify-around for a grid or controlled flex layout with fluid gaps to prevent item crowding */}
        <div className="flex items-center justify-between px-1 py-2 max-w-full gap-0.5 xs:gap-1 sm:gap-2">
          {baseItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                /* CHANGED: Removed shrink-0, optimized padding (px-2.5 on tiny devices, scaling up), added flex-1 and min-w-0 for safety */
                className={`group flex items-center justify-center flex-1 min-w-0 px-2 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 ${
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
                    className="w-[18px] h-[18px] sm:w-5 sm:h-5 shrink-0 object-contain"
                  />
                )}

                {/* Text */}
                {/* CHANGED: Swapped hardcoded ml-2 for a dynamic gap spacing wrapper, and reduced text size to text-[11px] on micro viewports */}
                <span
                  className={`text-[11px] sm:text-xs ml-1 sm:ml-1.5 whitespace-nowrap truncate ${
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
            /* CHANGED: Synchronized style modifications here to align with the core grid block changes */
            className={`group flex items-center justify-center flex-1 min-w-0 px-2 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              drawerOpen
                ? "bg-gradient-to-b from-[#1a7a8a] to-[#0d5563] border border-[#2a95a8] text-[#34D399] font-bold brightness-110"
                : "text-white hover:text-[#34D399] hover:bg-gradient-to-b hover:from-[#5ecbdd] hover:to-[#0d5563] hover:border hover:border-[#2a95a8] hover:font-bold hover:brightness-110"
            }`}
          >
            <img
              src="/images/icons/menu.svg"
              alt="Account"
              className="w-[18px] h-[18px] sm:w-5 sm:h-5 shrink-0 object-contain"
            />
            <span
              className={`text-[11px] sm:text-xs ml-1 sm:ml-1.5 whitespace-nowrap truncate ${
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
