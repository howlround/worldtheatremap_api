// Initializes the `participants` service on path `/participants`
const createService = require('feathers-mongodb');
const hooks = require('./participants.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/participants', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('participants');

  mongoClient.then(db => {
    service.Model = db.collection('Participants');
  });

  service.hooks(hooks);
};
