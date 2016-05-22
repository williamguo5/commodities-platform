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
    var trendsToDisplay = [];
    var showInLegend = true;
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
        showInSelect: false,
        showInCompare: false,
        categoryField: 'date'
      });

      var ss = require('simple-statistics');

      var len = this.props.graphData[i].data.length;
      var arr = [];

      for (var j = 0; j < len; ++j) {
        arr.push([+this.props.graphData[i].data[j].date, parseInt(this.props.graphData[i].data[j].value,10)]);

      }

      var result = ss.linearRegressionLine(ss.linearRegression(arr));
      
      var boundaries = [];

      for (var j = 0; j < len; ++j) {
        boundaries.push({
          'date': +this.props.graphData[i].data[j].date, 
          'value': result(this.props.graphData[i].data[j].date)
        });
      }
      
      // boundaries.push(this.props.graphData[i].data[0]);
      // boundaries.push(this.props.graphData[i].data[this.props.graphData[i].data.length - 1]);
      trendsToDisplay.push({
        title: title,
        'color': 'red',
        fieldMappings: [ {
          fromField: 'value',
          toField: 'value'
        } ],
        dataProvider: boundaries,
        compared: false,
        showInSelect: false,
        showInCompare: true,
        categoryField: 'date'
      });
      // console.log(this.state.colors[this.state.colorIndex]);
      // console.log(this.state.colorIndex);

      this.state.colorIndex++;
      if (this.state.colorIndex >= this.state.colorIndex.length){
        this.state.colorIndex = 0;
      }
    }

    if (this.props.graphData.length == 0){
      console.log('No data to display');
      console.log('dates', this.props.initialDate, this.props.finalDate);
      const monthIndex = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      var dateParts = this.props.initialDate.split('-');
      var newSDate = new Date(dateParts[2], monthIndex.indexOf(dateParts[1]), dateParts[0]);
      dateParts = this.props.finalDate.split('-');
      var newEDate = new Date(dateParts[2], monthIndex.indexOf(dateParts[1]), dateParts[0]);

      dataToDisplay.push({
        'color': 'white',
        fieldMappings: [ {
          fromField: 'value',
          toField: 'value'
        } ],
        dataProvider: [{date: newSDate, value: ''}, {date: newEDate, value: ''}],
        compared: false,
        showInSelect: false,
        showInCompare: false,
        categoryField: 'date'
      });
      showInLegend = false;
    }
    Array.prototype.push.apply(dataToDisplay, trendsToDisplay);

    var chartProperties = {
      'type': 'stock',
      'theme': 'dark',
      'dataSets': dataToDisplay,
      'trendLines': [ {
        'initialValue': 270,
        'finalValue': 250,
      } ],
      'panels': [ {
        'recalculateToPercents': 'never',
        'showCategoryAxis': true,
        'title': 'Price',
        'percentHeight': 100,
        'stockGraphs': [ {
          'id': 'g1',
          'valueField': 'value',
          'comparable': true,
          'lineThickness': 2,
          'compareGraphLineThickness': 2,
          'balloonText': '[[title]]: <b>[[value]]</b>',
          'compareGraphBalloonText': '[[title]]:<b> [[value]]</b>',
          'compareField': 'value'
        } ],
        'stockLegend': {
          showEntries: showInLegend,
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
        'position': 'right',
        'width': 140,
        'periods': [ {
          'period': 'MM',
          'count': 1,
          'label': '1 Month'
        }, {
          'period': 'MAX',
          'label': 'MAX'
        }]
      },
      'dataSetSelector': {
        'compareText': 'Show trend line for:',
        'position': 'right',
        'width': 130
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
        backgroundColor: '#3f3f4f',
        padding: '20px',
        width: '100%',
        height: '100%',
        margin: '0'
      },
      chartdiv: {
        height: '100%',
        width: '100%'
      }
    };
    return (
      <div className='card' style={styles.graphContainer}>
        <div id='chartdiv' style={styles.chartdiv}></div>
      </div>
    );
  };
}

