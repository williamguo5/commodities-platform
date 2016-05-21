import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';

const colors = ['rgba(243,156,18,1)', 'rgba(46,204,113,1)', 'rgba(52,152,219,1)', 'rgba(155,99,192,1)', 'rgba(192,57,43,1)','rgba(52,73,94,1)','rgba(255,224,0,1)', 'rgba(22,160,133,1)'];

export default class Dash extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.updateDataKey = this.updateDataKey.bind(this);
    this.updateGrains = this.updateGrains.bind(this);
    this.updatePorts = this.updatePorts.bind(this);
    this.updateDateRange = this.updateDateRange.bind(this);
    this.addQuery = this.addQuery.bind(this);
    this.removeQuery = this.removeQuery.bind(this);
    this.resetQueries = this.resetQueries.bind(this);
    this.addGraphData = this.addGraphData.bind(this);
    this.removeGraphData = this.removeGraphData.bind(this);
    
    this.state = {
      dataKey: 'default',
      grains: [{label: 'g1', value: 'g1'}, {label: 'g2', value: 'g2'}],
      ports: [{label: 'p1', value: 'p1'}, {label: 'p2', value: 'p2'}],
      queries: [],
      files: [{label: 'testData.csv', value: 'default'}],
      initialDate: '',
      finalDate: '',
      graphData: [] // graphdata format: [{id: id, grain: grain, port: port, color: color, data: []}]
    };
  }

  addFiles(file) {
    // console.log('addFiles: ' + file);
    let curr = this.state.files;
    curr.push(file);
    this.setState({
      files: curr
    });
  };

  updateDataKey(key) {
    // console.log('updateDataKey: ' + key);
    this.setState({
      dataKey: key
    });
  };

  updateGrains(grains) {
    // console.log('updateGrains: ' + grains);
    this.setState({
      grains: grains
    });
  };

  updatePorts(ports) {
    // console.log('updatePorts: ' + ports);
    this.setState({
      ports: ports
    });
  };

  updateDateRange(initialDate, finalDate) {
    this.setState({
      initialDate: initialDate,
      finalDate: finalDate
    });
  };


  addQuery(query) {
    console.log('addQuery - dash: ', query);
    // this.generateChartData();
    let curr = this.state.queries;
    curr.push(query);
    this.setState({
      queries: curr
    });
  };

  removeQuery(queryID){
    // console.log('removeQuery - dash: ', queryID);
    var index = undefined;
    for (let i = 0; i < this.state.queries.length; i++){
      if (this.state.queries[i].id == queryID){
        index = i;
      }
    }
    // console.log('removeQuery index: ', index);
    let curr = this.state.queries;
    if (index > -1){
      curr.splice(index, 1);
    }
    this.setState({
      queries: curr
    });
    this.removeGraphData(queryID);
  };

  resetQueries(){
    // console.log('resetQueries');
    this.setState({
      queries: [],
      graphData: []
    });
  };

  addGraphData(data) {
    // console.log('updateGraphData: ', data);
    let curr = this.state.graphData;
    curr.push(data);
    this.setState({
      graphData: curr
    });
  };

  removeGraphData(id) {
    var index = undefined;
    for (let i = 0; i < this.state.graphData.length; i++){
      if (this.state.graphData[i].id == id){
        index = i;
      }
    }
    // console.log('removeGraphData index: ', index);
    let curr = this.state.graphData;
    if (index > -1){
      curr.splice(index, 1);
    }
    this.setState({
      graphData: curr
    });
  };

  render() {
    const styles = {
      graphContainer: {
        padding: '15px',
        width: '100%',
        height: '100%'
      }
    };
    return (
      <main>
        <SideBar dataKey={this.state.dataKey} files={this.state.files} grains={this.state.grains} ports={this.state.ports} queries={this.state.queries} initialDate={this.state.initialDate} finalDate={this.state.finalDate} addFiles={this.addFiles} addQuery={this.addQuery} removeQuery={this.removeQuery} resetQueries={this.resetQueries} updateDataKey={this.updateDataKey} updateGrains={this.updateGrains} updatePorts={this.updatePorts} updateDateRange={this.updateDateRange} addGraphData={this.addGraphData}/>
        <div className="side-bar-page">
          <div ref="graphContainer" className="tight-container" style={styles.graphContainer}>
            <Graph graphData={this.state.graphData}/>
          </div>
        </div>
      </main>
    );
  };
}