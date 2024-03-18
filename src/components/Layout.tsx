import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <>
      <Navbar title="Finance App" toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      <div className="app-container">
        <Sidebar isVisible={sidebarVisible} />
        <div className="content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
