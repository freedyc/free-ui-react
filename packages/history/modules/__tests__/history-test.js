import expect from 'expect';
import mock from "jest-mock";
import History from '../history';

describe('Events test', () => {
  let history;
  let spy;

  beforeEach(() => {
    window.history.replaceState(null, null, '/');
  });

  describe('memory history', () => {

    beforeEach(() => {
      history = new History({ mode: 'memory' });
      spy = mock.fn();
    });

    it("should start", (done) => {
      history.start();
      history.on('locationChange', (...args) => {
        spy(...args);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(href);
        done();
      });
      const href = '/test-space';
      history.push(href);
    });
  });

  describe('hashChange history', () => {

    beforeEach(() => {
      history = new History({ mode: 'hashChange' });
      spy = mock.fn();
    });

    it("should start", (done) => {
      history.start();
      history.on('locationChange', (...args) => {
        spy(...args);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(href);
        done();
      });
      const href = '/test-space';
      history.push(href);
    });
  });

  describe('popState history', () => {

    beforeEach(() => {
      history = new History({ mode: 'popState' });
      spy = mock.fn();
    });

    it("should start", (done) => {
      history.start();
      history.on('locationChange', (...args) => {
        spy(...args);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(href);
        done();
      });
      const href = '/test-space';
      history.push(href);
    });
  });
});
