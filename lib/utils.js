var AuthBase = require('hapi-auth-basic');
var AuthCookie = require('hapi-auth-cookie');
var Bell = require('bell');
var Hoek = require('hoek');
var Pail = require('pail');

var internals = {};

module.exports = internals.User = function (settings) {

    internals.User.settings = settings; 
    internals.User.getUser = exports.getUser; 
    this.createUser = exports.createUser;
    this.deleteUser = exports.deleteUser;
    this.getUser = exports.getUser;
    this.getUserByName = exports.getUserByName;
    this.updateUser = exports.updateUser;
    this.getUsers = exports.getUsers;
};

exports.getUsers = function () {

    var pail = new Pail(internals.User.settings);
    var anglers = pail.getPails();
    var fullUsers = [];
    for (var i = 0; i < anglers.length; i++) {
        var angler = internals.User.getUser(anglers[i]);
        fullUsers.push(angler);
    }
    // sort by createTime
    fullUsers.sort(function(a, b){

       return a.createTime-b.createTime;
    });
    return fullUsers;
};

exports.createUser = function (config) {

    var pail = new Pail(internals.User.settings);
    var createConfig = pail.createPail(config);
    return createConfig;
};

exports.updateUser = function (userId, payload) {

    var pail = new Pail(internals.User.settings);
    var getPail = pail.getPail(userId);
    var config = Hoek.applyToDefaults(getPail, payload);
    config.updateTime = new Date().getTime();
    var updatedPail = pail.updatePail(config);
    return updatedPail;
};

exports.getUser = function (userId) {

    var pail = new Pail(internals.User.settings);
    var getConfig = pail.getPail(userId);
    return getConfig;
};

exports.getUserByName = function (name) {

    var pail = new Pail(internals.User.settings);
    var userId = pail.getPailByName(name);
    var getConfig = pail.getPail(userId);
    return getConfig;
};

exports.deleteUser = function (userId) {

    var pail = new Pail(internals.User.settings);
    pail.deletePail(userId);
};
