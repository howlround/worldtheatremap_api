// src/services/graphql/resolvers.js
const isEmpty = require('lodash').isEmpty;
const isNil = require('lodash').isNil;
var removeDiacritics = require('diacritics').remove;

module.exports = function Resolvers() {

  const app = this;

  return {
    Query: {
      findProfiles: (root, args, context) => {
        const query = {};

        if (!isNil(args.input.name)) {
          query.nameSearch = new RegExp(`.*${removeDiacritics(args.input.name).toUpperCase()}.*`);
        }

        // If this function hasn't generated a valid query return early to prevent all results being returned
        if (isEmpty(query)) {
          return null;
        }

        // context is neccessary for auth
        const params = context;
        // Add query and skip
        params.query = query;
        if (!isNil(args.input.skip)) {
          params.query.$skip = args.input.skip;
        }

        const find = app.service('profiles')
          .find(params)
          .then(data => ({
            total: data.total,
            profiles: data.data,
            skip: data.skip,
            limit: data.limit,
          }));

        return find;
      },
    },
  };
}
