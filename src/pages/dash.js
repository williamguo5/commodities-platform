import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';


export default class Dash extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateDataKey = this.updateDataKey.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.updateDateRange = this.updateDateRange.bind(this);
    this.chartData = this.chartData.bind(this);
    this.makeGraphData = this.makeGraphData.bind(this);
    this.state = {dataKey: '', resultsData: [], dateRange: {}};
  }

  updateDataKey(key) {
    // console.log('updateDataKey: ' + key);
    this.setState({
      dataKey: key
    });
  };

  updateResults(data) {
    // console.log('updateResults: ' + data);
    this.setState({
      resultsData: this.makeGraphData(data)
    });
  };

  updateDateRange(data) {
    // console.log('updateDateRange: ' + data);
    this.setState({
      dateRange: data
    });
  };

  chartData(labels, grain1Data) {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Grain 1',
          fillColor: 'rgba(243,156,18,0.2)',
          strokeColor: 'rgba(243,156,18,1)',
          pointColor: 'rgba(243,156,18,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(243,156,18,1)',
          data: grain1Data
        }
      ]
    };
  };

  makeGraphData(data) {
    let values = data.map(function(a) {return a.average_Y1;});
    let labels = [];
    if (this.state.dateRange) {
      labels.push(this.state.dateRange.startDate);
    }
    for (let i = 0; i < (values.length - 2); i++) {
      labels.push('');
    }
    if (this.state.dateRange) {
      labels.push(this.state.dateRange.endDate);
    }
    return this.chartData(labels, values);
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
        <SideBar dataKey={this.state.dataKey} updateDataKey={this.updateDataKey} updateResults={this.updateResults} updateDateRange={this.updateDateRange}/>
        <div className="side-bar-page">
          <div ref="graphContainer" className="tight-container" style={styles.graphContainer}>
            <Graph data={this.state.resultsData}/>
          </div>
        </div>
      </main>
    );
  };
}