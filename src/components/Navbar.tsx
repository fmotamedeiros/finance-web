import React from 'react';

interface NavbarProps {
  title: string;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, toggleSidebar }) => (
  <div className="navbar">
    <button onClick={toggleSidebar} style={{ marginRight: '20px' }}>Toggle Menu</button>
    <h1>{title}</h1>
  </div>
);

export default Navbar;