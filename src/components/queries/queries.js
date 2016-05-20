import React from 'react';
import ReactDOM from 'react-dom';

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
    this.makeTags = this.makeTags.bind(this);
    this.render = this.render.bind(this);
  };

  handleRemove(event){
    this.props.removeQuery(event.target.id);
  };

  makeTags(queries){
    // console.log('makeTags: queries', queries);
    // console.log('makeTags: queries.length', queries.length);
    var html = [];
    if (queries != undefined){
      for (var i = 0; i < queries.length; i++){
        html.push(<div className="col s6"><div className="chip">{queries[i].grain}, {queries[i].port}<i className="material-icons" id={queries[i].id} key={queries[i].id} onClick={this.handleRemove}>close</i></div></div>);
      }
    }
    // console.log('makeTags: html', html);
    return html;
  };

  render() {
    return (
      <div className="row">
        {this.makeTags(this.props.queries)}
      </div>
    );
  }
};
