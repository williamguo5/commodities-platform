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
                <li>Grain Type - 4 character code</li>
                <li>Start Date - DD/MMM/YYYY</li>
                <li>End Date - DD/MMM/YYYY</li>
              </ul>
              <h5>Sample JSON request & response</h5>
              <b>Request</b>
              <Codeblock>
              {`GET /shipping/getPrices?grain=AGP1&startDate=27-Jul-15&endDate=31-Dec-15 HTTP/1.1
Host: asmallmilliondollarloan.herokuapp.com`}
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
            <div className="api-section">
              <h2>shipping/createRecords</h2>
              <p>Create shipping records</p>
              <h5>HTTP Method(s)</h5>
              <p>POST</p>
              <h5>Auth required</h5>
              <p>no</p>
              <h5>Parameters</h5>
              <ul>
                <li>inputData - file to upload <span className="tag-orange">required</span></li>
              </ul>
              <h5>Sample JSON request & response</h5>
              <b>Request</b>
              <Codeblock>
              {`GET /shipping/getPrices?grain=AGP1&startDate=27-Jul-15&endDate=31-Dec-15 HTTP/1.1
Host: asmallmilliondollarloan.herokuapp.com`}
              </Codeblock>
              <b>Response</b>
              <Codeblock>
              {`HTTP/1.1 200 OK
Content-Type: application/json

{
  "data-key": "43feda98129cb7a7"
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

