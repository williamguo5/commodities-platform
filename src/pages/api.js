import React from 'react';
import Filedrop from '../components/Filedrop/Filedrop';
import Codeblock from 'react-uikit-codeblock';

export default class Api extends React.Component {
  render() {
    return (
      <main>
        <section className="center-text bg-green">
          <h1>Commodities API</h1>
          <p>Version 0.0.1</p>
        </section>
        <section>
          <div className="container">
            <div className="api-section">
              <h2>shipping/getPrices</h2>
              <p>List of grain shipping prices at applicable ports</p>
              <h5>HTTP Method(s)</h5>
              <p>GET</p>
              <h5>Auth required</h5>
              <p>no</p>
              <h5>Parameters</h5>
              <ul>
                <li>Grain Type: 4 character code</li>
                <li>Start Date: DD-MMM-YY</li>
                <li>End Date: DD-MMM-YY</li>
              </ul>
              <h5>Sample JSON request & response</h5>
              <b>Request</b>
              <Codeblock>
              {`GET /shipping/getPrices?grain=AGP1&startDate=27-Jul-13&endDate=31-Dec-15 HTTP/1.1
Host: asmallmilliondollarloan.herokuapp.com`}
              </Codeblock>
              <b>Response</b>
              <Codeblock>
              {`HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "portY1": [],
    "portY2": [
      {
        "price": 5730,
        "name": "PRTL",
        "id": 40,
        "ownerPortY2": 6172
      }
    ],
    "date": "2014-03-04T13:00:00.000Z",
    "grain": "AGP1",
    "avgY1": 0,
    "avgY2": 0,
    "id": 6172,
    "averageY1": 0,
    "averageY2": 5730
  },
  ...
  {
    "portY1": [
      {
        "price": 3495,
        "name": "PRTL",
        "id": 44,
        "ownerPortY1": 6176
      }
    ],
    "portY2": [],
    "date": "2014-03-03T13:00:00.000Z",
    "grain": "AGP1",
    "avgY1": 0,
    "avgY2": 0,
    "id": 6176,
    "averageY1": 3495,
    "averageY2": 0
  }
]`}
              </Codeblock>
            </div>
            <div className="api-section">
              <h2>shipping/createRecords</h2>
              <p>Create shipping records</p>
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
              {`POST /shipping/createRecords HTTP/1.1
Host: asmallmilliondollarloan.herokuapp.com`}
              </Codeblock>
              <b>Response</b>
              <Codeblock>
              {`HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "File uploaded successfully!"
}`}
              </Codeblock>
              <p>You can upload the file below to get a <i>data-key</i>:</p>
              <div>
                <Filedrop />
              </div>
              <br/>
              <h5>Sample Requests</h5>
              <b>cURL</b>
              <Codeblock>
              {`curl -X POST -F "inputData=@test.csv" http://asmallmilliondollarloan.herokuapp.com/shipping/createRecords`}
              </Codeblock>
              <b>Javascript</b>
              <Codeblock>
              {`var request = require('superagent');
request.post('http://asmallmilliondollarloan.herokuapp.com/shipping/createRecords')
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

