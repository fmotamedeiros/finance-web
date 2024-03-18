import React from 'react';
import { Link } from 'react-router-dom';

// Prop `toggleSidebar` removida
interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => (
  <div className={`sidebar ${!isVisible ? 'hidden' : ''}`}>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/transactions">Transactions</Link></li>
    </ul>
  </div>
);

export default Sidebar;
