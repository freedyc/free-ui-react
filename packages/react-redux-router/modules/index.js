import Link from './link';
import Switch from './switch';
import Redirect from './redirect';
import Route from './route';
import RouteProvider from './route_provider';
import { routerReducer, LOCATION_CHANGE } from './reducer';
import routerMiddleware, { push, setDispatch, CALL_HISTORY_METHOD } from './middleware';

export {
  Link,
  Switch,
  Redirect,
  Route,
  RouteProvider,
  routerReducer,
  routerMiddleware,
  push,
  LOCATION_CHANGE,
  CALL_HISTORY_METHOD
}
