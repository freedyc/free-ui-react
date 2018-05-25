import History from '../history';

describe('Events test', () => {
  let history;
  let spy;

  beforeEach(() => {
    history = new History();
    spy = jest.fn();
  });

  it("should start", () => {
    history.start();
    history.on('popState', spy);
    let href = '/test-space';
    history.push(href);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(href);
  });



});
