// src/services/graphql/resolvers.js
const each = require('lodash').each;
const get = require('lodash').get;
const isEmpty = require('lodash').isEmpty;
const isNil = require('lodash').isNil;
const removeDiacritics = require('diacritics').remove;

module.exports = function Resolvers() {

  const app = this;

  return {
    Query: {
      findProfiles: (root, args, context) => {
        const query = {};

        if (!isNil(args.input.name)) {
          query.nameSearch = new RegExp(`.*${removeDiacritics(args.input.name).toUpperCase()}.*`);
        }

        if (!isNil(args.input.country)) {
          query.country = {
            $in: args.input.country,
          }
        }

        if (!isNil(args.input.selfDefinedRoles)) {
          query.selfDefinedRoles = {
            $in: args.input.selfDefinedRoles,
          }
        }

        if (!isNil(args.input.interests)) {
          query.interests = {
            $in: args.input.interests,
          }
        }

        if (!isNil(args.input.orgTypes)) {
          query.orgTypes = {
            $in: args.input.orgTypes,
          }
        }

        if (!isNil(args.input.ethnicityRace)) {
          query.ethnicityRace = {
            $in: args.input.ethnicityRace,
          }
        }

        if (!isNil(args.input.locality)) {
          query.locality = args.input.locality;
        }

        if (!isNil(args.input.administrativeArea)) {
          query.administrativeArea = args.input.administrativeArea;
        }

        if (!isNil(args.input.postalCode)) {
          query.postalCode = args.input.postalCode;
        }

        if (!isNil(args.input.gender)) {
          query.gender = {
            $in: args.input.gender,
          }
        }

        // If this function hasn't generated a valid query return early to prevent all results being returned
        if (isEmpty(query)) {
          return {
            total: 0,
            profiles: null,
          }
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

      findShows: (root, args, context) => {
        const query = {};


        if (!isNil(args.input.name)) {
          query.nameSearch = new RegExp(`.*${removeDiacritics(args.input.name).toUpperCase()}.*`);
        }

        const authorId = get(args.input, 'author._id');
        if (authorId) {
          query['author._id'] = authorId;
        }

        if (!isNil(args.input.country)) {
          query.country = {
            $in: args.input.country,
          }
        }

        if (!isNil(args.input.interests)) {
          query.interests = {
            $in: args.input.interests,
          }
        }

        if (!isNil(args.input.languages)) {
          query.languages = {
            $in: args.input.languages,
          }
        }

        // If this function hasn't generated a valid query return early to prevent all results being returned
        if (isEmpty(query)) {
          return {
            total: 0,
            shows: null,
          }
        }

        // context is neccessary for auth
        const params = context;
        // Add query and skip
        params.query = query;
        if (!isNil(args.input.skip)) {
          params.query.$skip = args.input.skip;
        }

        const find = app.service('shows')
          .find(params)
          .then(data => ({
            total: data.total,
            shows: data.data,
            skip: data.skip,
            limit: data.limit,
          }));

        return find;
      },
    },
  };
}
