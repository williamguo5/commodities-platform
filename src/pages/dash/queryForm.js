import React from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';
import Select from 'react-select';

export default class QueryForm extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
    this.populateList = this.populateList.bind(this);
  }
  componentDidMount() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 10 // Creates a dropdown of 15 years to control year
    });
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();
  };
  componentWillUnmount() {
    $('.tooltipped').tooltip('remove');
  }

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

  populateList(list){
    console.log('printing options: ', list);
    var options = [];
    if (list != undefined){
      for (var i = 0; i < list.length; i++){
        options.push(<option value={i+1}>{list[i]}</option>);
      }
      return options;
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
        </div>
        <div className="row">
          <div className="col s6">
            <label>Select Grain</label>
            <Select name="form-field-name" value="" options={this.props.grains} multi={false} placeholder="Grain" clearable={false}/>
          </div>
          <div className="col s6">
            <label>Select Port</label>
            <Select name="form-field-name" value="" options={this.props.ports} multi={false} placeholder="Port" clearable={false}/>
          </div>
        </div>
        <div className="row">
        </div>
        <div className="tight-container">
          <button className="btn waves-effect waves-light full-width" type="submit" name="action">Add to graph</button>
        </div>
      </form>
    );
  }
};