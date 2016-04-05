import './footer.scss';
import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <footer className="center-text">
          <span><Link to="/" className="white-text">Funded by a small million dollar loan.</Link></span>
        </footer>
      </div>
    );
  }
}

