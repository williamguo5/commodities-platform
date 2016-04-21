import './filedrop.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

export default class Filedrop extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = { message: 'Try dropping a CSV file here, or click to select a file to upload.' };
  };

  onDrop(files) {
    console.log('Received files: ', files);
    this.setState({message: 'Uploading file...'});

    Request.post('/shipping/upload')
      .attach('inputData', files[0])
      .end((err, res) => {
        // Calling the end function will send the request
        console.log('err: ', err);
        console.log('res: ', JSON.stringify(res.body));
        this.setState({message: 'Uploaded! Your data-key is: ' + res.body.dataKey});
        // alert(res.body.message + '\nYour data-key is: ' + res.body.dataKey);
        this.props.updateDataKey(res.body.dataKey);
      }
    );
  };

  render() {
    if (this.state.message) {
      var dropzoneMessage = this.state.message;
    }
    return (
      <Dropzone onDrop={this.onDrop} accept="text/csv" className="file-drop">
        <div>{dropzoneMessage}</div>
      </Dropzone>
    );
  }
}

