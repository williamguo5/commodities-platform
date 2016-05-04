import React from 'react';
import ReactDOM from 'react-dom';
import Filedrop from '../components/Filedrop/Filedrop';
import Request from 'superagent';
var Griddle = require('griddle-react');

var AnalyticsGetSection = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  handleChange: function(event) {
    this.props.updateDataKey(event.target.value);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ message: 'Sending...' }, this.sendFormData);
    this.props.scrollOnSubmit();
  },

  sendFormData: function () {
    // Prepare form data for submitting it.
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var dataKey = ReactDOM.findDOMNode(this.refs.dataKey).value,
        grainType = ReactDOM.findDOMNode(this.refs.grainType).value,
        sDate = new Date(ReactDOM.findDOMNode(this.refs.startDate).value),
        eDate = new Date(ReactDOM.findDOMNode(this.refs.endDate).value);

    var startDateString = sDate.getDate() + '-' +
                          monthNames[sDate.getMonth()] + '-' +
                          sDate.getFullYear();
    var endDateString = eDate.getDate() + '-' +
                        monthNames[eDate.getMonth()] + '-' +
                        eDate.getFullYear();

    Request.get('/shipping/getPrices')
      .query({ grain: grainType})
      .query({ startDate: startDateString})
      .query({ endDate: endDateString})
      .query({ userID: dataKey})
      .end((err, res) => {
        this.setState({ message: ''});
        console.log(JSON.stringify(res.body));
        this.props.updateResults(res.body);
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
            <input className="u-full-width" type="text" name="dataKey" ref="dataKey" onChange={this.handleChange} value={this.props.dataKey} autoComplete="off" required/>
          </div>
          <div className="six columns">
            <label htmlFor="grainType">Grain Type</label>
            <input className="u-full-width" type="text" name="grainType" ref="grainType" required/>
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="startDate">Start date</label>
            <input className="u-full-width" type="date" name="startDate" ref="startDate" required/>
          </div>
          <div className="six columns">
            <label htmlFor="endDate">End date</label>
            <input className="u-full-width" type="date" name="endDate" ref="endDate" required/>
          </div>
        </div>
        <input className="u-full-width button-primary" type="submit" value="Submit"/>
        {status}
      </form>
    );
  }
});

export default class Analytics extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.updateDataKey = this.updateDataKey.bind(this);
    this.scrollOnSubmit = this.scrollOnSubmit.bind(this);
    this.state = { resultsData: [], dataKey: '' };
  };

  updateResults(val) {
    console.log(val);
    this.setState({
      resultsData: val
    });
  };

  updateDataKey(key) {
    console.log(key);
    this.setState({
      dataKey: key
    });
  };

  scrollOnSubmit() {
    var resultsPanel = ReactDOM.findDOMNode(this.refs.resultSection);
    resultsPanel.scrollIntoView();
  };

  render() {
    if (this.state.resultsData) {
      var resultsTable = <Griddle results={this.state.resultsData} showFilter={true} showSettings={true}/>;
    }

    return (
      <main>
        <section className="center-text bg-red">
          <h1>Analytics Platform</h1>
          <p>Version 0.0.1</p>
        </section>
        <section className="api-section">
          <div className="container center-text">
            <div className="api-section">
              <h2>1. UPLOAD DATA</h2>
              <p>Before you can begin, you need to upload a data-set to use in your analysis.<br/>Have one already? Go straight to step 2 then and paste your key in!</p>
            </div>
            <Filedrop updateDataKey={this.updateDataKey}/>
          </div>
        </section>
        <section ref="querySection" className="api-section bg-grey">
          <div className="container">
            <div className="center-text api-section">
              <h2>2. QUERY</h2>
              <p>Now that your data is uploaded, you're ready to start using some basic analysis tools.</p>
            </div>
            <AnalyticsGetSection updateResults={this.updateResults} updateDataKey={this.updateDataKey} dataKey={this.state.dataKey} scrollOnSubmit={this.scrollOnSubmit}/>
          </div>
        </section>
        <section ref="resultSection" className="api-section">
          <div className="container">
            <div className="center-text api-section">
              <h2>3. RESULTS</h2>
              <p>You can see the data matching your query in the table below. Feel free to change the query to update the table, or filter out results under "settings".</p>
            </div>
            {resultsTable}
          </div>
        </section>
      </main>
    );
  }
}
