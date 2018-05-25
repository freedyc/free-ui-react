import Events from '../index.js';

describe('Events test', () => {
  let eventTarget = null;
  let evt = null;
  let evt1 = null;
  let evt2 = null;
  let spy = null;
  let spy1 = null;

  beforeEach(() => {
    eventTarget = {};
    Events.wrap(eventTarget);
    evt = Math.random().toString(36).slice(2);
    evt1 = Math.random().toString(36).slice(2);
    evt2 = Math.random().toString(36).slice(2);
    spy = jest.fn();
    spy1 = jest.fn();
  });

  it("should have on, off, trigger", () => {
    expect(typeof eventTarget.on).toEqual('function');
    expect(typeof eventTarget.off).toEqual('function');
    expect(typeof eventTarget.trigger).toEqual('function');
  });

  it("should on and trigger event", () => {
    eventTarget.on(evt, spy);

    eventTarget.trigger(evt);
    expect(spy).toHaveBeenCalled();
  });

  it("should on and trigger event 2 times", () => {
    eventTarget.on(evt, spy);
    eventTarget.on(evt1, spy);
    eventTarget.on(evt2, spy);

    eventTarget.trigger(evt);
    eventTarget.trigger(evt);
    eventTarget.trigger(evt1);
    eventTarget.trigger(evt1);
    eventTarget.trigger(evt2);
    eventTarget.trigger(evt2);

    expect(spy).toHaveBeenCalledTimes(6);
  });

  it("should on and trigger event with args", () => {
    eventTarget.on(evt, spy);

    eventTarget.trigger(evt, 'Wooo');
    expect(spy).toHaveBeenCalledWith('Wooo');
  });

  it("should off all event", () => {
    eventTarget.on(evt, spy);
    eventTarget.on(evt1, spy);
    eventTarget.on(evt2, spy);
    eventTarget.off();
    eventTarget.trigger(evt);
    eventTarget.trigger(evt1);
    eventTarget.trigger(evt2);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should off event by name", () => {
    eventTarget.on(evt, spy);
    eventTarget.off(evt);
    eventTarget.trigger(evt);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should off event by callback", () => {
    eventTarget.on(evt, spy);
    eventTarget.on(evt1, spy);
    eventTarget.off(null, spy);
    eventTarget.trigger(evt);
    eventTarget.trigger(evt1);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should off event by context", () => {
    const context = {};
    eventTarget.on(evt, spy, context);
    eventTarget.on(evt1, spy, context);
    eventTarget.on(evt2, spy1, context);
    eventTarget.off(null, null, context);
    eventTarget.trigger(evt);
    eventTarget.trigger(evt1);
    eventTarget.trigger(evt2);
    expect(spy).not.toHaveBeenCalled();
    expect(spy1).not.toHaveBeenCalled();
  });


});
