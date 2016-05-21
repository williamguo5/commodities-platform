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
    // this.componentWillReveiveProps = this.componentWillReveiveProps.bind(this);
    this.render = this.render.bind(this);
    this.state = { news: [] };
  }

  componentWillMount() {
    Request.post(newsUrl)
      .send({ start_date: this.props.startDate, end_date: this.props.endDate, tpc_list: topics })
      .set('Accept', 'application/json')
      .end((err, res) => {
        this.setState({
          news: res.body
        });
        console.log(res.body);
      }
    );
  }

  componentDidMount() {
    $('.collapsible').collapsible({
      accordion: true
    });
  }

  // componentWillReveiveProps(nextProps) {
  //   Request.get(newsUrl)
  //     .send({ start_date: this.props.startDate, end_date: this.props.endDate, tpc_list: topics })
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       console.log(res.body);
  //       this.setState({
  //         news: res.body
  //       });
  //     }
  //   );
  // }

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
      </ul>
    );
  }
};