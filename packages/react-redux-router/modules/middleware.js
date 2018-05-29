
export const CALL_HISTORY_METHOD = "@@react-redux-router/CALL_HISTORY_METHOD";

let dispatch;

export const push = (location) => dispatch({
    type: CALL_HISTORY_METHOD,
    payload: { location }
});

export default function routerMiddleware(history) {
  return ({ dispatch }) => {
    dispatch = dispatch;
    return (next) => action => {
      if (action.type !== CALL_HISTORY_METHOD) {
        return next(action);
      }

      const { payload: { location } } = action;
      history.push(location);
    };
  };
}
