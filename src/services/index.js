const graphql = require('./graphql/graphql.service.js');
const apiKeys = require('./api-keys/api-keys.service.js');
const profiles = require('./profiles/profiles.service.js');
const shows = require('./shows/shows.service.js');
const events = require('./events/events.service.js');
const participants = require('./participants/participants.service.js');
const festivalOrganizers = require('./festival-organizers/festival-organizers.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(graphql);
  app.configure(apiKeys);
  app.configure(profiles);
  app.configure(shows);
  app.configure(events);
  app.configure(participants);
  app.configure(festivalOrganizers);
};
