
export const CALL_HISTORY_METHOD = "@@react-redux-router/CALL_HISTORY_METHOD";

let dispatch;

const setDispatch = (dp) => dispatch = dp;

const push = (location) => {
  if (dispatch) {
    dispatch({
      type: CALL_HISTORY_METHOD,
      payload: { location }
    });
  } else {
    return {
      type: CALL_HISTORY_METHOD,
      payload: { location }
    };
  }
};

push.setDispatch = setDispatch;

export { push };

export default function routerMiddleware(history) {
  return () => {
    return (next) => action => {
      if (action.type !== CALL_HISTORY_METHOD) {
        return next(action);
      }
      const { payload: { location } } = action;
      history.push(location);
    };
  };
}
