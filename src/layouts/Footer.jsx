import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#F55345] text-white text-sm px-6 py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Budget Hero. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
