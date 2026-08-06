import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  User as UserIcon,
  FileText,
  PieChart,
  History,
  ClipboardList,
  Hand,
  BookOpen,
  Lock,
  CheckSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { name: "Account Statement", path: "/account-statement", icon: FileText },
  { name: "Profit Loss Report", path: "/profit-loss-report", icon: PieChart },
  { name: "Bet History", path: "/bet-history", icon: History },
  { name: "Unsettled Bet", path: "/unsettled-bet", icon: ClipboardList },
  { name: "Set Stake", path: "/set-stake", icon: Hand },
  { name: "Rules", path: "/betting-rules", icon: BookOpen },
  { name: "Change Password", path: "/change-password", icon: Lock },
  { name: "Results", path: "/results", icon: CheckSquare },
];

const AccountDrawer = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!open) return null;

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-[#0d5563] z-[70] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white hover:text-[#34D399] transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 pb-4 flex items-center space-x-2">
          <UserIcon size={20} className="text-[#34D399]" />

          <span className="text-white font-medium">
            {user?.username || "Player"} - ({(user?.balance ?? 0).toFixed(2)})
          </span>
        </div>

        {/* Exposure & P&L cards */}
        <div className="px-5 pb-5 grid grid-cols-2 gap-3">
          <div className="bg-[#17b3c9] rounded-lg p-4 shadow">
            <p className="text-white font-semibold text-sm mb-2">Exposure</p>
            <p className="text-[#0d3a44] font-bold">
              {(user?.exposureLimit ?? 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-[#17b3c9] rounded-lg p-4 shadow">
            <p className="text-white font-semibold text-sm mb-2">P&amp;L</p>
            <p className="text-[#0d3a44] font-bold">
              {(user?.profitLoss ?? 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Menu items */}
        <nav className="pb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-4 px-5 py-3.5 border-b border-[#0a4550] transition-all duration-200 ${
                  isActive
                    ? "bg-[#34D399] text-[#0d5563] font-bold border-l-4 border-l-white shadow-md"
                    : "text-white hover:bg-[#34D399]/20 hover:text-[#34D399] hover:pl-7"
                }`}
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-[#0d5563]" : "text-white"
                  }`}
                />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-5 py-4 text-white hover:bg-red-500/20 hover:text-red-400 transition"
          >
            <LogOut size={20} className="text-red-400 shrink-0" />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default AccountDrawer;
