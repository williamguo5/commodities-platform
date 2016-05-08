import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';


export default class Dash extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateDataKey = this.updateDataKey.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.chartData = this.chartData.bind(this);
    this.makeGraphData = this.makeGraphData.bind(this);
    this.state = {dataKey: '', resultsData: []};
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

  chartData(labels, grain1Data) {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Grain 1',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: grain1Data
        }
      ]
    };
  };

  makeGraphData(data) {
    let values = data.map(function(a) {return a.average_Y1;});
    let labels = [];
    labels.push('start');
    for(let i = 0; i < (values.length - 2); i++){
      labels.push('');
    }
    labels.push('end');
    return this.chartData(labels, values);
  };

  render() {
    return (
      <main>
        <SideBar dataKey={this.state.dataKey} updateDataKey={this.updateDataKey} updateResults={this.updateResults}/>
        <div className="side-bar-page">
          <div className="tight-container">
            <Graph data={this.state.resultsData}/>
          </div>
        </div>
      </main>
    );
  };
}