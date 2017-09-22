// Initializes the `ApiKeys` service on path `/api-keys`
const createService = require('feathers-mongodb');
const hooks = require('./api-keys.hooks');
const filters = require('./api-keys.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/api-keys', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api-keys');

  mongoClient.then(db => {
    service.Model = db.collection('ApiKeys');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
