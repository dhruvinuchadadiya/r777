import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, Gamepad2, Menu } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'In-Play', path: '/in-play', icon: Flame },
    { name: 'MiniGame', path: '/mini-game', icon: Gamepad2 },
    { name: 'Menu', path: '/menu', icon: Menu }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B5563] border-t border-[#0D6F7E] z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition ${
                isActive ? 'text-[#34D399]' : 'text-white'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
