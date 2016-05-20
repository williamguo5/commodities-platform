import './sidebar.scss';
import React from 'react';
import { Link } from 'react-router';
import QueryForm from '../../pages/dash/queryForm';
import FileButton from '../FileButton/FileButton';
import Queries from '../queries/queries';

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
          <FileButton updateDataKey={this.props.updateDataKey} updateGrains={this.props.updateGrains} updatePorts={this.props.updatePorts}/>
        </div>
        <QueryForm dataKey={this.props.dataKey} grains={this.props.grains} ports={this.props.ports} queries={this.props.queries} addQuery={this.props.addQuery} addGraphData={this.props.addGraphData}/>
        <Queries queries={this.props.queries} removeQuery={this.props.removeQuery}/>
      </div>
    );
  }
};