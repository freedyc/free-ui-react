# React-Redux-Router

## RouteProvider
provide `router` context
``` javascript
      <Provider store={store}>
        <RouteProvider history={history}>
          <Switch>
            <Route path="/test" children={(...args) => { spy(args); return null; }} />
            <Redirect to="/test" />
          </Switch>
        </RouteProvider>
      </Provider>
```

## Switch
`Switch` only the first match child will be render
``` javascript
      <Provider store={store}>
        <RouteProvider history={history}>
          <Switch>
            <Route path="/test" children={(...args) => { spy(args); return null; }} />
            <Redirect to="/test" />
          </Switch>
        </RouteProvider>
      </Provider>

```

## Route
`path` if match path, then render `component` or `children`
``` javascript
      <Provider store={store}>
        <RouteProvider history={history}>
          <Switch>
            <Route path="/test" children={(...args) => { spy(args); return null; }} />
            <Redirect to="/test" />
          </Switch>
        </RouteProvider>
      </Provider>

```

## Redirect
* `from`: if match, redirct to `to`
* `to`: redirect to location 
``` javascript
      <Provider store={store}>
        <RouteProvider history={history}>
          <Switch>
            <Route path="/test" children={(...args) => { spy(args); return null; }} />
            <Redirect to="/test" />
          </Switch>
        </RouteProvider>
      </Provider>

```

## middleware

``` javascript
    history = createHistory(MEMO_MODE);
    store = createStore(
      combineReducers({router: routerReducer, spy: (st, act) => { reducerSpy(act); return {}; }}),
      applyMiddleware(routerMiddleware(history))
    );

```

## push

``` javascript
push.setDispatch(store.dispatch);
push('/users')
// or 
store.dispatch(push('/names'))
```

## Link

``` javascript
<Link to="/views" component={<Menu />} />
```

## routeReducer
route Reducer will produce location changes
**TODO** add `match` state in reducer
``` javascript
    history = createHistory(MEMO_MODE);
    store = createStore(
      combineReducers({router: routerReducer, spy: (st, act) => { reducerSpy(act); return {}; }}),
      applyMiddleware(routerMiddleware(history))
    );

```
