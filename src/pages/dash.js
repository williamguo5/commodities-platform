import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';

const colors = ['rgba(243,156,18,1)', 'rgba(46,204,113,1)', 'rgba(52,152,219,1)', 'rgba(155,99,192,1)', 'rgba(192,57,43,1)','rgba(52,73,94,1)','rgba(255,224,0,1)', 'rgba(22,160,133,1)'];

export default class Dash extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateDataKey = this.updateDataKey.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.resetResults = this.resetResults.bind(this);
    this.updateDateRange = this.updateDateRange.bind(this);
    this.chartData = this.chartData.bind(this);
    this.makeGraphData = this.makeGraphData.bind(this);
    this.state = {dataKey: '', resultsData: [], dateRange: {}, graphData: []};
  }

  updateDataKey(key) {
    // console.log('updateDataKey: ' + key);
    this.setState({
      dataKey: key
    });
  };

  updateResults(data) {
    // console.log('updateResults: ' + data);
    let curr = this.state.resultsData;
    curr.push(data);
    this.setState({
      resultsData: curr
    });
    this.setState({
      graphData: this.makeGraphData(curr)
    });
  };

  resetResults() {
    this.setState({
      resultsData: []
    });
  }

  updateDateRange(data) {
    // console.log('updateDateRange: ' + data);
    this.setState({
      dateRange: data
    });
  };

  chartData(labels, graphData, largestSet, grainLabels) {
    let datasets = [];
    // TODO: create new arrays that are >= maxLength containing all the dates and value of the grain if it has one
    let count = 0;
    for (let j = 0; j < graphData.length; j++) {
      for (let k = 0; k < graphData[j].length; k++) {
        if (!(!!graphData[j][k])) {
          graphData[j][k] = null;
        }
      }
      for (let i = graphData[j].length; i < largestSet; i++) {
        graphData[j].push(null);
      }
      datasets.push({
        label: grainLabels[j],
        strokeColor: colors[count],
        pointColor: colors[count],
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: colors[count],
        data: graphData[j]
      });
      count++;
      if (count >= colors.length) {
        count = 0;
      }
    }
    return {
      labels: labels,
      datasets: datasets
    };
  };
  // TODO: Fix, this is currently a hack as ChartJS does not support different size arrays
  makeGraphData(data) {
    console.log('HERE: ' + data);
    let graphData = [];
    let grainLabels = [];
    for (let grain of data) {
      graphData.push(grain.map(function(a) {return a.average_Y1;}));
      if (grain[0] !== undefined) {
        grainLabels.push(grain[0].grain);
      }
    }
    // Get longest array
    let largestSet = 0;

    for (let singleGrainData of graphData) {
      if (largestSet < singleGrainData.length) {
        largestSet = singleGrainData.length;
      }
    }
    // let values = data.map(function(a) {return a.average_Y1;});
    let labels = [];
    if (this.state.dateRange) {
      labels.push(this.state.dateRange.startDate);
    }
    for (let i = 0; i < (largestSet - 2); i++) {
      labels.push('');
    }
    if (this.state.dateRange) {
      labels.push(this.state.dateRange.endDate);
    }
    return this.chartData(labels, graphData, largestSet, grainLabels);
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
        <SideBar dataKey={this.state.dataKey} updateDataKey={this.updateDataKey} updateResults={this.updateResults} updateDateRange={this.updateDateRange} resetResults={this.resetResults}/>
        <div className="side-bar-page">
          <div ref="graphContainer" className="tight-container" style={styles.graphContainer}>
            <Graph data={this.state.graphData}/>
          </div>
        </div>
      </main>
    );
  };
}