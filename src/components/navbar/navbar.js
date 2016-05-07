import './navbar.scss';
import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper container">
        <Link className="brand-logo left" to="/">
          <img src={require('../../assets/images/logo.png')}/>
        </Link>
        <ul className="right">
          <li>
            <Link activeClassName="active" className="waves-effect waves-light" to="analytics">Analytics</Link>
            </li>
          <li>
            <Link activeClassName="active" className="waves-effect waves-light" to="api">Api</Link>
          </li>
          <li>
            <Link activeClassName="active" className="waves-effect waves-light" to="dash">Dash</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
export default Navbar;