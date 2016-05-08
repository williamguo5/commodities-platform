import './sidebar.scss';
import React from 'react';
import { Link } from 'react-router';
import QueryForm from '../../pages/dash/queryForm';
import FileButton from '../FileButton/FileButton';
import Request from 'superagent';

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
  };

  render() {
    return (
      <div className="side-nav fixed">
        <Link className="brand-logo waves-effect waves-orange" to="/">
          <img src={require('../../assets/images/logo.png')}/>
        </Link>
        <div className="tight-container">
          <FileButton updateDataKey={this.props.updateDataKey}/>
        </div>
        <QueryForm dataKey={this.props.dataKey} updateResults={this.props.updateResults} updateDateRange={this.props.updateDateRange} resetResults={this.props.resetResults}/>
      </div>
    );
  }
};