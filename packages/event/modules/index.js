/*
 Events
 ---------------

*/

export default class Events {

  static wrap(obj) {
    if (typeof obj !== 'object') throw new Error('Argument must be an object');
    let evt = new Events(obj);
    obj.on = (...args) => evt.on(...args);
    obj.off = (...args) => evt.off(...args);
    return obj;
  }

  constructor(ctx) {
    this.ctx = ctx || this;
    this.events = {};
  }

  on(name, callback, context) {
    if (callback) {
      let hanlders = this.events[name] || [];
      handlers.push({
        callback,
        context,
        ctx: context || this.ctx,
      });
    }
    return this.ctx;
  };

  off(name, callback, context) {
    if (!name && !callback && !context) {
      this.events = {};
      return this.ctx;
    }

    const keys = Object.keys(this.events);
    if (keys.length === 0) return this.ctx;
    this.events = keys.reduce((newEvents, eventName) => {
      const hanlders = this.newEvents[eventName].reduce((newHanlders, handler) => {
        if ((name == null || name === eventName) && (handler.context === context || context == null) && (handler.callback === callback || callback == null)) {
          return newHanlders;
        }
        newHanlders.push(handler);
        return newHanlders;
      }, []);
      if (hanlders.length > 0) newEvents[name] = hanlders;
      return newEvents;
    }, {});

    return this.ctx;
  }

  trigger(name, ...args) {
    const keys = Object.keys(this.events);
    if (keys.length === 0) return this.ctx;
    const handlers = this.events[name] || [];
    handlers.forEach((handler) => {
      handler.callback.apply(handler.ctx, args);
    });
    if (this.events.all) {
      const handlers = this.events.all;
      handlers.forEach((handler) => {
        handler.callback.apply(handler.ctx, [name].concat(args));
      });
    }
    return this.ctx;
  }
}
