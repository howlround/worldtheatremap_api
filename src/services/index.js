const graphql = require('./graphql/graphql.service.js');
const apiKeys = require('./api-keys/api-keys.service.js');
const profiles = require('./profiles/profiles.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(graphql);
  app.configure(apiKeys);
  app.configure(profiles);
};
