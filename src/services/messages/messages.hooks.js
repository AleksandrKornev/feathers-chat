const { authenticate } = require('@feathersjs/authentication').hooks;

const messageCreate = require('../../hooks/message-create');

const messageGet = require('../../hooks/message-get');

const messageFilter = require('../../hooks/message-filter');

const messageGetByChat = require('../../hooks/message-get-by-chat');

const messageAddCompanion = require('../../hooks/message-add-companion');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [messageGet(), messageGetByChat()],
    get: [messageGet(), messageGetByChat()],
    create: [messageCreate()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [messageFilter(), messageAddCompanion()],
    get: [messageFilter(), messageAddCompanion()],
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
