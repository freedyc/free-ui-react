/**
 * History class
 */

import Events from '@gsmlg/events';

const PUSH_MODE = 'popState';
const HASH_MODE = 'hashChange';
const MEMO_MODE = 'memory';

const rand = () => Math.random().toString(36).slice(2);

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

    this.on('popState', (...args) => this.pop(...args));
  }

  push(location, state) {
    const current = [{ ...state, key: rand()}, '', location];
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

  pop(location) {
  }

  start() {
    if (this.isStarted) return;
    const { location } = window;
    let lastLocation = location.href;
    switch(this.mode) {
      case PUSH_MODE: {
        window.onpopstate = (evt) => {
          this.trigger('popState', {
            prev: lastLocation,
            current: location.href,
          });
          lastLocation = location.href;
        };
        this.on('pushState', (location) => {
          this.trigger('popState', {
            prev: lastLocation,
            current: location,
          });
          lastLocation = location;
        });
        break;
      }
      case HASH_MODE: {
        window.onhashchange = (evt) => {
          this.trigger('popState', {
            prev: lastLocation,
            current: location.href,
          });
          lastLocation = location.href;
        };
        break;
      }
      case MEMO_MODE: {
        this.on('memoryPush', (location) => {
          setTimeout(() => {
            this.trigger('popState', {
              prev: lastLocation,
              current: location,
            });
            lastLocation = location;
          });
        });
        break;
      }
        // no default
    }
    this.isStarted = true;
  }

}
