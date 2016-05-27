import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';
import Maps from '../components/Map/Map';

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
    this.changeMapState = this.changeMapState.bind(this);

    this.state = {
      dataKey: 'default',
      grains: [],
      ports: [],
      queries: [],
      files: [{label: 'testData.csv', value: 'default'}],
      initialDate: '',
      finalDate: '',
      map: false,
      newsData: [],
      graphData: [], // graphdata format: [{id: id, grain: grain, port: port, color: color, data: []}]
      colors: ['#0D8ECF', '#FCa202', '#A0CE09', '#9477CB', '#CD0D74', '#836953'],
      colorsUsed: [0, 0, 0, 0, 0, 0]
    };
  }

  // adds the filename and its datakey to the state
  addFiles(file) {
    let curr = this.state.files;
    curr.push(file);
    this.setState({
      files: curr
    });
  };

  // updates the working datakey to the one that corresponds with the selected file
  updateDataKey(key) {
    this.setState({
      dataKey: key
    });
  };

  // updates the list of grains to that of the selected file
  updateGrains(grains) {
    this.setState({
      grains: grains
    });
  };

  // updates the list of ports to that of the selected file
  updatePorts(ports) {
    this.setState({
      ports: ports
    });
  };

  // updates the date range to that of the selected file
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

  // add the query to the state
  addQuery(query) {
    this.state.colorsUsed[this.state.colors.indexOf(query.color)] = 1;
    let curr = this.state.queries;
    curr.push(query);
    this.setState({
      queries: curr
    });
  };

  // removes the given query from the state
  removeQuery(queryID){
    var index = undefined;
    for (let i = 0; i < this.state.queries.length; i++){
      if (this.state.queries[i].id == queryID){
        index = i;
        this.state.colorsUsed[this.state.colors.indexOf(this.state.queries[i].color)] = 0;
      }
    }
    let curr = this.state.queries;
    if (index > -1){
      curr.splice(index, 1);
    }
    this.setState({
      queries: curr
    });
    this.removeGraphData(queryID);
  };

  // removes all the queries and graphdata from the state
  resetQueries(){
    this.setState({
      queries: [],
      graphData: [],
      colorsUsed: [0, 0, 0, 0, 0, 0]
    });
  };

  // add the formatted dataset to the state
  addGraphData(data) {
    let curr = this.state.graphData;
    curr.push(data);
    this.setState({
      graphData: curr
    });
  };

  // remove a graph dataset from the state
  removeGraphData(id) {
    var index = undefined;
    for (let i = 0; i < this.state.graphData.length; i++){
      if (this.state.graphData[i].id == id){
        index = i;
      }
    }
    let curr = this.state.graphData;
    if (index !== undefined){
      curr.splice(index, 1);
    }
    this.setState({
      graphData: curr
    });
  };

  // get news data to display in newsfeed
  getNewsData(startDate, endDate) {
    const topics = ['COC', 'COF', 'COR', 'COT', 'GOL', 'GRA', 'LIV', 'MEAL', 'MIN', 'OILS', 'ORJ', 'RUB', 'SUG', 'TEA', 'USDA', 'WOO'];

    // uses a cached file of responses instead of their api.
    Request.get('/shipping/getNews')
      .end((err, res) => {
        // console.log('cache news: ', res.body);
        var newsData = res.body;
        newsData = newsData.reverse();
        this.setState({
          newsData: newsData
        });
      });

    // gets news data from news API
    // if (startDate !== '' && endDate !== '') {
    //   Request.post('http://pacificpygmyowl.herokuapp.com/api/query')
    //     .send({ start_date: startDate, end_date: endDate, tpc_list: topics })
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {
    //       if (err !== null || res === undefined || res.body === []) {
    //         console.log('The news api seems to be broken');
    //       } else {
    //         // console.log(res.body);
    //         var newsData = res.body;
    //         newsData = newsData.reverse();
    //         this.setState({
    //           newsData: newsData
    //         });
    //       }
    //     }
    //   );
    // }
  }

  // change whether the map is selected or not
  changeMapState() {
    if (this.state.map) {
      this.setState({
        map: false
      });
    } else {
      this.setState({
        map: true
      });
    }
  }

  render() {
    const styles = {
      main: {
        backgroundColor: 'rgba(31, 71, 147, 0.08)'
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
        <SideBar dataKey={this.state.dataKey} files={this.state.files} grains={this.state.grains} ports={this.state.ports} queries={this.state.queries} colors={this.state.colors} map={this.state.map} changeMapState={this.changeMapState} colorsUsed={this.state.colorsUsed} initialDate={this.state.initialDate} finalDate={this.state.finalDate} addFiles={this.addFiles} addQuery={this.addQuery} removeQuery={this.removeQuery} resetQueries={this.resetQueries} updateDataKey={this.updateDataKey} updateGrains={this.updateGrains} updatePorts={this.updatePorts} updateDateRange={this.updateDateRange} addGraphData={this.addGraphData}/>
        <div className="side-bar-page">
          <div ref="graphContainer" className="tight-container" style={styles.graphContainer}>
          {function(){
            if (!this.state.map) {
              return <Graph colors={this.state.colors} graphData={this.state.graphData} initialDate={this.state.initialDate} finalDate={this.state.finalDate}/>;
            } else {
              return <Maps/>;
            }
          }.call(this)}
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
