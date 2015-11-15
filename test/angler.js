'use strict';

const Code = require('code');
const Lab = require('lab');
const User = require('../lib/index');

const internals = {
    defaults: {
        dirPath: '/tmp/testangler',
        configFile: 'config.json'
    }
};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

const angler = new User(internals.defaults);

describe('angler', () => {

    it('generatePassword', (done) => {

        const password = angler.generatePassword();
        expect(password.length).to.equal(8);
        done();
    });

    it('generatePassword length', (done) => {

        const password = angler.generatePassword(10);
        expect(password.length).to.equal(10);
        done();
    });

    it('createUser lloyd', (done) => {

        const config = {
            name: 'lloyd',
            type: 'local',
            displayName: 'Lloyd Benson1',
            email: 'lloyd.benson@gmail.com',
            password: 'password1'
        };
        const createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('lloyd');
        expect(createUser.type).to.equal('local');
        expect(createUser.displayName).to.equal('Lloyd Benson1');
        expect(createUser.email).to.equal('lloyd.benson@gmail.com');
        expect(createUser.password.length).to.equal(60);
        done();
    });

    it('validatePassword lloyd', (done) => {

        const hash = angler.getUserByName('lloyd').password;
        const validate = angler.validatePassword('password', hash);
        expect(validate).to.be.false();
        done();
    });

    it('createUser backer', (done) => {

        const config = {
            name: 'backer',
            type: 'github'
        };
        const createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('backer');
        expect(createUser.type).to.equal('github');
        expect(createUser.password).to.not.exist();
        done();
    });

    it('getUserByName lloyd', (done) => {

        const getUser = angler.getUserByName('lloyd');
        expect(getUser.id).to.exist();
        expect(getUser.name).to.equal('lloyd');
        expect(getUser.type).to.equal('local');
        expect(getUser.displayName).to.equal('Lloyd Benson1');
        expect(getUser.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('getUser lloyd', (done) => {

        const anglerId = angler.getUserByName('lloyd').id;
        const getUser = angler.getUser(anglerId);
        expect(getUser.id).to.exist();
        expect(getUser.name).to.equal('lloyd');
        expect(getUser.type).to.equal('local');
        expect(getUser.displayName).to.equal('Lloyd Benson1');
        expect(getUser.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('updateUser lloyd displayName', (done) => {

        const getUser = angler.getUserByName('lloyd');
        const payload = {
            displayName: 'Lloyd Benson'
        };
        const updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.displayName).to.equal('Lloyd Benson');
        done();
    });

    it('updateUser lloyd password', (done) => {

        const getUser = angler.getUserByName('lloyd');
        const payload = {
            password: 'password'
        };
        const updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.password).to.not.equal(getUser.password);
        done();
    });

    it('getUsers', (done) => {

        const getUsers = angler.getUsers();
        expect(getUsers).to.be.length(2);
        done();
    });

    it('validatePassword lloyd', (done) => {

        const hash = angler.getUserByName('lloyd').password;
        const validate = angler.validatePassword('password', hash);
        expect(validate).to.be.true();
        done();
    });

    it('deleteUser lloyd', (done) => {

        const getUser = angler.getUserByName('lloyd');
        angler.deleteUser(getUser.id);
        done();
    });

    it('deleteUser backer', (done) => {

        const getUser = angler.getUserByName('backer');
        angler.deleteUser(getUser.id);
        done();
    });

    it('createUser lloyd2', (done) => {

        const config = {
            name: 'lloyd2',
            type: 'local',
            displayName: 'Lloyd Benson',
            email: 'lloyd.benson@gmail.com',
            password: 'password'
        };
        const createUser = angler.createUser(config);
        expect(createUser.id).to.exist();
        expect(createUser.name).to.equal('lloyd2');
        expect(createUser.type).to.equal('local');
        expect(createUser.displayName).to.equal('Lloyd Benson');
        expect(createUser.email).to.equal('lloyd.benson@gmail.com');
        expect(createUser.password.length).to.equal(60);
        done();
    });

    it('updateUser lloyd2', (done) => {

        const getUser = angler.getUserByName('lloyd2');
        const payload = {
            type: 'github'
        };
        const updateUser = angler.updateUser(getUser.id, payload);
        expect(updateUser.displayName).to.equal('Lloyd Benson');
        done();
    });

    it('deleteUser lloyd2', (done) => {

        const getUser = angler.getUserByName('lloyd2');
        angler.deleteUser(getUser.id);
        done();
    });
});
