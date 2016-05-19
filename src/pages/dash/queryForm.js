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
    this.state = {grain: '', port: '', dataKey: '', nextID: 0};
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

    if (this.state.grain != '' && this.state.port != ''){
      this.props.addQuery({grain: this.state.grain, port: this.state.port, id: this.state.nextID});
      this.state.nextID += 1;
    }

    // let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // let dataKey = ReactDOM.findDOMNode(this.refs.dataKey).value,
    //     grainTypes = this.state.grain,
    //     sDate = new Date(1,0,2015),
    //     eDate = new Date(1,0,2017);

    // let startDateString = sDate.getDate() + '-' +
    //                       monthNames[sDate.getMonth()] + '-' +
    //                       sDate.getFullYear();
    // let endDateString = eDate.getDate() + '-' +
    //                     monthNames[eDate.getMonth()] + '-' +
    //                     eDate.getFullYear();

    // let grains = grainTypes.replace(/^\s+|\s+$/g,'').split(/\s*,\s*/);
    // let dateRange = {startDate: startDateString, endDate: endDateString};
    // this.props.updateDateRange(dateRange);
    // this.props.resetResults();
    // // let resultsData = [];
    // for (let i = 0; i < grains.length; i++) {
    //   Request.get('/shipping/getPrices')
    //     .query({ grain: grains[i]})
    //     .query({ startDate: startDateString})
    //     .query({ endDate: endDateString})
    //     .query({ userID: dataKey})
    //     .end((err, res) => {
    //       // console.log(JSON.stringify(res.body));
    //       this.props.updateResults(res.body);
    //       // resultsData.push(res.body);
    //     }
    //   );
    // }
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