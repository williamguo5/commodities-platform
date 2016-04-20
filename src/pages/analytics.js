import React from 'react';
import ReactDOM from 'react-dom';
import Filedrop from '../components/Filedrop/Filedrop';
import Request from 'superagent';

var AnalyticsGetSection = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    // Scroll to the top of the page to show the status message.
    this.setState({ message: 'Sending...' }, this.sendFormData);
    alert('OFF');
  },
  sendFormData: function () {
    // Prepare form data for submitting it.
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    var dataKey = ReactDOM.findDOMNode(this.refs.dataKey).value,
        grainType = ReactDOM.findDOMNode(this.refs.grainType).value,
        sDate = new Date(ReactDOM.findDOMNode(this.refs.startDate).value),
        eDate = new Date(ReactDOM.findDOMNode(this.refs.endDate).value);

    console.log(sDate);
    var startDateString = sDate.getDate() + '-' +
                          monthNames[sDate.getMonth()] + '-' +
                          sDate.getFullYear();
    var endDateString = eDate.getDate() + '-' +
                        monthNames[eDate.getMonth()] + '-' +
                        eDate.getFullYear();

    Request.get('/shipping/getPrices')
      .query({ userID: dataKey})
      .query({ grain: grainType})
      .query({ startDate: startDateString})
      .query({ endDate: endDateString})
      .end((err, res) => {
        // Calling the end function will send the request
        console.log('err: ', err);
        console.log('res: ', JSON.stringify(res.body));
        alert('FUCK');
      }
    );

  },
  render: function() {
    if (this.state.message) {
      var status = <div id="status" ref="status">
                     {this.state.message}
                   </div>;
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="six columns">
            <label htmlFor="dataKey">Data Key</label>
            <input className="u-full-width" type="text" name="dataKey" ref="dataKey"/>
          </div>
          <div className="six columns">
            <label htmlFor="grainType">Grain Type</label>
            <input className="u-full-width" type="text" name="grainType" ref="grainType"/>
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="startDate">Stard date</label>
            <input className="u-full-width" type="date" name="startDate" ref="startDate"/>
          </div>
          <div className="six columns">
            <label htmlFor="endDate">End date</label>
            <input className="u-full-width" type="date" name="endDate" ref="endDate"/>
          </div>
        </div>
        <input className="u-full-width button-primary" type="submit" value="Submit"/>
        {status}
      </form>
    );
  }
});

export default class Analytics extends React.Component {
  render() {
    return (
      <main>
        <section className="center-text bg-red">
          <h1>Analytics Platform</h1>
        </section>
        <section className="api-section">
          <div className="container center-text">
            <div className="api-section">
              <h2>1. UPLOAD DATA</h2>
              <p>Before you can begin, you need to upload a data-set to use in your analysis.<br/>Have one already? Go straight to step 2 then!</p>
            </div>
            <Filedrop />
          </div>
        </section>
        <section className="api-section bg-grey">
          <div className="container">
            <div className="center-text api-section">
              <h2>2. QUERY</h2>
              <p>Now that your data is uploaded, you're ready to start using our analysis tools.</p>
            </div>
            <AnalyticsGetSection/>
          </div>
        </section>
      </main>
    );
  }
}
