import React from 'react';

export default class Maps extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateDataSets = this.updateDataSets.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.state = {};
  }

  updateDataSets() {
    var latLong = {};
    latLong['ALBN'] = {'latitude': 35.2, 'longitude': 117.54};
    latLong['BRSB'] = {'latitude': 27.23, 'longitude': 153.10};
    latLong['ESPR'] = {'latitude': 33.52, 'longitude': 121.53};
    latLong['GEEL'] = {'latitude': 38.11, 'longitude': 144.37};
    latLong['GERL'] = {'latitude': 28.47, 'longitude': 114.36};
    latLong['GLAD'] = {'latitude': 23.50, 'longitude': 151.35};
    latLong['KWIN'] = {'latitude': 32.20, 'longitude': 115.72};
    latLong['MELB'] = {'latitude': 37.84, 'longitude': 144.94};
    latLong['MACK'] = {'latitude': 21.10, 'longitude': 149.94};
    latLong['NEWC'] = {'latitude': 32.55, 'longitude': 151.47};
    latLong['POAD'] = {'latitude': 34.85, 'longitude': 138.51};
    latLong['POGI'] = {'latitude': 35.02, 'longitude': 137.46};
    latLong['POKE'] = {'latitude': 34.28, 'longitude': 150.54};
    latLong['POLI'] = {'latitude': 34.44, 'longitude': 135.56};
    latLong['PRTL'] = {'latitude': 12.36, 'longitude': 143.25};
    latLong['THEV'] = {'latitude': 32.07, 'longitude': 133.38};
    latLong['WALL'] = {'latitude': 33.56, 'longitude': 137.39};

    var mapData = [];

    var dataToDisplay = [];

    var map = AmCharts.makeChart( 'chartdiv', {
      'type': 'map',
      'theme': 'light',
      // 'colorSteps': 10,
      'dataProvider': {
        'map': 'australiaLow',
        'getAreasFromMap': true,
        'zoomLevel': 0.9,
        'areas': []
      },
      'areasSettings': {
        'autoZoom': true,
        'balloonText': '[[title]]: <strong>[[value]]</strong>'
      },
      'zoomControl': {
        'minZoomLevel': 0.9
      },
    });

  };

  componentDidUpdate() {
    this.updateDataSets();
  };

  componentDidMount() {
    this.updateDataSets();
  };
  render() {
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
