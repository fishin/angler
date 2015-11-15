'use strict';

const Bcrypt = require('bcrypt');
const Hoek = require('hoek');
const Pail = require('pail');

const internals = {
    defaults: {
        configFile: 'config.json',
        dirPath: '/tmp/angler'
    }
};

module.exports = internals.User = function (options) {

    const settings = Hoek.applyToDefaults(internals.defaults, options);
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
    this.generatePassword = exports.generatePassword;
};

exports.getUsers = function () {

    const pail = new Pail(internals.User.settings);
    const users = pail.getPails();
    const fullUsers = [];
    for (let i = 0; i < users.length; ++i) {
        const user = internals.User.getUser(users[i]);
        fullUsers.push(user);
    }

    // sort by createTime
    fullUsers.sort((a, b) => {

        return a.createTime - b.createTime;
    });
    return fullUsers;
};

exports.createUser = function (config) {

    if (config.password) {
        config.password = internals.User.createPasswordHash(config.password);
    }
    const pail = new Pail(internals.User.settings);
    const createConfig = pail.createPail(config);
    return createConfig;
};

exports.updateUser = function (userId, payload) {

    const pail = new Pail(internals.User.settings);
    const getPail = pail.getPail(userId);
    const config = Hoek.applyToDefaults(getPail, payload);
    if (payload.password) {
        config.password = internals.User.createPasswordHash(config.password);
    }
    if (payload.type && payload.type !== 'local') {

        //reset password to nothing
        config.password = '';
    }
    config.updateTime = new Date().getTime();
    const updatedPail = pail.updatePail(config);
    return updatedPail;
};

exports.getUser = function (userId) {

    const pail = new Pail(internals.User.settings);
    const getConfig = pail.getPail(userId);
    return getConfig;
};

exports.getUserByName = function (name) {

    const pail = new Pail(internals.User.settings);
    const userId = pail.getPailByName(name);
    const getConfig = pail.getPail(userId);
    return getConfig;
};

exports.deleteUser = function (userId) {

    const pail = new Pail(internals.User.settings);
    pail.deletePail(userId);
};

exports.validatePassword = function (password, hash) {

    return Bcrypt.compareSync(password, hash);
};

exports.createPasswordHash = function (password) {

    const salt = Bcrypt.genSaltSync(10);
    const hash = Bcrypt.hashSync(password, salt);
    return hash;
};

exports.generatePassword = function (length) {

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
    length = length || 8;
    let string = '';
    for (let i = 0; i < length; ++i) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        string += chars.substring(randomNumber, randomNumber + 1);
    }
    return string;
};
