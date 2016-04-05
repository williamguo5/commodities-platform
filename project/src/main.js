import 'styles/main';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import Home from 'pages/home';
import Api from 'pages/api';
import Footer from 'components/footer/footer';


ReactDOM.render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={Footer}>
      <IndexRoute component={Home}/>
      <Route path="api" component={Api}/>
    </Route>
  </Router>
  ), document.getElementById('root')
);



