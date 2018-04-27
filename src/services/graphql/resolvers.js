// src/services/graphql/resolvers.js
const {
  each,
  get,
  isEmpty,
  isNil,
  map,
  clone,
} = require('lodash');
const moment = require('moment');
const removeDiacritics = require('diacritics').remove;
const graphqlFields = require('graphql-fields');

module.exports = function Resolvers() {

  const app = this;

  return {
    Query: {
      findProfiles: (root, args, context, info) => {
        context.graphqlFields = context.graphqlFields || {};
        context.graphqlFields.findProfiles = graphqlFields(info);

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

        // profileType: [String]
        if (!isNil(args.input.profileType)) {
          query.profileType = {
            $in: args.input.profileType,
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

      findShows: (root, args, context, info) => {
        context.graphqlFields = context.graphqlFields || {};
        context.graphqlFields.findShows = graphqlFields(info);

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

      findEvents: (root, args, context, info) => {
        context.graphqlFields = context.graphqlFields || {};
        // context.graphqlFields.findEvents = graphqlFields(info);

        const query = {};

        // _id: String
        if (!isNil(args.input._id)) {
          query._id = args.input._id;
        }

        // show: ReferencedShowInput
        const showId = get(args.input, 'show._id');
        if (showId) {
          query['show._id'] = showId;
        }

        const showInterests = get(args.input, 'show.interests');
        if (showInterests) {
          query['show.interests'] = {
            $in: showInterests,
          }
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

        query.$sort = {
          'startDate': -1,
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

      countEvents: (root, args, context) => {
        const eventQuery = {};
        const showQuery = {};

        // Show Filters
        // _id: String
        if (!isNil(args.input._id)) {
          showQuery._id = args.input._id;
        }

        // name: String
        if (!isNil(args.input.name)) {
          showQuery.nameSearch = new RegExp(`.*${removeDiacritics(args.input.name).toUpperCase()}.*`);
        }

        // Not using author in search right now
        // author: ReferencedEntityInput
        // const authorId = get(args.input, 'author._id');
        // if (authorId) {
        //   showQuery['author._id'] = authorId;
        // }

        // country: [String]
        if (!isNil(args.input.country)) {
          showQuery.country = {
            $in: args.input.country,
          }
        }

        // interests: [String]
        if (!isNil(args.input.interests)) {
          showQuery.interests = {
            $in: args.input.interests,
          }
        }

        // languages: [String]
        if (!isNil(args.input.languages)) {
          showQuery.languages = {
            $in: args.input.languages,
          }
        }

        // Events filters
        // Not using show or organizations reference right now
        // // show: ReferencedEntityInput
        // const showId = get(args.input, 'show._id');
        // if (showId) {
        //   eventQuery['show._id'] = showId;
        // }

        // // organizations: ReferencedEntityInput
        // const organizationsId = get(args.input, 'organizations._id');
        // if (organizationsId) {
        //   eventQuery['organizations._id'] = organizationsId;
        // }

        // eventType: [String]
        if (!isNil(args.input.eventType)) {
          eventQuery.eventType = {
            $in: args.input.eventType,
          }
        }

        // locality: [String]
        if (!isNil(args.input.locality)) {
          eventQuery.locality = {
            $in: args.input.locality,
          }
        }

        // administrativeArea: [String]
        if (!isNil(args.input.administrativeArea)) {
          eventQuery.administrativeArea = {
            $in: args.input.administrativeArea,
          }
        }

        // eventsCountry: [String]
        if (!isNil(args.input.eventsCountry)) {
          eventQuery.country = {
            $in: args.input.eventsCountry,
          }
        }

        // startsBefore: String
        if (!isNil(args.input.startsBefore)) {
          eventQuery.startDate = {
            $lte: moment(args.input.startsBefore).endOf('day').toDate(),
          };
        }

        // endsAfter: String
        if (!isNil(args.input.endsAfter)) {
          eventQuery.endDate = {
            $gte: moment(args.input.endsAfter).startOf('day').toDate(),
          };
        }

        // If there are show filters, get the show ids using the show filters
        // add those ids to a query including the events filters
        // count the events
        if (!isEmpty(showQuery)) {
          // context is neccessary for auth
          const showParams = clone(context);
          // Add query and skip
          showParams.query = showQuery;
          showParams.query.$select = ['_id'];

          const findShows = app.service('shows')
            .find(showParams)
            .then(data => {
              const showIds = map(data.data, '_id');
              eventQuery['show._id'] = {
                $in: showIds,
              }

              // context is neccessary for auth
              const eventParams = clone(context);
              // Add query and skip
              eventParams.query = eventQuery;
              // Only count the events
              eventParams.query.$limit = 0;

              const find = app.service('events')
                .find(eventParams)
                .then(data => ({
                  total: data.total,
                }));

              return find;
            });

          return findShows;
        } else if (!isEmpty(eventQuery)) {
          // If there are only event filters, do a count of events that match that query
          // context is neccessary for auth
          const eventParams = context;
          // Add query and skip
          eventParams.query = eventQuery;
          // Only count the events
          eventParams.query.$limit = 0;

          const find = app.service('events')
            .find(eventParams)
            .then(data => ({
              total: data.total,
            }));

          return find;
        }
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
