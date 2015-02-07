var Hoek = require('hoek');
var Pail = require('pail');

var internals = {
    defaults: {
        configFile: 'config.json', 
        dirPath: '/tmp/angler'
    }
};

module.exports = internals.Angler = function (options) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);
    internals.Angler.settings = settings;
    internals.Angler.getAngler = exports.getAngler;
    this.createAngler = exports.createAngler;
    this.updateAngler = exports.updateAngler;
    this.getAngler = exports.getAngler;
    this.getAnglerByName = exports.getAnglerByName;
    this.getAnglers = exports.getAnglers;
    this.deleteAngler = exports.deleteAngler;
};

exports.getAnglers = function () {

    var pail = new Pail(internals.Angler.settings);
    var anglers = pail.getPails();
    var fullAnglers = [];
    for (var i = 0; i < anglers.length; i++) {
        var angler = internals.Angler.getAngler(anglers[i]);
        fullAnglers.push(angler);
    }
    // sort by createTime
    fullAnglers.sort(function(a, b){

       return a.createTime-b.createTime;
    });
    return fullAnglers;
};

exports.createAngler = function (config) {

    var pail = new Pail(internals.Angler.settings);
    var createConfig = pail.createPail(config);
    return createConfig;
};

exports.updateAngler = function (anglerId, payload) {

    var pail = new Pail(internals.Angler.settings);
    var getPail = pail.getPail(anglerId);
    var config = Hoek.applyToDefaults(getPail, payload);
    config.updateTime = new Date().getTime();
    var updatedPail = pail.updatePail(config);
    return updatedPail;
};

exports.getAngler = function (anglerId) {

    var pail = new Pail(internals.Angler.settings);
    var getConfig = pail.getPail(anglerId);
    return getConfig;
};

exports.getAnglerByName = function (name) {

    var pail = new Pail(internals.Angler.settings);
    var anglerId = pail.getPailByName(name);
    var getConfig = pail.getPail(anglerId);
    return getConfig;
};

exports.deleteAngler = function (anglerId) {

    var pail = new Pail(internals.Angler.settings);
    pail.deletePail(anglerId);
};
