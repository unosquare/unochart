import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar flex justify-between items-center p-4 mb-2">
      <div className="flex space-x-4">
        <Link className="nav-link text-lg font-semibold" to="/">
          Normal BarChart
        </Link>
        <Link className="nav-link text-lg font-semibold" to="/stacked">
          Stacked BarChart
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
