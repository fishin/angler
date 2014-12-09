var Hoek = require('hoek');
var Pail = require('pail');

var internals = {
    defaults: {
        configFile: 'config.json', 
        dirpath: '/tmp/angler'
    }
};

module.exports = function (options) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);
    this.settings = settings;
    this.createAngler = exports.createAngler;
    this.updateAngler = exports.updateAngler;
    this.getAngler = exports.getAngler;
    this.getAnglerByName = exports.getAnglerByName;
    this.getAnglers = exports.getAnglers;
    this.deleteAngler = exports.deleteAngler;
};

exports.getAnglers = function () {

    var pail = new Pail(this.settings);
    var anglers = pail.getPails();
    return anglers;
};

exports.createAngler = function (config) {

    var pail = new Pail(this.settings);
    var createConfig = pail.createPail(config);
    return createConfig;
};

exports.updateAngler = function (config) {

    var pail = new Pail(this.settings);
    var updateConfig = pail.updatePail(config);
    return updateConfig;
};

exports.getAngler = function (angler_id) {

    var pail = new Pail(this.settings);
    var getConfig = pail.getPail(angler_id);
    return getConfig;
};

exports.getAnglerByName = function (name) {

    var pail = new Pail(this.settings);
    var angler_id = pail.getPailByLink(name);
    var getConfig = pail.getPail(angler_id);
    return getConfig;
};

exports.deleteAngler = function (angler_id) {

    var pail = new Pail(this.settings);
    pail.deletePail(angler_id);
};