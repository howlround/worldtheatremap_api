const assert = require('assert');
const app = require('../../src/app');

describe('\'shows\' service', () => {
  it('registered the service', () => {
    const service = app.service('shows');

    assert.ok(service, 'Registered the service');
  });
});
