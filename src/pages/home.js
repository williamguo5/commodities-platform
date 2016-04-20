import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <main>
        <section id="sectionTitle" className="center-text bg-blue">
          <a href="https://www.youtube.com/watch?v=7goA_DnGIbU" target="_blank">
            <img src={require('../assets/images/trump.jpg')}/>
          </a>
          <h1>A small million dollar loan</h1>
        </section>
        <section>
          <div className="container">
            <h2>Software Releases</h2>
              <ul>
                <li><Link to="api">Commodities API</Link></li>
              </ul>
          </div>
        </section>
       <section>
        <div className="container">
          <h2>Team</h2>
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>zID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Peter Yu</td>
                <td>z5014944</td>
              </tr>
              <tr>
                <td>Albert Kerr</td>
                <td>z5017064</td>
              </tr>
              <tr>
                <td>William Guo</td>
                <td>z5015104</td>
              </tr>
              <tr>
                <td>Nethan Tran</td>
                <td>z5016586</td>
              </tr>
              <tr>
                <td>Sam Wemyss</td>
                <td>z5019350</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
    );
  }
};