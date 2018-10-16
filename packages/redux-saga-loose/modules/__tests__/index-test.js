/**
 * Test Demo, test file must end with '-test.js'
 */
import expect from 'expect';

import SagaMiddlewareCreator from '../index';

describe('Dest demo', () => {
  let sagaMiddleware;
  beforeEach(() => {
      sagaMiddleware = SagaMiddlewareCreator();
  });

  it('should be true', () => {
    expect(sagaMiddleware).toHaveProperty('run');
  });
});
