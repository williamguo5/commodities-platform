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
    this.handleChange = this.handleChange.bind(this);
    this.selectGrain = this.selectGrain.bind(this);
    this.selectPort = this.selectPort.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
    this.populateList = this.populateList.bind(this);
    this.state = {grain: '', port: '', nextID: 0, colors: ['#0D8ECF', '#FCa202', '#a0ce09', '#c22200', '#CD0D74', '#2A0CD0'], colorIndex: 0};
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

  selectGrain(val){
    this.state.grain = val;
  };

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

    if (this.state.grain != '' && this.state.port != '' && this.props.queries.length < 6){
      var currGrain = this.state.grain;
      var currPort = this.state.port;
      var currID = this.state.nextID;
      var currColor = this.state.colors[this.state.colorIndex];
      this.state.colorIndex++;
      if (this.state.colorIndex >= this.state.colors.length){
        this.state.colorIndex = 0;
      }
      
      this.props.addQuery({grain: currGrain, port: currPort, id: currID, color: currColor});


      let dataKey = this.props.dataKey,
          sDate = new Date(2015,6,19),
          eDate = new Date(2015,10,1),
          port = this.state.port + '_Y1';

      let startDateString = sDate.getDate() + '-' +
                            monthNames[sDate.getMonth()] + '-' +
                            sDate.getFullYear();
      let endDateString = eDate.getDate() + '-' +
                          monthNames[eDate.getMonth()] + '-' +
                          eDate.getFullYear();

      console.log('sendFormData: dataKey, sdata, edate, port, grain - ', dataKey, startDateString, endDateString, port, this.state.grain);
      // let dateRange = {startDate: startDateString, endDate: endDateString};
      // this.props.updateDateRange(dateRange);
      // this.props.resetResults();
      // // let resultsData = [];


      Request.get('/shipping/getPrices')
        .query({ grain: this.state.grain})
        .query({ port: port})
        .query({ startDate: startDateString})
        .query({ endDate: endDateString})
        .query({ userID: dataKey})
        .end((err, res) => {
          // console.log('sendFormData: ', JSON.stringify(res.body));
          // format data for use with chart
          // res: {dates: [], prices: []}
          // chart data object [{date: dateObject, value: price}]
          var monthIndex = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
          var data = [];
          var prevPrice = 0;
          for (var i = 0; i < res.body.dates.length; i++){
            // dates are formatted as DD-MMM-YYYY
            var dateParts = res.body.dates[i].split('-');
            var month = monthIndex.indexOf('MAY');
            var newDate = new Date(dateParts[2], monthIndex.indexOf(dateParts[1]), dateParts[0]);
            var price = res.body.prices[i];

            // console.log('newdate: ', newDate);
            // console.log('price: ', price, i);
            if (price == null){
              if (i > 0){
                price = prevPrice;
              } else {
                price = '';
              }
            } else {
              prevPrice = price;
            }
            data.push({date: newDate, value: price});
          }
          this.props.addGraphData({id: currID, grain: currGrain, port: currPort, color: currColor, data: data});
          // console.log('sentFormData: ', JSON.stringify({id: currID, grain: currGrain, port: currPort, data: data}));
        });
      this.state.nextID += 1;
    }
  };

  populateList(list){
    // console.log('printing options: ', list);
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
        </div>
      </form>
    );
  }
};