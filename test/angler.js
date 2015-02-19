var Code = require('code');
var Lab = require('lab');
var User = require('../lib/index');

var internals = {
    defaults: {
        dirPath: '/tmp/testangler',
        configFile: 'config.json'
    }
};

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

var angler = new User(internals.defaults);

describe('angler', function () {    


    it('generatePassword', function (done) {

        var password = angler.generatePassword();
        expect(password.length).to.equal(8);
        done();
    });

    it('generatePassword length', function (done) {

        var password = angler.generatePassword(10);
        expect(password.length).to.equal(10);
        done();
    });

    it('createUser lloyd', function (done) {

        var config = {
            name: 'lloyd',
            type: 'local',
            displayName: 'Lloyd Benson1',
            email: 'lloyd.benson@gmail.com',
            password: 'password1'
        };
        var createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('lloyd');
        expect(createUser.type).to.equal('local');
        expect(createUser.displayName).to.equal('Lloyd Benson1');
        expect(createUser.email).to.equal('lloyd.benson@gmail.com');
        expect(createUser.password.length).to.equal(60);
        done();
    });

    it('validatePassword lloyd', function (done) {

        var hash = angler.getUserByName('lloyd').password;
        var validate = angler.validatePassword('password', hash);
        expect(validate).to.be.false();
        done();
    });

    it('createUser backer', function (done) {

        var config = {
            name: 'backer',
            type: 'github'
        };
        var createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('backer');
        expect(createUser.type).to.equal('github');
        expect(createUser.password).to.not.exist();
        done();
    });

    it('getUserByName lloyd', function (done) {

        var getUser = angler.getUserByName('lloyd');
        expect(getUser.id).to.exist();
        expect(getUser.name).to.equal('lloyd');
        expect(getUser.type).to.equal('local');
        expect(getUser.displayName).to.equal('Lloyd Benson1');
        expect(getUser.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('getUser lloyd', function (done) {

        var anglerId = angler.getUserByName('lloyd').id;
        var getUser = angler.getUser(anglerId);
        expect(getUser.id).to.exist();
        expect(getUser.name).to.equal('lloyd');
        expect(getUser.type).to.equal('local');
        expect(getUser.displayName).to.equal('Lloyd Benson1');
        expect(getUser.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('updateUser lloyd displayName', function (done) {

        var getUser = angler.getUserByName('lloyd');
        var payload = {
            displayName: 'Lloyd Benson'
        }
        var updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.displayName).to.equal('Lloyd Benson');
        done();
    });

    it('updateUser lloyd password', function (done) {

        var getUser = angler.getUserByName('lloyd');
        var payload = {
            password: 'password'
        }
        var updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.password).to.not.equal(getUser.password);
        done();
    });

    it('getUsers', function (done) {

        var getUsers = angler.getUsers();
        expect(getUsers).to.be.length(2);
        done();
    });

    it('validatePassword lloyd', function (done) {

        var hash = angler.getUserByName('lloyd').password;
        var validate = angler.validatePassword('password', hash);
        expect(validate).to.be.true();
        done();
    });

    it('deleteUser lloyd', function (done) {

        var getUser = angler.getUserByName('lloyd');
        angler.deleteUser(getUser.id);
        done();
    });

    it('deleteUser backer', function (done) {

        var getUser = angler.getUserByName('backer');
        angler.deleteUser(getUser.id);
        done();
    });

    it('createUser lloyd2', function (done) {

        var config = {
            name: 'lloyd2',
            type: 'local',
            displayName: 'Lloyd Benson',
            email: 'lloyd.benson@gmail.com',
            password: 'password'
        };
        var createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('lloyd2');
        expect(createUser.type).to.equal('local');
        expect(createUser.displayName).to.equal('Lloyd Benson');
        expect(createUser.email).to.equal('lloyd.benson@gmail.com');
        expect(createUser.password.length).to.equal(60);
        done();
    });

    it('updateUser lloyd2', function (done) {

        var getUser = angler.getUserByName('lloyd2');
        var payload = {
            type: 'github'
        }
        var updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.displayName).to.equal('Lloyd Benson');
        done();
    });

    it('deleteUser lloyd2', function (done) {

        var getUser = angler.getUserByName('lloyd2');
        angler.deleteUser(getUser.id);
        done();
    });
});
