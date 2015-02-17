var Bcrypt = require('bcrypt');
var Hoek = require('hoek');
var Pail = require('pail');

var internals = {
    defaults: {
        configFile: 'config.json', 
        dirPath: '/tmp/angler'
    }
};

module.exports = internals.User = function (options) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);
    internals.User.settings = settings;
    internals.User.getUser = exports.getUser;
    internals.User.createPasswordHash = exports.createPasswordHash;
    this.createUser = exports.createUser;
    this.updateUser = exports.updateUser;
    this.getUser = exports.getUser;
    this.getUserByName = exports.getUserByName;
    this.getUsers = exports.getUsers;
    this.deleteUser = exports.deleteUser;
    this.validatePassword = exports.validatePassword;
    this.createPasswordHash = exports.createPasswordHash;
};

exports.getUsers = function () {

    var pail = new Pail(internals.User.settings);
    var users = pail.getPails();
    var fullUsers = [];
    for (var i = 0; i < users.length; i++) {
        var user = internals.User.getUser(users[i]);
        fullUsers.push(user);
    }
    // sort by createTime
    fullUsers.sort(function(a, b){

       return a.createTime-b.createTime;
    });
    return fullUsers;
};

exports.createUser = function (config) {

    
    config.password = internals.User.createPasswordHash(config.password);
    var pail = new Pail(internals.User.settings);
    var createConfig = pail.createPail(config);
    return createConfig;
};

exports.updateUser = function (userId, payload) {

    var pail = new Pail(internals.User.settings);
    var getPail = pail.getPail(userId);
    var config = Hoek.applyToDefaults(getPail, payload);
    if (payload.password) {
        config.password = internals.User.createPasswordHash(config.password);
    }
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

exports.validatePassword = function(password, hash) {

    return Bcrypt.compareSync(password, hash);
};

exports.createPasswordHash = function(password) {

    var salt = Bcrypt.genSaltSync(10);
    var hash = Bcrypt.hashSync(password, salt);
    return hash;
};
