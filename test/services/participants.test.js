const assert = require('assert');
const app = require('../../src/app');

describe('\'participants\' service', () => {
  it('registered the service', () => {
    const service = app.service('participants');

    assert.ok(service, 'Registered the service');
  });
});
