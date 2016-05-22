import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';
import NewsFeed from '../components/NewsFeed/NewsFeed';
import Request from 'superagent';

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
    this.getNewsData = this.getNewsData.bind(this);
    this.state = {
      dataKey: 'default',
      grains: [{label: 'g1', value: 'g1'}, {label: 'g2', value: 'g2'}],
      ports: [{label: 'p1', value: 'p1'}, {label: 'p2', value: 'p2'}],
      queries: [],
      files: [{label: 'testData.csv', value: 'default'}],
      initialDate: '',
      finalDate: '',
      newsData: [],
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
    const monthIndex = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        initialDateParts = initialDate.split('-'),
        finalDateParts = finalDate.split('-');

    let sDate = new Date(initialDateParts[2], monthIndex.indexOf(initialDateParts[1]), initialDateParts[0]),
        eDate = new Date(finalDateParts[2], monthIndex.indexOf(finalDateParts[1]), finalDateParts[0]);

    this.getNewsData(sDate.toGMTString(), eDate.toGMTString());

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
    if (index !== undefined){
      curr.splice(index, 1);
    }
    this.setState({
      graphData: curr
    });
  };

  getNewsData(startDate, endDate) {
    const topics = ['COC', 'COF', 'COR', 'COT', 'GOL', 'GRA', 'LIV', 'MEAL', 'MIN', 'OILS', 'ORJ', 'RUB', 'SUG', 'TEA', 'USDA', 'WOO'];

    if (startDate !== '' && endDate !== '') {
      Request.post('http://pacificpygmyowl.herokuapp.com/api/query')
        .send({ start_date: startDate, end_date: endDate, tpc_list: topics })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err !== null || res === undefined || res.body === []) {
            console.log('The news api seems to be broken');
          } else {
            console.log(res.body);
            this.setState({
              newsData: res.body
            });
          }
        }
      );
    }
  }

  render() {
    const styles = {
      main: {
        backgroundColor: 'rgba(0, 128, 128, 0.17)'
      },
      graphContainer: {
        width: '100%',
        height: '65%'
      },
      newsContainer: {
        height: '35%',
        width: '100%',
        paddingTop: '0'
      },
      newsWrapper: {
        height: '100%',
        overflowY: 'scroll',
        margin: '0'
      }
    };

    return (
      <main style={styles.main}>
        <SideBar dataKey={this.state.dataKey} files={this.state.files} grains={this.state.grains} ports={this.state.ports} queries={this.state.queries} initialDate={this.state.initialDate} finalDate={this.state.finalDate} addFiles={this.addFiles} addQuery={this.addQuery} removeQuery={this.removeQuery} resetQueries={this.resetQueries} updateDataKey={this.updateDataKey} updateGrains={this.updateGrains} updatePorts={this.updatePorts} updateDateRange={this.updateDateRange} addGraphData={this.addGraphData}/>
        <div className="side-bar-page">
          <div ref="graphContainer" className="tight-container" style={styles.graphContainer}>
            <Graph graphData={this.state.graphData}/>
          </div>
          <div style={styles.newsContainer} className="tight-container">
            <div className="card" style={styles.newsWrapper}>
              <NewsFeed newsData={this.state.newsData}/>
            </div>
          </div>
        </div>
      </main>
    );
  };
}