import React from 'react';

export default class NewsBlock extends React.Component {
  render() {
    const styles = {
      backgroundColor: '#3f3f4f'
    };
    return(
      <li>
        <div className="collapsible-header" style={styles}>
          <span className="white-text text-darken-1">{this.props.headline}</span>
          <span className="right teal-text text-lighten-2">{this.props.date}</span>
        </div>
        <div className="collapsible-body">
          <p>{this.props.body}</p>
        </div>
      </li>
    );
  }
};

