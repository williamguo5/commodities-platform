import './navbar.scss';
import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <div className="nav-fixed">
    <nav role="navigation">
      <div className="nav-wrapper container">
        <div className="left">
          <Link to="/">
            <img src={require('../../assets/images/logo.png')}/>
          </Link>
        </div>
        <div className="right">
          <ul>
            <li><Link activeClassName="active" to="analytics">Analytics</Link></li>
            <li><Link activeClassName="active" to="api">Api</Link></li>
            <li><Link activeClassName="active" to="dash">Dash</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);
export default Navbar;