
import React from 'react';
import { NavLink ,Outlet } from 'react-router-dom';
import './main.css';

const Sidebar = () => {

  return (
    <div className="super-admin">
      <aside className="sidebar">
        <div className="logo">
          <img src="./logo.png" alt="" />
        </div>
        <nav>
          <ul>
            <li><NavLink to="/" activeClassName="active" className="nav-link">Dashboard</NavLink></li>
            <li><NavLink to="/restaurants" activeClassName="active" className="nav-link">Restaurants</NavLink></li>
            <li><NavLink to="/staffs" activeClassName="active" className="nav-link">Staffs</NavLink></li>
            <li><NavLink to="/transactions" activeClassName="active" className="nav-link">Transactions</NavLink></li>
            <li><NavLink to="/settings" activeClassName="active" className="nav-link">Settings</NavLink></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
      <Outlet/>
      </main>
    </div>
  );
};

export default Sidebar;

