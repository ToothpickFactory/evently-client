import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <div className="navbar">
        <ul>
            <li><Link to="/">Create Event</Link></li>
            <li><Link to="/e">Events</Link></li>
            <li><Link to="/api">API</Link></li>
        </ul>
      </div>
    );
};

export default NavBar;