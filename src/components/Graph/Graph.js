import React from 'react';
import {Line as LineChart} from 'react-chartjs';

// function chartData() {
//   return {
//     labels: ['January', 'February', 'March'],
//     datasets: [
//       {
//         label: 'Grain 1',
//         fillColor: 'rgba(220,220,220,0.2)',
//         strokeColor: 'rgba(220,220,220,1)',
//         pointColor: 'rgba(220,220,220,1)',
//         pointStrokeColor: '#fff',
//         pointHighlightFill: '#fff',
//         pointHighlightStroke: 'rgba(220,220,220,1)',
//         data: [65, 59, 80, 81, 56, 55, 40],
//       },
//       {
//         label: 'Grain 2',
//         fillColor: 'rgba(151,187,205,0.2)',
//         strokeColor: 'rgba(151,187,205,1)',
//         pointColor: 'rgba(151,187,205,1)',
//         pointStrokeColor: '#fff',
//         pointHighlightFill: '#fff',
//         pointHighlightStroke: 'rgba(151,187,205,1)',
//         data: [28, 48, 40, 19, 86, 27, 90],
//       },
//     ]
//   };
// };

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 1,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: false,
  legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
  responsive: true,
  maintainAspectRatio: false
};

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);

  };

  render() {
    const styles = {
      graphContainer: {
        padding: '20px',
        width: '100%',
        height: '100%',
        margin: '0'
      }
    };
    return (
      <div className="card" style={styles.graphContainer}>
        <LineChart data={this.props.data} options={options} redraw/>
      </div>
    );
  };
}

