import React from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';

export default class QueryForm extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
  }
  componentDidMount() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 10 // Creates a dropdown of 15 years to control year
    });
  };

  handleChange(event) {
    this.props.updateDataKey(event.target.value);
  };

  handleSubmit(event) {
    event.preventDefault();
    this.sendFormData();
  };

  sendFormData() {
    // Prepare form data for submitting it.
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let dataKey = ReactDOM.findDOMNode(this.refs.dataKey).value,
        grainTypes = ReactDOM.findDOMNode(this.refs.grainTypes).value,
        sDate = new Date(ReactDOM.findDOMNode(this.refs.startDate).value),
        eDate = new Date(ReactDOM.findDOMNode(this.refs.endDate).value);

    let startDateString = sDate.getDate() + '-' +
                          monthNames[sDate.getMonth()] + '-' +
                          sDate.getFullYear();
    let endDateString = eDate.getDate() + '-' +
                        monthNames[eDate.getMonth()] + '-' +
                        eDate.getFullYear();

    let grains = grainTypes.replace(/^\s+|\s+$/g,'').split(/\s*,\s*/);
    let dateRange = {startDate: startDateString, endDate: endDateString};
    this.props.updateDateRange(dateRange);
    this.props.resetResults();
    // let resultsData = [];
    for (let i = 0; i < grains.length; i++) {
      Request.get('/shipping/getPrices')
        .query({ grain: grains[i]})
        .query({ startDate: startDateString})
        .query({ endDate: endDateString})
        .query({ userID: dataKey})
        .end((err, res) => {
          // console.log(JSON.stringify(res.body));
          this.props.updateResults(res.body);
          // resultsData.push(res.body);
        }
      );
    }
  };

  render() {
    var dataKeyClass = 'tooltipped';
    if (this.props.dataKey) {
      dataKeyClass = 'tooltipped active';
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col s12 input-field">
            <label className={dataKeyClass} data-position="left" data-tooltip="The unique data-key of the file you upload(ed)" htmlFor="dataKey">Data Key</label>
            <input className="validate" type="text" name="dataKey" ref="dataKey" onChange={this.handleChange} value={this.props.dataKey} autoComplete="off" required/>
          </div>
          <div className="col s12 input-field">
            <label htmlFor="grainTypes" className="tooltipped" data-position="left" data-tooltip="Types of the grain you want to analyse seperate by commas. e.g. AGP1 or AGP1, AUH2">Grain Types</label>
            <input className="validate" type="text" name="grainTypes" ref="grainTypes" required/>
          </div>
          <div className="col s6 input-field">
            <label htmlFor="startDate" className="tooltipped" data-position="left" data-tooltip="Starting date of the range you want to analyse">Start date</label>
            <input type="date" className="datepicker" name="startDate" ref="startDate" required/>
          </div>
          <div className="col s6 input-field">
            <label htmlFor="endDate" className="tooltipped" data-position="left" data-tooltip="Ending date of the range you want to analyse">End date</label>
            <input type="date" className="datepicker" name="endDate" ref="endDate" required/>
          </div>
        </div>
        <div className="tight-container">
          <button className="btn waves-effect waves-light full-width" type="submit" name="action">OK</button>
        </div>
      </form>
    );
  }
};