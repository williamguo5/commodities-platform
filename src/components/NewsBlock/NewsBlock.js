import React from 'react';

export default class NewsBlock extends React.Component {
  render() {
    const tags = this.props.topics;
    const date = (new Date(this.props.date)).toString().split(' GMT')[0];

    let headerClass = 'collapsible-header waves-effect';
    headerClass += this.props.headline.includes('*TOP NEWS*') ? ' waves-teal' : ' waves-light';
    const colorMap = new Map([
      ['COC', '#FD9641'],
      ['COF', '#FB7364'],
      ['COR', '#FFD73B'],
      ['COT', '#D8E80B'],
      ['GOL', '#35DE3C'],
      ['GRA', '#60D4C0'],
      ['LIV', '#65E4EC'],
      ['MEAL', '#36CEFF'],
      ['MIN', '#54BEFF'],
      ['OILS', '#AF71F0'],
      ['ORJ', '#D389FF'],
      ['RUB', '#F062FF'],
      ['SUG', '#F966DE'],
      ['TEA', '#FB5DAB'],
      ['USDA', '#DE759F'],
      ['WOO', '#FB5C5C']
    ]);
    const styles = {
      header: {
        backgroundColor: this.props.headline.includes('*TOP NEWS*') ? '#58586E' : '#3f3f4f'
      }
    };
    return(
      <li>
        <div className={headerClass} style={styles.header}>
          <span className="white-text">{this.props.headline}</span>
          <div className="right">
            {tags.map((tag) => {
              const style = { backgroundColor: colorMap.get(tag) };
              return <div key={tag} className="chip news-tag" style={style}>{tag}</div>;
            })}
            <span className="teal-text text-lighten-3">{date}</span>
          </div>
        </div>
        <div className="collapsible-body">
          <p>{this.props.body}</p>
        </div>
      </li>
    );
  }
};

