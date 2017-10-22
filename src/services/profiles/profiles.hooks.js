const { authenticate } = require('feathers-authentication').hooks;
const { populate, iff } = require('feathers-hooks-common');
const get = require('lodash').get;

const festivalChildrenSchema = {
  include: {
    service: 'festival-organizers',
    nameAs: 'festivals',
    parentField: '_id',
    childField: 'parentId',
    asArray: true,
  }
};

const festivalParentsSchema = {
  include: {
    service: 'festival-organizers',
    nameAs: 'festivalOrganizers',
    select: (hook, parentItem) => ({ 'profile._id': parentItem._id }),
    asArray: true,
  }
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      iff(hook => get(hook.params, 'graphqlFields.findProfiles.profiles.festivals'), populate({ schema: festivalChildrenSchema })),
      iff(hook => get(hook.params, 'graphqlFields.findProfiles.profiles.festivalOrganizers'), populate({ schema: festivalParentsSchema })),
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
