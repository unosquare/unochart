// NavBar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (category: string) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const navSections = [
    {
      category: 'Bar Charts',
      items: [
        { name: 'Normal BarChart', path: '/' },
        { name: 'Stacked BarChart', path: '/stacked' },
        { name: 'Ranged BarChart', path: '/ranged' },
      ],
    },
    {
      category: 'Pie Charts',
      items: [
        { name: 'Double Layer Pie Chart', path: '/double-layer-pie' },
        { name: 'Pie Chart', path: '/pie-chart' },
        { name: 'Straight Angle Pie Chart', path: '/straight-angle-pie' },
        { name: 'Pie Chart with Padding Angle', path: '/pie-chart-with-padding-angle' },
        { name: 'Pie Chart with Customized Label', path: '/pie-chart-with-customized-label' },
      ],
    },
  ];

  return (
    <nav className="bg-white p-4 shadow-lg stroke-purple-600 mb-5">
      <div className="container mx-auto flex justify-center space-x-6">
        {navSections.map((section) => (
          <div className="relative" key={section.category}>
            <button
              onClick={() => handleDropdownToggle(section.category)}
              className="text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
            >
              {section.category}
            </button>
            {openDropdown === section.category && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`block px-4 py-2 text-purple-600 hover:bg-purple-200 ${
                          location.pathname === item.path ? 'bg-purple-400 text-white' : ''
                        }`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
