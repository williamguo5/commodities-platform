import './sidebar.scss';
import React from 'react';
import { Link } from 'react-router';
import QueryForm from '../../pages/dash/queryForm';

const SideBar = () => (
  <div className="side-nav fixed">
    <Link className="brand-logo waves-effect waves-orange" to="/">
      <img src={require('../../assets/images/logo.png')}/>
    </Link>
    <QueryForm/>
  </div>
);
export default SideBar;