import React from 'react';

export default class Graph extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateDataSets = this.updateDataSets.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.state = {};
  };

  updateDataSets() {
    // console.log('generate chart', this.props.graphData.length);
    // console.log('generate chart', this.props.graphData);
    var dataToDisplay = [];
    for (var i = 0; i < this.props.graphData.length; i++){
      var title = this.props.graphData[i].grain + ', ' + this.props.graphData[i].port;
      var toCompare = true;
      if (i == 0){
        toCompare = false;
      }
      dataToDisplay.push({
        title: title,
        'color': this.props.graphData[i].color,
        fieldMappings: [ {
          fromField: 'value',
          toField: 'value'
        } ],
        dataProvider: this.props.graphData[i].data,
        compared: toCompare,
        categoryField: 'date'
      });

      var boundaries = [];
      boundaries.push(this.props.graphData[i].data[0]);
      boundaries.push(this.props.graphData[i].data[this.props.graphData[i].data.length - 1]);
      dataToDisplay.push({
        title: 'trendline',
        'color': 'red',
        fieldMappings: [ {
          fromField: 'value',
          toField: 'value'
        } ],
        dataProvider: boundaries,
        compared: true,
        categoryField: 'date'
      });
      // console.log(this.state.colors[this.state.colorIndex]);
      // console.log(this.state.colorIndex);

      this.state.colorIndex++;
      if (this.state.colorIndex >= this.state.colorIndex.length){
        this.state.colorIndex = 0;
      }
    }
    var chartProperties = {
      'type': 'stock',
      'theme': 'light',
      'dataSets': dataToDisplay,

      'panels': [ {
        'recalculateToPercents': 'never',
        'showCategoryAxis': true,
        'title': 'Price',
        'percentHeight': 100,
        'stockGraphs': [ {
          'id': 'g1',
          'valueField': 'value',
          'comparable': true,
          'balloonText': '[[title]]: <b>[[value]]</b>',
          'compareGraphBalloonText': '[[title]]:<b> [[value]]</b>',
          'compareField': 'value'
        } ],
        'stockLegend': {
          markerType: 'square',
          // 'periodValueTextComparing': '[[value.close]]',
          'periodValueTextRegular': '[[value.close]]'
        }
      } ],

      'valueAxes': [
          {
            title: 'Price'
          }
      ],

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
    };
    if (chartProperties.dataSets.length == 0){
      chartProperties.panels.push({
        allLabels: [{
          x: 0,
          y: '50%',
          text: 'The chart contains no data (Will change this to look better)',
          align: 'center',
          size: 16
        }]
      });
    }
    var chart = AmCharts.makeChart( 'chartdiv', chartProperties);
  };

  componentDidUpdate() {
    this.updateDataSets();
  };

  componentDidMount() {
    this.updateDataSets();
  };
  render() {

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

