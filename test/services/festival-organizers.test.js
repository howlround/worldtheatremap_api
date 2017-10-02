const assert = require('assert');
const app = require('../../src/app');

describe('\'festivalOrganizers\' service', () => {
  it('registered the service', () => {
    const service = app.service('festival-organizers');

    assert.ok(service, 'Registered the service');
  });
});
