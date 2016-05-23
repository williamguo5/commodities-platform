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
    this.handleClick = this.handleClick.bind(this);
    this.state = {name: 'View Map'};
  };

  handleClick() {
    console.log('handle click');
    this.props.changeMapState();
    if (this.state.name == 'View Map'){
      this.state.name = 'View Graph';
    } else {
      this.state.name = 'View Map';
    }
  };

  render() {
    const styles = {
      sidebar: {
        backgroundColor: '#efefef'
      },
      mapButton: {
        position: 'absolute',
        bottom: '10%',
        width: '90%',
      }
    };
    return (
      <div className="side-nav fixed" style={styles.sidebar}>
        <Link className="brand-logo waves-effect waves-orange" to="/">
          <img src={require('../../assets/images/logo.png')}/>
        </Link>
        <FileButton files={this.props.files} addFiles={this.props.addFiles} updateDataKey={this.props.updateDataKey} updateGrains={this.props.updateGrains} updatePorts={this.props.updatePorts} updateDateRange={this.props.updateDateRange} resetQueries={this.props.resetQueries}/>
        <QueryForm dataKey={this.props.dataKey} grains={this.props.grains} ports={this.props.ports} queries={this.props.queries} colors={this.props.colors} colorsUsed={this.props.colorsUsed} initialDate={this.props.initialDate} finalDate={this.props.finalDate} addQuery={this.props.addQuery} addGraphData={this.props.addGraphData}/>
        <Queries queries={this.props.queries} removeQuery={this.props.removeQuery}/>
        <div className="tight-container">
          <button className="white-text waves-effect waves-light btn col s12" onClick={this.handleClick} style={styles.mapButton}>{this.state.name}</button>
        </div>
      </div>
    );
  }
};