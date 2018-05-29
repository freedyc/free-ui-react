import History from './history';

export const createHistory = () => {
  const history = new History();
  return {
    subscribe: (callback) => {
      history.on('locationChange', callback, null);
      return () => history.off(null, callback);
    },
    push: (url) => {
      history.push(url);
    }
  };
};
