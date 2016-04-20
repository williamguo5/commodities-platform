import './filedrop.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

export default class Filedrop extends React.Component {
  onDrop(files) {
    console.log('Received files: ', files);

    Request.post('/shipping/upload') // TODO change to controller that handles post request
      .attach('inputData', files[0])
      .end((err, res) => {
        // Calling the end function will send the request
        console.log('err: ', err);
        console.log('res: ', JSON.stringify(res.body));
        alert(res.body.message + '\nYour data-key is: ' + res.body.dataKey);
      }
    );
  };

  render() {
    return (
      <Dropzone onDrop={this.onDrop} accept="text/csv" className="file-drop">
        <div>{'Try dropping a CSV file here, or click to select a file to upload.'}</div>
      </Dropzone>
    );
  }
}

