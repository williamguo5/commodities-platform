import 'styles/main.scss';
import 'style!css!sass!react-select/scss/default.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import Home from 'pages/home';
import Api from 'pages/api';
import Analytics from 'pages/analytics';
import Dash from 'pages/dash';
import Layout from 'pages/layout';
import NotFound from 'pages/notFound';

ReactDOM.render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path="api" component={Api}/>
      <Route path="analytics" component={Analytics}/>
    </Route>
    <Route path="/dash" component={Dash}/>
    <Route path="*" component={NotFound} />
  </Router>
  ), document.getElementById('root')
);



