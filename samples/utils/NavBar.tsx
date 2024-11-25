import type React from 'react';
import { useLocation } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import { NAV_SECTIONS } from './constants';

const NavBar: React.FC = () => {
    const location = useLocation();

    return (
        <nav className='bg-white shadow-md'>
            <div className='container mx-auto px-4 py-2'>
                <ul className='flex justify-center space-x-2'>
                    {NAV_SECTIONS.map((section) => (
                        <li key={section.category} className='relative'>
                            <NavDropdown
                                category={section.category}
                                items={section.items}
                                currentPath={location.pathname}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
