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
            displayName: 'Lloyd Benson1',
            email: 'lloyd.benson@gmail.com',
            password: 'password1'
        };
        var createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('lloyd');
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
            displayName: 'Ben Acker',
            email: 'ben.acker@gmail.com',
            password: 'password1'
        };
        var createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('backer');
        expect(createUser.displayName).to.equal('Ben Acker');
        expect(createUser.email).to.equal('ben.acker@gmail.com');
        done();
    });

    it('getUserByName lloyd', function (done) {

        var getUser = angler.getUserByName('lloyd');
        expect(getUser.id).to.exist();
        expect(getUser.name).to.equal('lloyd');
        expect(getUser.displayName).to.equal('Lloyd Benson1');
        expect(getUser.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('getUser lloyd', function (done) {

        var anglerId = angler.getUserByName('lloyd').id;
        var getUser = angler.getUser(anglerId);
        expect(getUser.id).to.exist();
        expect(getUser.name).to.equal('lloyd');
        expect(getUser.displayName).to.equal('Lloyd Benson1');
        expect(getUser.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('updateUser lloyd', function (done) {

        var getUser = angler.getUserByName('lloyd');
        var payload = {
            displayName: 'Lloyd Benson'
        }
        var updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.displayName).to.equal('Lloyd Benson');
        done();
    });

    it('updateUser lloyd', function (done) {

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
});
