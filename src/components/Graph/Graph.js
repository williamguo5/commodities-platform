import React from 'react';
import {Line as LineChart} from 'react-chartjs';

export default class Graph extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    // this.generateChartData = this.generateChartData.bind(this);
    this.state = {chartData1: [], chartData2: [], chartData3: [], chartData4: []};
  };

  // componentDidMount() {
  render() {
    console.log('graph: data', this.props.graphData);
    console.log('graph: data', this.props.graphData[0]);
    var colors = [
      '#FF6600', '#B0DE09', '#0D8ECF', '#2A0CD0',
      '#CD0D74', '#CC0000', '#00CC00', '#0000CC', '#DDDDDD',
      '#999999', '#333333', '#990000'
    ];
    // this.generateChartData();

    var chart = AmCharts.makeChart( 'chartdiv', {
      'type': 'stock',
      'theme': 'light',
      'dataSets': [ {
        'title': 'first data set',
        'fieldMappings': [ {
          'fromField': 'value',
          'toField': 'value'
        }, {
          'fromField': 'volume',
          'toField': 'volume'
        } ],
        'dataProvider': this.props.graphData[0],
        compared: true,
        'categoryField': 'date'
      }, {
        'title': 'second data set',
        'fieldMappings': [ {
          'fromField': 'value',
          'toField': 'value'
        }, {
          'fromField': 'volume',
          'toField': 'volume'
        } ],
        'dataProvider': this.props.graphData[1],
        compared: true,
        'categoryField': 'date'
      }, {
        'title': 'third data set',
        'fieldMappings': [ {
          'fromField': 'value',
          'toField': 'value'
        }, {
          'fromField': 'volume',
          'toField': 'volume'
        } ],
        'dataProvider': this.props.graphData[2],
        compared: true,
        'categoryField': 'date'
      }, {
        'title': 'fourth data set',
        'fieldMappings': [ {
          'fromField': 'value',
          'toField': 'value'
        }, {
          'fromField': 'volume',
          'toField': 'volume'
        } ],
        'dataProvider': this.props.graphData[3],
        compared: true,
        'categoryField': 'date'
      }],

      'panels': [ {
        'showCategoryAxis': false,
        'title': 'Value',
        'percentHeight': 70,
        'stockGraphs': [ {
          'id': 'g1',
          'valueField': 'value',
          'comparable': true,
          'compareField': 'value'
          // 'balloonText': '[[title]]:<b>[[value]]</b>',
          // 'compareGraphBalloonText': '[[title]]:<b>[[value]]</b>'
        } ],
        'stockLegend': {
          // 'periodValueTextComparing': '[[percents.value.close]]%',
          // 'periodValueTextRegular': '[[value.close]]'
        }
      } ],

      'chartScrollbarSettings': {
        'graph': 'g1',
        graphFillAlpha: 0.1
      },

      'chartCursorSettings': {
        'valueBalloonsEnabled': true,
        'cursorAlpha': 0.5,
        'valueLineBalloonEnabled': true,
        'valueLineEnabled': true,
        'valueLineAlpha': 0.5
      },

      'periodSelector': {
        'position': 'bottom',
      },
      'export': {
        'enabled': true
      }
    } );

  // };
  // render() {

    // chart.validateData();
    const styles = {
      graphContainer: {
        padding: '20px',
        padding: '25px',
        width: '100%',
        height: '100%',
        height: '60%',
        margin: 0
      },
      chartdiv: {
        height: '100%',
        width: '100%'
      }
    };
    return (
      <div className='card' style={styles.graphContainer}>
        <div id='chartdiv'></div>
      </div>
    );
  };
}

