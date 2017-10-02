// Initializes the `festivalOrganizers` service on path `/festival-organizers`
const createService = require('feathers-mongodb');
const hooks = require('./festival-organizers.hooks');
const filters = require('./festival-organizers.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/festival-organizers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('festival-organizers');

  mongoClient.then(db => {
    service.Model = db.collection('FestivalOrganizers');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
