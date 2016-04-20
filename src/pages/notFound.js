import React from 'react';
import Navbar from '../components/navbar/navbar';

export default class notFound extends React.Component {
  render() {
    return (
      <main>
        <Navbar/>
        <div className="container center-text">
            <br/>
            <br/>
            <br/>
            <h1>Oops... looks like a dead link!</h1>
            <p>You can help us fix this by giving us a small loan of a million dollars :)</p>
        </div>
      </main>
    );
  }
}