import React from 'react';
import { Link } from 'react-router-dom';
import icon from "../assets/images/icon.png";

const Header = () => {
  return (
    <header className="bg-[#FFEDE9] px-6 py-4 shadow-md border-b border-[#fcdcd4]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-[#F55345] font-extrabold text-2xl tracking-tight"
        >
          <img src={icon} alt="Budget Hero Icon" className="h-8 w-8" />
          <span>Budget Hero</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-[#1F2937] font-medium">
          <Link 
            to="/" 
            className="hover:text-[#F55345] transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/login"
            className="hover:text-[#F55345] transition-colors duration-200"
          >
            Login
          </Link>
          <Link to="/sign-up">
            <button className="bg-[#F55345] text-white px-5 py-2 rounded-full shadow hover:bg-[#e04538] transition-colors duration-200 font-semibold">
              Register
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
