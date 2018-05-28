import History from './history';

export const createHistory = () => {
  const history = new History();
  return {
    subscribe: (callback) => {
      history.on('popState', callback, null);
      return () => history.off(null, callback);
    },
    push: (url) => {
      history.push(url);
    }
  };
};
