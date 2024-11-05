import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const NavDropdown = ({ category, items, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        <span>{category}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 py-1 animate-fadeIn">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 text-sm ${
                  currentPath === item.path
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                } transition duration-300 ease-in-out`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavDropdown;