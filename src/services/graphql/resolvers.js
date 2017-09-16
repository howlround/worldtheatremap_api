// src/services/graphql/resolvers.js

module.exports = function Resolvers() {

  const app = this;

  return {
    Query: {
      hello: (root, args, context) => {
        return 'Hello world!';
      },
    },
  };
}
