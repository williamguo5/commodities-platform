import React from 'react';

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
    let tagHTML = [];
    if (queries != undefined) {
      for (let i = 0; i < queries.length; i++) {
        let style = {
          backgroundColor: queries[i].color,
          color: 'white'
        };
        tagHTML.push(<div className="chip queries" style={style}>{queries[i].grain}, {queries[i].port}<i className="material-icons" id={queries[i].id} key={queries[i].id} onClick={this.handleRemove}>close</i></div>);
      }
    }
    return tagHTML;
  };

  render() {
    return (
      <div className="tight-container">
        {this.makeTags(this.props.queries)}
      </div>
    );
  }
};
