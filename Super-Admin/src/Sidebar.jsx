import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './main.css';

const Sidebar = () => {
  return (
    <div className="super-admin">
      <aside className="sidebar">
        <div className="logo">
          <img src="./logo.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" className="nav-link">
                <img src="./dash.png" alt="Dashboard Icon" className="nav-icon" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/restaurants" activeClassName="active" className="nav-link">
                <img src="./restro.png" alt="Restaurants Icon" className="nav-icon" />
                Restaurants
              </NavLink>
            </li>
            <li>
              <NavLink to="/staffs" activeClassName="active" className="nav-link">
                <img src="./staff.png" alt="Staffs Icon" className="nav-icon" />
                Staffs
              </NavLink>
            </li>
            <li>
              <NavLink to="/transactions" activeClassName="active" className="nav-link">
                <img src="./trans.png" alt="Transactions Icon" className="nav-icon" />
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" activeClassName="active" className="nav-link">
                <img src="./Setting.png" alt="Settings Icon" className="nav-icon" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;


