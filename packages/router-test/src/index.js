import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import { createHistory, MEMO_MODE, HASH_MODE } from "@gsmlg/history";

import {
    routerMiddleware,
    push,
    CALL_HISTORY_METHOD,
    LOCATION_CHANGE,
    routerReducer,
    RouteProvider,
    Switch,
    Route,
    Redirect
} from '@gsmlg/react-redux-router';

const composeEnhancers = typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const history = createHistory(HASH_MODE);
const store = createStore(
    combineReducers({router: routerReducer }),
    composeEnhancers(applyMiddleware(routerMiddleware(history)))
);


ReactDOM.render((
    <Provider store={store}>
        <RouteProvider history={history}>
            <App />
        </RouteProvider>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
