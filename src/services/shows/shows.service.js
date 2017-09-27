// Initializes the `shows` service on path `/shows`
const createService = require('feathers-mongodb');
const hooks = require('./shows.hooks');
const filters = require('./shows.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/shows', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('shows');

  mongoClient.then(db => {
    service.Model = db.collection('Shows');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
