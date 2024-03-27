import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Transactions from './views/Transactions';
import Login from './views/Login';
import Signup from './views/Signup';
import './styles/main.css';
import Accounts from './views/Accounts';
import Categories from './views/Categories';
import { useUser } from './context/UserContext';

const App: React.FC = () => {

  const { isUserLoggedIn } = useUser();
  
  const PrivateRoute = () => {
    return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/accounts" element={<Layout><Accounts /></Layout>} />
          <Route path="/categories" element={<Layout><Categories /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
