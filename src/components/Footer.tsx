import React from 'react';

const Footer: React.FC = () => (
  <footer className="p-4 bg-gray-100 text-center text-sm">
    © {new Date().getFullYear()} Your Company
  </footer>
);

export default Footer;