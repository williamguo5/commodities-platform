import React from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Queries from '../../components/queries/queries';

export default class QueryForm extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.selectGrain = this.selectGrain.bind(this);
    this.selectPort = this.selectPort.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
    this.populateList = this.populateList.bind(this);
    this.state = {grain: '',
      port: '',
      nextID: 0
    };
  }
  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();
  };
  componentWillUnmount() {
    $('.tooltipped').tooltip('remove');
  }

  // update state to the grain that is selected in the dropdown
  selectGrain(val){
    this.state.grain = val;
  };

  // update state to the port that is selected in the dropdown
  selectPort(val){
    this.state.port = val;
  };

  handleSubmit(event) {
    event.preventDefault();
    this.sendFormData();
  };

  sendFormData() {
    // Prepare form data for submitting it.
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // does not add a query if a grain, or port is not selected or if there are already 6 queries
    if (this.state.grain != '' && this.state.port != '' && this.props.queries.length < 6){
      var currGrain = this.state.grain;
      var currPort = this.state.port;
      var currID = this.state.nextID;
      var currColor = this.props.colors[3];

      // gets the next color in the rotation
      for (let i = 0; i < this.props.colorsUsed.length; i++){
        if (this.props.colorsUsed[i] == 0){
          currColor = this.props.colors[i];
          console.log('color: ', currColor);
          break;
        }
      }
      this.props.addQuery({
        grain: currGrain,
        port: currPort,
        id: currID,
        color: currColor
      });

      const monthIndex = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

      // console.log('date range: *', this.props.initialDate, this.props.finalDate);

      let initialDateParts = this.props.initialDate.split('-'),
          finalDateParts = this.props.finalDate.split('-');

      let dataKey = this.props.dataKey,
          sDate = new Date(initialDateParts[2], monthIndex.indexOf(initialDateParts[1]), initialDateParts[0]),
          eDate = new Date(finalDateParts[2], monthIndex.indexOf(finalDateParts[1]), finalDateParts[0]),
          port = this.state.port + '_Y1';

      let startDateString = sDate.getDate() + '-' +
                            monthNames[sDate.getMonth()] + '-' +
                            sDate.getFullYear();
      let endDateString = eDate.getDate() + '-' +
                          monthNames[eDate.getMonth()] + '-' +
                          eDate.getFullYear();

      // console.log('sendFormData: dataKey, sdata, edate, port, grain - ', dataKey, startDateString, endDateString, port, this.state.grain);

      // gets the data with the selected params, and formats null data
      Request.get('/shipping/getPrices')
        .query({ grain: this.state.grain})
        .query({ port: port})
        .query({ startDate: startDateString})
        .query({ endDate: endDateString})
        .query({ userID: dataKey})
        .end((err, res) => {
          var data = [];
          var prevPrice = null;
          var prevPercentageDifference = null;
          var prevValueDifference = null;
          for (var i = 0; i < res.body.dates.length; i++){
            // dates are formatted as DD-MMM-YYYY
            var dateParts = res.body.dates[i].split('-');
            var newDate = new Date(dateParts[2], monthIndex.indexOf(dateParts[1]), dateParts[0]);
            var price = res.body.prices[i];
            var percentDifference = res.body.percentDifference[i];
            var valueDifference = res.body.valueDifference[i];

            if (price == null) {
              if (prevPrice == null) {
                continue;
              } else {
                price = prevPrice;
              }
            }
            if (percentDifference == null) {
              percentDifference = '';
            }
            if (valueDifference == null) {
              valueDifference = '';
            }
            prevPrice = price;
            data.push({
              date: newDate,
              value: price,
              percentDifference: percentDifference,
              valueDifference: valueDifference
            });
          }
          this.props.addGraphData({
            id: currID,
            grain: currGrain,
            port: currPort,
            color: currColor,
            data: data
          });
        });
      this.state.nextID += 1;
    }
  };

  populateList(list){
    var options = [];
    if (list != undefined){
      for (var i = 0; i < list.length; i++){
        options.push(<option value={i+1}>{list[i]}</option>);
      }
      return options;
    }
  };

  render() {
    // console.log('form render: state', this.state);
    this.state.grain = '';
    this.state.port = '';
    var dataKeyClass = 'tooltipped';
    if (this.props.dataKey) {
      dataKeyClass = 'tooltipped active';
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col s6">
            <label>Select Grain</label>
            <Select name="grain" ref="grain" value="" options={this.props.grains} multi={false} placeholder="Grain" clearable={false} onChange={this.selectGrain} required/>
          </div>
          <div className="col s6">
            <label>Select Port</label>
            <Select name="port" ref="port" value="" options={this.props.ports} multi={false} placeholder="Port" clearable={false} onChange={this.selectPort} required/>
          </div>
        </div>
        <div className="tight-container">
          <button className="btn waves-effect waves-light full-width" type="submit" name="action">Add to graph</button>
          <label>Max: 6</label>
        </div>
      </form>
    );
  }
};
