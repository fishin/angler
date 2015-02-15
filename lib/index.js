var AuthBase = require('hapi-auth-basic');
var AuthCookie = require('hapi-auth-cookie');
var Bell = require('bell');
var Hoek = require('hoek');
var Joi = require('joi');

var Api = require('./api');
var Utils = require('./utils');

var internals = {
    defaults: {
        apiPath: '/api',
        configFile: 'config.json', 
        dirPath: '/tmp/angler'
    }
};

exports.register = function (server, options, next) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);

    var api = new Api(settings);
    var utils = new Utils(settings);

    server.expose('createUser', Utils.createUser);
    server.expose('deleteUser', Utils.deleteUser);
    server.expose('getUser', Utils.getUser);
    server.expose('getUserByName', Utils.getUserByName);
    server.expose('getUsers', Utils.getUsers);
    server.expose('updateUser', Utils.updateUser);

    server.route([
        {
            method: 'POST',
            path: settings.apiPath+'/user',
            config: {
                handler: api.createUser,
                description: "create user",
                validate: {
                    payload: {
                        name: Joi.string().required(),
                        displayName: Joi.string(),
                        email: Joi.string().email()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: settings.apiPath+'/user/{userId}',
            config: {
                handler: api.getUser,
                description: "get user",
                validate: {
                    params: {
                        userId: Joi.string().guid().required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: settings.apiPath+'/user/byname/{name}',
            config: {
                handler: api.getUserByName,
                description: "get user by name",
                validate: {
                    params: {
                        name: Joi.string().required()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: settings.apiPath+'/user/{userId}',
            config: {
                handler: api.deleteUser,
                description: "delete user",
                validate: {
                    params: {
                        userId: Joi.string().guid().required()
                    }
                }
            }
        },
        {
            method: 'POST',
            path: settings.apiPath+'/user/{userId}',
            config: {
                handler: api.updateUser,
                description: "update user",
                validate: {
                    params: {
                        userId: Joi.string().guid().required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: settings.apiPath+'/users',
            config: {
                handler: api.getUsers,
                description: "get users"
            }
        }
    ]);
    next();
};

exports.register.attributes = {

    pkg: require('../package.json')
};
