import React from 'react';
import Request from 'superagent';

export default class QueryForm extends React.Component {
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
  };

  sendFormData() {
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
        console.log(JSON.stringify(res.body));
        this.props.updateResults(res.body);
      }
    );
  };

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col s12 input-field">
            <input className="validate" type="text" name="dataKey" ref="dataKey" onChange={this.handleChange} value={this.props.dataKey} autoComplete="off" required/>
            <label htmlFor="dataKey">Data Key</label>
          </div>
          <div className="col s12 input-field">
            <input className="validate" type="text" name="grainType" ref="grainType" required/>
            <label htmlFor="grainType">Grain Type</label>
          </div>
          <div className="col s12 input-field">
            <label htmlFor="startDate">Start date</label>
            <input type="date" className="datepicker" name="startDate" ref="startDate" required/>
          </div>
          <div className="col s12 input-field">
            <label htmlFor="endDate">End date</label>
            <input type="date" className="datepicker" name="endDate" ref="endDate" required/>
          </div>
        </div>
        <div className="tight-container">
          <button className="btn waves-effect waves-light full-width" type="submit" name="action">Submit</button>
        </div>
      </form>
    );
  }
};