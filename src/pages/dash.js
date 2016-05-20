import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';

const colors = ['rgba(243,156,18,1)', 'rgba(46,204,113,1)', 'rgba(52,152,219,1)', 'rgba(155,99,192,1)', 'rgba(192,57,43,1)','rgba(52,73,94,1)','rgba(255,224,0,1)', 'rgba(22,160,133,1)'];

export default class Dash extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateDataKey = this.updateDataKey.bind(this);
    this.updateGrains = this.updateGrains.bind(this);
    this.updatePorts = this.updatePorts.bind(this);
    this.addQuery = this.addQuery.bind(this);
    this.removeQuery = this.removeQuery.bind(this);
    this.addGraphData = this.addGraphData.bind(this);
    this.generateChartData = this.generateChartData.bind(this);
    // graphdata format: [{id: id, grain: grain, port: port, data: []}]
    this.state = {dataKey: '', grains: [{label: 'g1', value: 'g1'}, {label: 'g2', value: 'g2'}], ports: [{label: 'p1', value: 'p1'}, {label: 'p2', value: 'p2'}], queries: [], graphData: []};
  }

  componentWillMount() {
    // this.generateChartData();
    // this.state.graphData.push([]);
  };

  generateChartData() {
    console.log('generate chart data');
    var data = [];
    data.push([]);
    data.push([]);
    data.push([]);
    data.push([]);
    var firstDate = new Date();
    firstDate.setDate( firstDate.getDate() - 500 );
    firstDate.setHours( 0, 0, 0, 0 );

    for ( var i = 0; i < 500; i++ ) {
      var newDate = new Date( firstDate );
      newDate.setDate( newDate.getDate() + i );

      var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
      var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;

      var a2 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
      var b2 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

      var a3 = Math.round( Math.random() * ( 100 + i ) ) + 200;
      var b3 = Math.round( Math.random() * ( 1000 + i ) ) + 600 + i * 2;

      var a4 = Math.round( Math.random() * ( 100 + i ) ) + 200 + i;
      var b4 = Math.round( Math.random() * ( 100 + i ) ) + 600 + i;

      data[0].push( {
        'date': newDate,
        'value': a1,
        'volume': b1
      } );
      data[1].push( {
        'date': newDate,
        'value': a2,
        'volume': b2
      } );
      data[2].push( {
        'date': newDate,
        'value': a3,
        'volume': b3
      } );
      data[3].push( {
        'date': newDate,
        'value': a4,
        'volume': b4
      } );
    }
    this.setState({
      graphData: data
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

  addQuery(query) {
    // console.log('addQuery - dash: ', query);
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
  };

  addGraphData(data) {
    // console.log('updateGraphData: ', data);
    let curr = this.state.graphData;
    curr.push(data);
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
        <SideBar dataKey={this.state.dataKey} grains={this.state.grains} ports={this.state.ports} queries={this.state.queries} addQuery={this.addQuery} removeQuery={this.removeQuery} updateDataKey={this.updateDataKey} updateGrains={this.updateGrains} updatePorts={this.updatePorts} addGraphData={this.addGraphData}/>
        <div className="side-bar-page">
          <div ref="graphContainer" className="tight-container" style={styles.graphContainer}>
            <Graph graphData={this.state.graphData}/>
          </div>
        </div>
      </main>
    );
  };
}