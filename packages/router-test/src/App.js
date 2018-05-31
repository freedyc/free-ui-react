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
          <h1 className="App-title">ZDDI</h1>
          <ul>
            <Link to="/cloud" component="li">Cloud</Link>
            &nbsp;&nbsp;
            <Link to="/dns" component="li">DNS</Link>
            &nbsp;&nbsp;
            <Link to="/dhcp" component="li">DHCP</Link>
            &nbsp;&nbsp;
            <Link to="/system" component="li">System</Link>
          </ul>
        </header>
        <aside>
          <Switch>
            <Route path="/cloud" component={() => {
                return (
                  <ul className="ul-v">
                    <li>Cloud</li>
                    <Link to="/cloud/map" component="li">地图</Link>
                    <Link to="/cloud/list" component="li">节点</Link>
                  </ul>
                );
            }} />
            <Route path="/dns" component={() => {
                return (
                  <ul className="ul-v">
                    <li>DNS</li>
                    <Link to="/dns/views" component="li">视图</Link>
                    <Link to="/dns/shared-zones" component="li">共享区</Link>
                    <Link to="/dns/acls" component="li">访问控制</Link>
                  </ul>
                );
            }} />
            <Route path="/dhcp" component={() => {
                return (
                  <ul className="ul-v">
                    <li>DHCP</li>
                  </ul>
                );
            }} />
            <Route path="/system" component={() => {
                return (
                  <ul className="ul-v">
                    <li>System</li>
                  </ul>
                );
            }} />
          </Switch>
        </aside>
        <main>
          <Switch>
            <Route path="/cloud" component={() => (
              <Switch>
                <Route path="/cloud/map" component={() => (
                  <h1>展示地图</h1>
                )} />
                <Route path="/cloud/list" component={() => (
                  <h1>展示列表</h1>
                )} />
                <Redirect to="/cloud/map" />
              </Switch>
            )} />
            <Route path="/dns" component={() => (
              <Switch>
                <Route path="/dns/views" component={() => (
                  <Switch>
                    <Route path="/dns/views" exact component={() => (
                      <div>
                        <h1>视图</h1>
                        <Link to="/dns/views/default/zones">default视图</Link>
                        &nbsp;&nbsp;
                        <Link to="/dns/views/telcom/zones">telcom视图</Link>
                        &nbsp;&nbsp;
                        <Link to="/dns/views/mobile/zones">mobile视图</Link>
                      </div>
                    )} />
                    <Route path="/dns/views/:vid/zones" exact component={(props) => (
                      <div>
                        <h1>{props.match.params.vid}视图</h1>
                        <h3>权威区</h3>
                        <Link to={`/dns/views/${props.match.params.vid}/zones/com/rrs`}>com区</Link>
                        &nbsp;&nbsp;
                        <Link to={`/dns/views/${props.match.params.vid}/zones/net/rrs`}>net区</Link>
                        &nbsp;&nbsp;
                        <Link to={`/dns/views/${props.match.params.vid}/zones/org/rrs`}>org区</Link>
                      </div>
                    )} />
                    <Route path="/dns/views/:vid/zones/:zid/rrs" exact component={(props) => (
                      <div>
                        <h1>{props.match.params.vid}视图</h1>
                        <h3>{props.match.params.zid}区</h3>
                        <h5>记录列表</h5>
                      </div>
                    )} />
                    <Redirect to="/dns/views" />
                  </Switch>
                )} />
                <Route path="/dns/shared-zones" component={() => (
                  <h1>共享区</h1>
                )} />
                <Route path="/dns/acls" component={() => (
                  <h1>访问控制列表</h1>
                )} />
                <Redirect to="/dns/views" />
              </Switch>
            )} />
            <Route path="/dhcp" component={() => (
              <Switch>
              </Switch>
            )} />
            <Route path="/system" component={() => (
              <Switch>
              </Switch>
            )} />
            <Redirect to="/cloud" />
          </Switch>
        </main>
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
