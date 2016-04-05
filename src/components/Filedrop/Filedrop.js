import './filedrop.scss';
import React from 'react';
import Dropzone from 'react-dropzone';

export default class Filedrop extends React.Component {
  onDrop(files) {
    console.log('Received files: ', files);
  };

  render() {
    return (
      <Dropzone onDrop={this.onDrop} accept="application/json" className="file-drop">
        <div>Try dropping a JSON file here, or click to select a file to upload.</div>
      </Dropzone>
    );
  }
}

