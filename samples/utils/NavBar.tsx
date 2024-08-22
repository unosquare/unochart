import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Normal BarChart', path: '/' },
    { name: 'Stacked BarChart', path: '/stacked' },
    { name: 'Ranged BarChart', path: '/ranged' },
  ];

  return (
    <nav className="bg-white p-4 shadow-lg stroke-purple-600 mb-5">
      <div className="container mx-auto flex justify-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-purple-600 py-2 px-4 rounded-lg ${
              location.pathname === item.path
                ? ' bg-purple-400'
                : 'hover:bg-purple-600 hover:text-white'
            } transition duration-300 ease-in-out`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
