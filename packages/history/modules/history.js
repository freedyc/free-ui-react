/**
 * History class
 */

import Events from '@gsmlg/events';

export const PUSH_MODE = 'pushState';
export const HASH_MODE = 'hashChange';
export const MEMO_MODE = 'memory';

const rand = () => Math.random().toString(36).slice(2);

const pathReg = /^(?:(?:http(?:s)?):\/\/(?:[^/]+))?\/(.*)/i;

const getPath = (href) => {
  const [ url, path ] = pathReg.exec(href) || [];
  return '/' + decodeURI(path ? path : href).replace(/^[#\/]+/, '');
};

export default class History {
  constructor(options) {
    const { mode } = options || {};
    Events.wrap(this);
    this.isStarted = false;
    this.currentSate = {};
    this.histories = [];
    if ([HASH_MODE, PUSH_MODE, MEMO_MODE].includes(mode)) {
      this.mode = mode;
    } else if (window && window.location) {
      if ('pushState' in window.history) {
        this.mode = PUSH_MODE;
      } else if ('onhashchange' in window) {
        this.mode = HASH_MODE;
      } else {
        this.mode = MEMO_MODE;
      }
    } else {
      this.mode = MEMO_MODE;
    }

  }

  push(path) {
    console.log(path);
    const location = getPath(path);
    console.log(location);
    const current = [{key: rand()}, '', location];
    this.histories.push(current);
    switch(this.mode) {
      case PUSH_MODE: {
        const { history } = window;
        history.pushState.apply(history, current);
        this.trigger('pushState', location);
        break;
      }
      case HASH_MODE: {
        window.location.href = `#${location}`;
        break;
      }
      case MEMO_MODE: {
        this.trigger('memoryPush', location);
        break;
      }
        // no default
    }
  }

  start() {
    if (this.isStarted) return;
    const { location } = window;
    this.location = getPath(location.href);
    switch(this.mode) {
      case PUSH_MODE: {
        window.onpopstate = (evt) => {
          this.location = getPath(location.href);
          this.trigger('locationChange', getPath(location.href));
        };
        this.on('pushState', (location) => {
          this.location = location;
          this.trigger('locationChange', location);
        });
        break;
      }
      case HASH_MODE: {
        window.onhashchange = (evt) => {
          this.location = getPath(location.href);
          this.trigger('locationChange', getPath(location.href));
        };
        break;
      }
      case MEMO_MODE: {
        this.on('memoryPush', (location) => {
          setTimeout(() => {
            this.location = location;
            this.trigger('locationChange', location);
          });
        });
        break;
      }
        // no default
    }
    this.isStarted = true;
  }
}
