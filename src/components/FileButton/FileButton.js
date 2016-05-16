import './filebutton.scss';
import React from 'react';
import Request from 'superagent';

export default class FileButton extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.state = { message: '' };
  };

  // componentDidMount() {
  //   $('.tooltipped').tooltip({delay: 50});
  // };

  handleSubmit(event) {
    event.preventDefault();
    console.log('This isnt useless');
    this.setState({ message: 'Uploading...' }, this.handleFile);
  };

  handleFile(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileType = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
    if (fileType === 'csv') {
      Request.post('/shipping/upload')
        .attach('inputData', file)
        .end((err, res) => {
          // Calling the end function will send the request
          console.log('err: ', err);
          console.log('res: ', JSON.stringify(res.body));

          this.setState({message: 'Uploaded!'});
          if (this.props.updateDataKey) {
            this.props.updateDataKey(res.body.dataKey);
          }
          Request.get('/shipping')
          .query({ userID: res.body.dataKey})
          .end((err, res) => {
            // console.log(JSON.stringify(res.body));
            if (this.props.updateGrains){
              this.props.updateGrains(res.body[0].grains);
            }
            if (this.props.updatePorts){
              this.props.updatePorts(res.body[0].ports);
            }
            // resultsData.push(res.body);
          });
        });      
    } else {
      alert('Wrong file type! The file must be in csv format');
      // TODO: Remove the incorrect file using event.target.xxxx
      // console.log(event.target);
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="file-field input-field">
          <div className="btn tooltipped" data-position="left" data-tooltip="Upload a CSV file containing the grain data">
            <span>File</span>
            <input type="file" accept="text/csv" onChange={this.handleFile}/>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
          </div>
        </div>
      </form>
    );
  }
}