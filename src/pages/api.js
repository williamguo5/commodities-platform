import React from 'react';
import Filedrop from '../components/Filedrop/Filedrop';

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
              <h2>GET</h2>
              <p>Info here on how to use the HTTP GET method on this api. Desribe the qurey parameters you can pass to the API and that you need a data-key that matches an uploaded data-set.</p>
              <pre>
                <code>
                  some code
                </code>
              </pre>
            </div>
            <div className="api-section">
              <h2>POST</h2>
              <p>Info here on how to use the HTTP POST method on this api. Give an example of a data-set file and how to upload it in javascript.</p>
              <pre>
                <code>
                  some code
                </code>
              </pre>
              <div>
                <Filedrop />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

