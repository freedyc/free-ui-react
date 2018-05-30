import React from "react";
import renderer from "react-test-renderer";
import { Switch, Route, Redirect } from "../index";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createHistory, MEMO_MODE } from "@gsmlg/history";

import RouteProvider from "../route_provider";
import { LOCATION_CHANGE, routerReducer } from "../reducer";
import routerMiddleware, { push, CALL_HISTORY_METHOD } from "../middleware";

describe("A <RouteProvider />", () => {
  let store, history, reducerSpy;

  beforeEach(() => {
    reducerSpy = jest.fn();
    history = createHistory(MEMO_MODE);
    store = createStore(
      combineReducers({router: routerReducer, spy: (st, act) => { reducerSpy(act); return {}; }}),
      applyMiddleware(routerMiddleware(history))
    );
    push.setDispatch(store.dispatch);
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

  it("updates the store with store.dispatch", (done) => {
    const spy = jest.fn();
    renderer.create(
      <Provider store={store}>
        <RouteProvider history={history}>
          <div>Test</div>
        </RouteProvider>
      </Provider>
    );
    const pushAction = { type: CALL_HISTORY_METHOD, payload: { location: '/foo' } };
    history.subscribe(spy);

    (push("/foo"));

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      expect(store.getState()).toHaveProperty("router.location", "/foo");
      done();
    }, 1000);
  });

});
