import React from 'react';
import Request from 'superagent';
import NewsBlock from '../NewsBlock/NewsBlock';

const topics = ['COC', 'COF', 'COR', 'COT', 'GOL', 'GRA', 'LIV', 'MEAL', 'MIN', 'OILS', 'ORJ', 'RUB', 'SUG', 'TEA', 'USDA', 'WOO'];
const newsUrl = 'http://pacificpygmyowl.herokuapp.com/api/query';

export default class Newsfeed extends React.Component {
  constructor() {
    super();
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReveiveProps = this.componentWillReveiveProps.bind(this);
    this.getNewsData = this.getNewsData.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      news: [],
      message: ''
    };
  }

  componentWillMount() {
    this.getNewsData(this.props.startDate, this.props.endDate);
  }

  componentDidMount() {
    $('.collapsible').collapsible({
      accordion: true
    });
  }

  componentWillReveiveProps(nextProps) {
    this.getNewsData(nextProps.startDate, nextProps.endDate);
  }

  getNewsData(startDate, endDate) {
    Request.post(newsUrl)
      .send({ start_date: startDate, end_date: endDate, tpc_list: topics })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || res === undefined) {
          this.setState({
            message: 'Oops... An error occurred while loading the news.'
          });
        } else {
          this.setState({
            news: res.body,
            message: ''
          });
        }
      }
    );
  }

  render() {
    let count=0;
    let newsBlocks = this.state.news.map(function(val) {
      count += 1;
      const key = 'news_' + count;
      return (
        <NewsBlock key={key} headline={val.headline} date={val.date} body={val.body} />
      );
    });
    return (
      <ul className="collapsible" data-collapsible="accordion">
        {newsBlocks}
        {this.state.message ? this.state.message : null}
      </ul>
    );
  }
};