// src/services/graphql/resolvers.js
const each = require('lodash').each;
const get = require('lodash').get;
const isEmpty = require('lodash').isEmpty;
const isNil = require('lodash').isNil;
const moment = require('moment');
const removeDiacritics = require('diacritics').remove;

module.exports = function Resolvers() {

  const app = this;

  return {
    Query: {
      findProfiles: (root, args, context) => {
        const query = {};

        // _id: String
        if (!isNil(args.input._id)) {
          query._id = args.input._id;
        }

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

        // endsAfter: String
        if (!isNil(args.input.endsAfter)) {
          query.endDate = {
            $gte: moment(args.input.endsAfter).startOf('day').toDate(),
          };
        }

        // startsBefore: String
        if (!isNil(args.input.startsBefore)) {
          query.startDate = {
            $lte: moment(args.input.startsBefore).endOf('day').toDate(),
          };
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

        // _id: String
        if (!isNil(args.input._id)) {
          query._id = args.input._id;
        }

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

      findEvents: (root, args, context) => {
        const query = {};

        // _id: String
        if (!isNil(args.input._id)) {
          query._id = args.input._id;
        }

        // show: ReferencedEntityInput
        const showId = get(args.input, 'show._id');
        if (showId) {
          query['show._id'] = showId;
        }

        // organizations: ReferencedEntityInput
        const organizationsId = get(args.input, 'organizations._id');
        if (organizationsId) {
          query['organizations._id'] = organizationsId;
        }

        // eventType: [String]
        if (!isNil(args.input.eventType)) {
          query.eventType = {
            $in: args.input.eventType,
          }
        }

        // locality: [String]
        if (!isNil(args.input.locality)) {
          query.locality = {
            $in: args.input.locality,
          }
        }

        // administrativeArea: [String]
        if (!isNil(args.input.administrativeArea)) {
          query.administrativeArea = {
            $in: args.input.administrativeArea,
          }
        }

        // country: [String]
        if (!isNil(args.input.country)) {
          query.country = {
            $in: args.input.country,
          }
        }

        // endsAfter: String
        if (!isNil(args.input.endsAfter)) {
          query.endDate = {
            $gte: moment(args.input.endsAfter).startOf('day').toDate(),
          };
        }

        // startsBefore: String
        if (!isNil(args.input.startsBefore)) {
          query.startDate = {
            $lte: moment(args.input.startsBefore).endOf('day').toDate(),
          };
        }

        // context is neccessary for auth
        const params = context;
        // Add query and skip
        params.query = query;
        if (!isNil(args.input.skip)) {
          params.query.$skip = args.input.skip;
        }

        const find = app.service('events')
          .find(params)
          .then(data => ({
            total: data.total,
            events: data.data,
            skip: data.skip,
            limit: data.limit,
          }));

        return find;
      },

      findParticipants: (root, args, context) => {
        const query = {};

        // _id: String
        if (!isNil(args.input._id)) {
          query._id = args.input._id;
        }

        // profile: ReferencedEntityInput
        const profileId = get(args.input, 'profile._id');
        if (profileId) {
          query['profile._id'] = profileId;
        }

        // event: ParticipantEventFiltersInput
        // _id: String
        const eventId = get(args.input, 'event._id');
        if (eventId) {
          query['event._id'] = eventId;
        }

        // show: ReferencedEntityInput
        const eventShowId = get(args.input, 'event.show._id');
        if (eventShowId) {
          query['event.show._id'] = eventShowId;
        }

        // organizations: ReferencedEntityInput
        const eventOrgId = get(args.input, 'event.organizations._id');
        if (eventOrgId) {
          query['event.organizations._id'] = eventOrgId;
        }

        // role: String
        if (!isNil(args.input.role)) {
          query.role = args.input.role;
        }

        // context is neccessary for auth
        const params = context;
        // Add query and skip
        params.query = query;
        if (!isNil(args.input.skip)) {
          params.query.$skip = args.input.skip;
        }

        const find = app.service('participants')
          .find(params)
          .then(data => ({
            total: data.total,
            participants: data.data,
            skip: data.skip,
            limit: data.limit,
          }));

        return find;
      },
    },
  };
}
