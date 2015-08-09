require('babel/polyfill');

import React from 'react';
import * as Router from 'react-router';

import Login from './components/Login';
import Boxes from './components/Boxes';

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ul className="nav nav-tabs">
            <li><Link to="overview">Overview</Link></li>
            <li className="pull-right"><Link to="login">Login</Link></li>
          </ul>
        </div>
        <RouteHandler/>
      </div>
    );
  }
}

var routes = (
  <Route handler={App}>
    <DefaultRoute name="overview" handler={Boxes}/>
    <Route name="login" path="login" handler={Login}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

// React.render(<App/>, document.body);
