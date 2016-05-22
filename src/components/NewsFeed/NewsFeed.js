import React from 'react';
import NewsBlock from '../NewsBlock/NewsBlock';

export default class Newsfeed extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReveiveProps = this.componentWillReveiveProps.bind(this);
    this.render = this.render.bind(this);
  }


  componentDidMount() {
    $('.collapsible').collapsible({
      accordion: true
    });
  }

  componentWillReveiveProps(nextProps) {
    console.log('new props here!');
  }

  render() {
    let newsBlocks = [];
    let count = 0;
    if (this.props.newsData !== undefined && this.props.newsData.length !== 0) {
      newsBlocks = this.props.newsData.map((val) => {
        count += 1;
        return (
          <NewsBlock key={count} headline={val.headline} date={val.date} body={val.body} />
        );
      });
    }
    const styles = {
      newsList: {
        margin: 0
      }
    };

    return (
      <ul className="collapsible" data-collapsible="accordion" style={styles.newsList}>
        {Boolean(count) ? newsBlocks : null}
      </ul>
    );
  }
};