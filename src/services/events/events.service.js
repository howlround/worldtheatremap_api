// Initializes the `events` service on path `/events`
const createService = require('feathers-mongodb');
const hooks = require('./events.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/events', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('events');

  mongoClient.then(db => {
    service.Model = db.collection('Events');
  });

  service.hooks(hooks);
};
