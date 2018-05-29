import History, {
  PUSH_MODE,
  HASH_MODE,
  MEMO_MODE,
} from './history';

export {
  PUSH_MODE,
  HASH_MODE,
  MEMO_MODE,
};
export const createHistory = (argMode) => {
  let mode;
  if ([PUSH_MODE, HASH_MODE, MEMO_MODE].includes(argMode)) {
    mode = argMode;
  }
  const history = new History(mode ? { mode } : {});
  history.start();
  return {
    subscribe: (callback) => {
      history.on('locationChange', callback, null);
      return () => history.off(null, callback);
    },
    getLocation: () => history.location,
    push: (url) => {
      history.push(url);
    }
  };
};
