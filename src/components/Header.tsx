import React from 'react';
import logo from '../assets/logo.png';

const Header: React.FC = () => (
  <header className="flex items-center p-4 bg-gray-100">
    <img src={logo} alt="Logo" className="h-8 mr-2" />
    <h1 className="text-xl font-semibold">DB Code Generator</h1>
  </header>
);

export default Header;