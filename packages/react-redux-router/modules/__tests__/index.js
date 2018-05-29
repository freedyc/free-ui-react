import React from "react";
import renderer from "react-test-renderer";
import { Switch, Route, Redirect } from "../index";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createHistory, MEMO_MODE } from "@gsmlg/history";

import RouteProvider from "../route_provider";
import { LOCATION_CHANGE, routerReducer } from "../reducer";
import routerMiddleware, { push } from "../middleware";

describe("A <RouteProvider />", () => {
  let store, history;

  beforeEach(() => {
    store = createStore(
      combineReducers({router: routerReducer})
    );

    history = createHistory(MEMO_MODE);
  });

  it("connects to a store via Provider", () => {
    expect(store.getState()).toHaveProperty("router.location", null);

    renderer.create(
      <Provider store={store}>
        <RouteProvider history={history}>
          <div>Test</div>
        </RouteProvider>
      </Provider>
    );

    expect(store.getState()).toHaveProperty("router.location");
  });

  it("updates the store with location changes", (done) => {
    renderer.create(
      <Provider store={store}>
        <RouteProvider history={history}>
          <div>Test</div>
        </RouteProvider>
      </Provider>
    );

    history.push("/foo");

    setTimeout(() => {
      expect(store.getState()).toHaveProperty("router.location", "/foo");
      done();
    }, 1000);
  });

  it("redirects properly", (done) => {
    expect(store.getState()).toHaveProperty("router.location", null);

    const spy = jest.fn();

    renderer.create(
      <Provider store={store}>
        <RouteProvider history={history}>
          <Switch>
            <Route path="/test" children={(...args) => { spy(args); return null; }} />
            <Redirect to="/test" />
          </Switch>
        </RouteProvider>
      </Provider>
    );

    setTimeout(() => {
      expect(store.getState()).toHaveProperty("router.location", "/test");
      expect(spy).toHaveBeenCalled();
      done();
    }, 1000);
  });
});
