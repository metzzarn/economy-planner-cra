import { Link } from 'react-router-dom';
import React from 'react';

export const Menu = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>
        <Link to="/nothing-here">Nothing Here</Link>
      </li>
    </ul>
  </nav>
);
