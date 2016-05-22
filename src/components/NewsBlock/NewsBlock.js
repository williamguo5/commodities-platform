import React from 'react';

export default class NewsBlock extends React.Component {
  render() {
    const tags = this.props.topics;
    const date = (new Date(this.props.date)).toString().split(' GMT')[0];

    const styles = {
      header: {
        backgroundColor: this.props.headline.includes('*TOP NEWS*') ? 'rgba(227,161,101,0.15)' : 'rgba(255,255,255,0.1)'
      }
    };
    let headerClass = 'collapsible-header waves-effect';
    headerClass += this.props.headline.includes('*TOP NEWS*') ? ' waves-orange' : '';

    return(
      <li>
        <div className={headerClass} style={styles.header}>
          <span>{this.props.headline}</span>
          <div className="right">
            {tags.map((tag) => {
              return <div key={tag} className="chip news-tag blue lighten-4">{tag}</div>;
            })}
            <span className="teal-text text-lighten-1">{date}</span>
          </div>
        </div>
        <div className="collapsible-body">
          <p>{this.props.body}</p>
        </div>
      </li>
    );
  }
};

