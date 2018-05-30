import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createHistory, MEMO_MODE } from "@gsmlg/history";

import {
  routerMiddleware,
  push,
  CALL_HISTORY_METHOD,
  LOCATION_CHANGE,
  routerReducer,
  RouteProvider,
  Switch,
  Route,
  Redirect,
  Link
} from '@gsmlg/react-redux-router';

window.Link = Link;
window.React = React;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>
          <Link to="/aaa">to AAA</Link>
          <Link to="/bbb">to BBB</Link>
          <Link to="/ccc">to CCC</Link>
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        ?
        <Switch>
          <Route path="/aaa" component={A} />
          <Route path="/bbb" component={B} />
          <Route path="/ccc" component={C} />
          <Redirect exact from="/*any" to="/aaa/:any" />
        </Switch>
      </div>
    );
  }
}

export default App;

const A = (props) => {
  return (
    <div >
      <h1>AAA</h1>
      <pre>
        {JSON.stringify(props)}
      </pre>
      <p>
        <Link to="/aaa" exact>to AA</Link>
        <Link to="/aaa/joker">to AB</Link>
        <Link to="/aaa/bat/users">to AC</Link>
      </p>
      <Switch>
        <Route path="/aaa" component={AA} exact />
        <Route path="/aaa/:name" component={AB} exact />
        <Route path="/aaa/:name/users" component={AC} exact />
      </Switch>
    </div>
  );
};

const B = (props) => {
  return (
    <div >
      <h1>BBB</h1>
      <pre>
        {JSON.stringify(props)}
      </pre>
    </div>
  );
};

const C = (props) => {
  return (
    <div >
      <h1>CCC</h1>
      <pre>
        {JSON.stringify(props)}
      </pre>
    </div>
  );
};


const AA = (props) => (
  <div>
    <h3>this is aa</h3>
    {JSON.stringify(props)}
  </div>
);

const AB = (props) => (
  <div>
    <h3>this is ab</h3>
    {JSON.stringify(props)}
  </div>
);

const AC = (props) => (
  <div>
    <h3>this is ac</h3>
    {JSON.stringify(props)}
  </div>
);
