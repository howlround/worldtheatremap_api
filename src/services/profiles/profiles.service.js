// Initializes the `Profiles` service on path `/profiles`
const createService = require('feathers-mongodb');
const hooks = require('./profiles.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/profiles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('profiles');

  mongoClient.then(db => {
    service.Model = db.collection('Profiles');
  });

  service.hooks(hooks);
};
