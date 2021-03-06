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

  // updates and formats the datasets to the spec of AMcharts to be displayed
  updateDataSets() {
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
        },{
          fromField: 'percentDifference',
          toField: 'percentDifference'
        },{
          fromField: 'valueDifference',
          toField: 'valueDifference'
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
        if (this.props.graphData[i].data[j].value != '0' && 
            this.props.graphData[i].data[j].value != null) {
        // var tmp = parseFloat(this.props.graphData[i].data[j].value).toFixed(2);
          arr.push([+this.props.graphData[i].data[j].date, parseInt(this.props.graphData[i].data[j].value)]);

        }

      }

      var result = ss.linearRegressionLine(ss.linearRegression(arr));
      
      var boundaries = [];

      for (var j = 0; j < len; ++j) {
        boundaries.push({
          'date': +this.props.graphData[i].data[j].date, 
          'value': parseFloat(result(this.props.graphData[i].data[j].date)).toFixed(2)
        });
      }
      
      // boundaries.push(this.props.graphData[i].data[0]);
      // boundaries.push(this.props.graphData[i].data[this.props.graphData[i].data.length - 1]);
      const trendColors = ['#7ECEF7', '#FED180', '#e1fa90', '#C7B8E4', '#F77CBE', '#C8B6A8'];
      trendsToDisplay.push({
        title: title,
        'color': trendColors[this.props.colors.indexOf(this.props.graphData[i].color)],
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

      this.state.colorIndex++;
      if (this.state.colorIndex >= this.state.colorIndex.length){
        this.state.colorIndex = 0;
      }
    }

    // if there is no graph data, adds an empty data set for visual completeness
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
        },{
          fromField: 'percentDifference',
          toField: 'percentDifference'
        },{
          fromField: 'valueDifference',
          toField: 'valueDifference'
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
          'balloonText': '[[title]]: <b>[[value]]</b>  [[percentDifference]] [[valueDifference]]',
          'compareGraphBalloonText': '[[title]]:<b> [[value]]</b> [[percentDifference]] [[valueDifference]]',
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
        'toText': 'To:',
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

