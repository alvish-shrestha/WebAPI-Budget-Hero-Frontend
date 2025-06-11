import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-red-600">
                BUDGET HERO
            </Link>
            <nav className="space-x-4 text-sm md:text-base">
                <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
                <Link to="/signup" className="text-gray-700 hover:text-red-600">Sign Up</Link>
            </nav>
        </header>
    );
};

export default Header;
