import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {

  const { logout } = useUser();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (<div className={`sidebar ${!isVisible ? 'hidden' : ''}`}>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/accounts">Accounts</Link></li>
      <li><Link to="/categories">Categories</Link></li>
      <li><Link to="/transactions">Transactions</Link></li>
      <li><a href="#" onClick={handleLogout}>Logout</a></li>
    </ul>
  </div>);
}

export default Sidebar;
