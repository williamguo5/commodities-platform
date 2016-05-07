import React from 'react';
import SideBar from '../components/sidebar/sidebar';
import Graph from '../components/Graph/Graph';

export default class Dash extends React.Component {
  render() {
    return (
      <main>
        <SideBar/>
        <div className="side-bar-page">
          <div className="tight-container">
            <h1>Title</h1>
            <Graph/>
          </div>
        </div>
      </main>
    );
  };
}