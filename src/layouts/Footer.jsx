import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#F55345] text-white text-sm px-6 py-8 mt-10 border-t border-[#f77166]/30 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Copyright */}
        <p className="text-white/90">&copy; {new Date().getFullYear()} <span className="font-semibold">Budget Hero</span>. All rights reserved.</p>
        
        {/* Footer Links */}
        <div className="flex flex-wrap gap-4 text-white/80">
          <Link 
            to="/about" 
            className="hover:text-white hover:underline transition duration-200"
          >
            About Us
          </Link>
          <Link 
            to="/privacy" 
            className="hover:text-white hover:underline transition duration-200"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="hover:text-white hover:underline transition duration-200"
          >
            Terms of Service
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-white hover:underline transition duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
