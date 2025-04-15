import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import Restro from './Restro.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Sidebar />}>
        <Route path="/" element={<Dashboard />}/>
         <Route path="/restaurants" element={<Restro />} />
       </Route>
    </Routes>
  </BrowserRouter>
);
