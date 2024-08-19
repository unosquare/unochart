import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex space-x-4">
        <Link to="/" className="text-white hover:underline">
          Normal BarChart
        </Link>
        <Link to="/stacked" className="text-white hover:underline">
          Stacked BarChart
        </Link>
        <Link to="/ranged" className="text-white hover:underline">
          Ranged BarChart
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
