import React from 'react';

export default class NewsBlock extends React.Component {
  render() {
    return(
      <li>
        <div className="collapsible-header">
          <span className="orange-text text-darken-1">{this.props.headline}</span>
          <span className="right teal-text text-lighten-2">{this.props.date}</span>
        </div>
        <div className="collapsible-body">
          <p>{this.props.body}</p>
        </div>
      </li>
    );
  }
};

