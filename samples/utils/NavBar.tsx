import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NavBar() {
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
        { name: 'Pie Chart', path: '/pie-chart' },
        { name: 'Double Layer Pie Chart', path: '/double-layer-pie' },
        { name: 'Straight Angle Pie Chart', path: '/straight-angle-pie' },
        { name: 'Pie Chart with Padding Angle', path: '/pie-chart-with-padding-angle' },
        { name: 'Pie Chart with Customized Label', path: '/pie-chart-with-customized-label' },
        { name: 'Custom Active Shape Pie Chart', path: '/custom-active-shape-pie' },
      ],
    },
    {
      category: 'Line Charts',
      items: [
        { name: 'Line Chart', path: '/line-chart' },
        { name: 'Dashed Line Chart', path: '/dashed-line-chart' },
        { name: 'Reference Line Chart', path: '/reference-line-chart' },
        { name: 'Tiny Line Chart', path: '/tiny-line-chart' },
        { name: 'No Nulls Chart', path: '/no-nulls' },
      ],
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex justify-center space-x-2">
          {navSections.map((section) => (
            <li key={section.category} className="relative group">
              <button
                onClick={() => handleDropdownToggle(section.category)}
                className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <span>{section.category}</span>
                {openDropdown === section.category ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openDropdown === section.category && (
                <ul className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 py-1 animate-fadeIn">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`block px-4 py-2 text-sm ${
                          location.pathname === item.path
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                        } transition duration-300 ease-in-out`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}