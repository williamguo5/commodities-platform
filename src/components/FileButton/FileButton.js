import './filebutton.scss';
import React from 'react';
import Request from 'superagent';
import Select from 'react-select';

export default class FileButton extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.formatOptions = this.formatOptions.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.state = { message: '', selectedName: 'testData.csv'};
  };

  selectFile(val) {
    // update datakey on dash state
    // change selected box display
    // console.log('select file: ', this.props.files);
    for (var i = 0; i < this.props.files.length; i++){
      if (this.props.files[i].value == val){
        this.state.selectedName = this.props.files[i].label;
        break;
      }
    }
    this.props.updateDataKey(val);
    Request.get('http://localhost:3000/shipping')
      // Request.get('/shipping')
      .query({ userID: val})
      .end((err, res) => {

        // console.log(JSON.stringify(res.body));
        if (this.props.updateGrains){
          this.props.updateGrains(this.formatOptions(res.body.grains));
        }
        if (this.props.updatePorts){
          this.props.updatePorts(this.formatOptions(res.body.ports));
        }
        if (this.props.updateDateRange){
          this.props.updateDateRange(res.body.initialDate, res.body.finalDate);
        }
        this.props.resetQueries();
        // resultsData.push(res.body);
      });
  };

  componentDidMount() {
    console.log('Loads data from default file');
    const defaultDataKey = 'default';
    this.props.updateDataKey(defaultDataKey);
    // Request.get('http://localhost:3000/shipping')
    Request.get('/shipping')
      .query({ userID: defaultDataKey})
      .end((err, res) => {
        console.log(JSON.stringify(res.body));
        if (this.props.updateGrains){
          // console.log(res.body);
          this.props.updateGrains(this.formatOptions(res.body.grains));
        }
        if (this.props.updatePorts){
          this.props.updatePorts(this.formatOptions(res.body.ports));
        }
        if (this.props.updateDateRange){
          this.props.updateDateRange(res.body.initialDate, res.body.finalDate);
        }
        // resultsData.push(res.body);
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log('This isnt useless');
    this.setState({ message: 'Uploading...' }, this.handleFile);
  };

  handleFile(event) {
    console.log('handle file');
    // testing
    // var temp = [{label: 'a', value: 'b'}, {label: 'abc', value: 'abc'}];
    // var temp2 = ['1st', 'second', 'a', 'b', 'd', 'e', , 'dsf', 'f', 'df'];
    // this.props.updateDataKey('testDatakey');
    // this.props.updateGrains(temp);
    // this.props.updatePorts(this.formatOptions(temp2));
    // end testing data

    const file = event.target.files[0];
    // console.log('file: ', file);
    const fileName = file.name;
    const fileType = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
    if (fileType === 'csv') {
      // Request.post('http://localhost:3000/shipping/upload')
      Request.post('/shipping/upload')
        .attach('inputData', file)
        .end((err, res) => {
          // Calling the end function will send the request
          // console.log('err: ', err);
          // console.log('res: ', JSON.stringify(res.body));

          this.setState({message: 'Uploaded!'});

          if (this.props.updateDataKey) {
            this.props.updateDataKey(res.body.dataKey);
          }
          // update fileName datakey list
          var newFile = {
            label: fileName,
            value: res.body.dataKey
          };
          this.state.selectedName = fileName;
          this.props.addFiles(newFile);


          // Request.get('http://localhost:3000/shipping')
          Request.get('/shipping')
          .query({ userID: res.body.dataKey})
          .end((err, res) => {
            console.log('handleFile2');
            // console.log(JSON.stringify(res.body));
            if (this.props.updateGrains){
              this.props.updateGrains(this.formatOptions(res.body.grains));
            }
            if (this.props.updatePorts){
              this.props.updatePorts(this.formatOptions(res.body.ports));
            }
            if (this.props.updateDateRange){
              this.props.updateDateRange(res.body.initialDate, res.body.finalDate);
            }
            this.props.resetQueries();
            // resultsData.push(res.body);
          });
        });      
    } else {
      alert('Wrong file type! The file must be in csv format');
      // TODO: Remove the incorrect file using event.target.xxxx
      // console.log(event.target);
    }
  };

  formatOptions(list){
    // console.log(list);
    var formattedList = [];
    for (var i = 0; i < list.length; i++){
      formattedList.push({label: list[i], value: list[i]});
    }
    return formattedList;
  };

  render() {
    // console.log('render: ', this.props.files);
    return(
      <form onSubmit={this.handleSubmit} >
        <label className="tight-container">Select or upload a new file:</label>
        <div className="row">
          <div className="input-field col s9">
            <Select name="fileSelect" ref="fileSelect" value={this.state.selectedName} options={this.props.files} multi={false} placeholder="Select file..." clearable={false} onChange={this.selectFile} required/>
          </div>
          <div className="btn file-field input-field tooltipped col s2" data-tooltip="Upload a CSV file containing the grain data">
              <span>+</span>
              <input type="file" accept="text/csv" onChange={this.handleFile}/>
          </div>
        </div>
      </form>
    );
  }
}
