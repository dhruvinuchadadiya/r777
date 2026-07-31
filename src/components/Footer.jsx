import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Terms and Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Betting Rules', path: '/betting-rules' },
    { name: 'Deposits and Withdrawals Rules', path: '/payment-rules' }
  ];

  return (
    <footer className="bg-[#0B5563] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center space-x-4 space-y-2 md:space-y-0">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link
                to={link.path}
                className="text-sm hover:text-cyan-300 transition"
              >
                {link.name}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="hidden md:inline text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-6 text-sm text-gray-300">
          <p>&copy; 2026 R777. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
