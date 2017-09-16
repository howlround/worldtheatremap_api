const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const Resolvers = require('./resolvers');
const Schema = require('./schema');

// Initializes the `graphql` service on path `/graphql`
const createService = require('./graphql.class.js');
const hooks = require('./graphql.hooks');
const filters = require('./graphql.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  // Get a GraphQL.js Schema object
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app),
  });

  // Initialize our service with any options it requires
  app.use('/graphql', graphqlExpress((req) => {
    // let {token, provider} = req.feathers;
    return {
      schema: executableSchema,
      context: req.feathers,
    }
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
};
