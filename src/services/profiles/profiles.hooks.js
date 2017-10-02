const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');

const festivalChildrenSchema = {
  include: {
    service: 'festival-organizers',
    nameAs: 'festivals',
    parentField: '_id',
    childField: 'parentId',
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
    find: [ populate({ schema: festivalChildrenSchema }) ],
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
