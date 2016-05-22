import React from 'react';
import NewsBlock from '../NewsBlock/NewsBlock';

export default class Newsfeed extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  render() {
    const topics = ['COC', 'COF', 'COR', 'COT', 'GOL', 'GRA', 'LIV', 'MEAL', 'MIN', 'OILS', 'ORJ', 'RUB', 'SUG', 'TEA', 'USDA', 'WOO'];
    let newsBlocks = [];
    let count = 0;
    if (this.props.newsData !== undefined && this.props.newsData.length !== 0) {
      newsBlocks = this.props.newsData.map((val) => {
        count += 1;
        const relevantTopics = val.tpc_list.filter(function(n) {
          return topics.indexOf(n) != -1;
        }).sort().splice(0,5);
        return (
          <NewsBlock key={count} headline={val.headline} date={val.date} body={val.body} topics={relevantTopics}/>
        );
      });
    }
    const styles = {
      newsList: {
        margin: 0
      }
    };

    return (
      <ul className="collapsible" data-collapsible="expandable" style={styles.newsList}>
        {Boolean(count) ? newsBlocks : null}
      </ul>
    );
  }
};