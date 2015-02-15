var Utils = require('./utils');

var internals = {};

module.exports = internals.Api = function (options) {

    this.settings = options;
    var utils = new Utils(options);
    internals.Api.settings = options;
    internals.Api.createUser = utils.createUser;
    internals.Api.deleteUser = utils.deleteUser;
    internals.Api.getUser = utils.getUser;
    internals.Api.getUserByName = utils.getUserByName;
    internals.Api.updateUser = utils.updateUser;
    internals.Api.getUsers = utils.getUsers;
    this.createUser = exports.createUser;
    this.deleteUser = exports.deleteUser;
    this.getUser = exports.getUser;
    this.getUserByName = exports.getUserByName;
    this.updateUser = exports.updateUser;
    this.getUsers = exports.getUsers;
};

exports.createUser = function (request,reply) {

    var user = internals.Api.createUser(request.payload);
    reply(user);
};

exports.updateUser = function (request,reply) {

    var user = internals.Api.updateUser(request.params.userId, request.payload);
    reply(user);
};

exports.getUser = function (request,reply) {

    var user = internals.Api.getUser(request.params.userId);
    reply(user);
};

exports.getUserByName = function (request,reply) {

    var user = internals.Api.getUserByName(request.params.name);
    reply(user);
};

exports.getUsers = function (request,reply) {

    var users = internals.Api.getUsers();
    reply(users);
};

exports.deleteUser = function (request,reply) {

    internals.Api.deleteUser(request.params.userId);
    reply('');
};
/*

exports.loginUser = function (request, reply) {

    var angler = internals.User.getUser(userId);
    console.log('login angler: ' + angler.name + ' with type:' + type);
};

exports.logoutUser = function (userId) {

    var angler = internals.User.getUser(userId);
    console.log('logout angler: ' + angler.name);
};

*/
