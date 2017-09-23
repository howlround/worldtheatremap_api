const assert = require('assert');
const app = require('../../src/app');

describe('\'Profiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('profiles');

    assert.ok(service, 'Registered the service');
  });
});
