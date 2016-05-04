import React from 'react';
import SideBar from '../components/sidebar/sidebar';

export default class Dash extends React.Component {
  render() {
    return (
      <main>
        <div className="row">
          <div className="three columns side-bar-wrapper">
            <SideBar/>
          </div>
          <div className="nine columns">
            <h1>Title</h1>
          </div>
        </div>
      </main>
    );
  };
}