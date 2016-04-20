import React from 'react';
import Filedrop from '../components/Filedrop/Filedrop';
import Codeblock from 'react-uikit-codeblock';

export default class Api extends React.Component {
  render() {
    return (
      <main>
        <section className="center-text bg-green">
          <h1>Commodities API</h1>
          <p>Version 0.0.2</p>
        </section>
        <section>
          <div className="container">
            <div className="api-section">
              <h2>Change Log</h2>
              <table className="u-full-width">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Changes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>v0.0.2</td>
                  <td>Users now receive a dataKey when they upload their file.</td>
                </tr>
                <tr>
                  <td>v0.0.1</td>
                  <td>In this version of the api we have implemented only the core features. A single user can upload a data-file and query against that set of data once it has successfully uploaded. In future versions multiple users will be able to use the API at the same time.</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="divider"></div>
            <div className="api-section">
              <h2>shipping/getPrices</h2>
              <p>List of grain shipping prices at applicable ports</p>
              <h5>HTTP Method(s)</h5>
              <p>GET</p>
              <h5>Auth required</h5>
              <p>no</p>
              <h5>Parameters</h5>
              <ul>
                <li>Grain Type: 2-4 character code</li>
                <li>Start Date: DD-MMM-YYYY</li>
                <li>End Date: DD-MMM-YYYY</li>
              </ul>
              <h5>Sample JSON request & response</h5>
              <b>Request</b>
              <Codeblock>
              {`GET /shipping/getPrices?grain=AGP1&startDate=27-Jul-2015&endDate=31-Dec-2015&userID=datakey HTTP/1.1
Host: asmallmilliondollarloan.herokuapp.com`}
              </Codeblock>
              <b>cURL</b>
              <Codeblock>
              {`curl "http://asmallmilliondollarloan.herokuapp.com/shipping/getPrices?grain=AGP1&startDate=27-Jul-2015&endDate=31-Dec-2015&userID=datakey"`}
              </Codeblock>
              <b>Response</b>
              <Codeblock>
              {`HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "grain_type": "AGP1",
    "date": "9-7-2015",
    "price_port1_Y1": "393",
    "price_port1_Y2": "231",
    "price_port2_Y1": "393",
    "price_port2_Y2": "231",
    ...
    "average_Y1": "289.75",
    "average_Y1": "275"
  },
  ...
  {
    "grain_type": "AGP1",
    "date": "1-7-2015",
    "price_port1_Y1": "393",
    "price_port1_Y2": "231",
    "price_port2_Y1": "393",
    "price_port2_Y2": "231",
    ...
    "average_Y1": "289.75",
    "average_Y1": "275"
  }
]`}
              </Codeblock>
            </div>
            <div className="divider"></div>
            <div className="api-section">
              <h2>shipping/upload</h2>
              <p>Upload csv File</p>
              <h5>HTTP Method(s)</h5>
              <p>POST</p>
              <h5>Auth required</h5>
              <p>no</p>
              <h5>Parameters</h5>
              <ul>
                <li>inputData: CSV file to upload <span className="tag-orange">required</span></li>
              </ul>
              <h5>Sample JSON request & response</h5>
              <b>Request</b>
              <Codeblock>
              {`POST /shipping/upload HTTP/1.1
Host: asmallmilliondollarloan.herokuapp.com`}
              </Codeblock>
              <b>Response</b>
              <Codeblock>
              {`HTTP/1.1 200 OK
Content-Type: application/json

{
  "dataKey":"1a24c2433d9d9580fe1a2c4c1f3a03f2",
  "message":"File uploaded successfully"
}`
}
              </Codeblock>
              <p>You can upload the file below to get a <i>data-key</i>:</p>
              <div>
                <Filedrop />
              </div>
              <br/>
              <h5>Sample Requests</h5>
              <p>As a demonstration of how to use this method of our api we have provided some example code to get you started.</p>
              <b>cURL</b>
              <Codeblock>
              {`curl -X POST -F "inputData=@test.csv" http://asmallmilliondollarloan.herokuapp.com/shipping/upload`}
              </Codeblock>
              <b>Javascript</b>
              <Codeblock>
              {`var request = require('superagent');
request.post('http://asmallmilliondollarloan.herokuapp.com/shipping/upload')
  .attach('inputData', file)
  .end(function(err, res){
    // Calling the end function will send the request
  }
);`}
              </Codeblock>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

