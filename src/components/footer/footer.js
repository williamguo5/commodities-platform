import './footer.scss';
import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="center-text">
    <span><Link to="/" className="white-text">Funded by a small million dollar loan.</Link></span>
  </footer>
);
export default Footer;

