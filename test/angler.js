var Code = require('code');
var Lab = require('lab');
var Angler = require('../lib/index');

var internals = {
    defaults: {
        dirpath: '/tmp/testangler',
        configFile: 'config.json'
    }
};

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

var angler = new Angler(internals.defaults);

describe('angler', function () {    

    it('createAngler lloyd', function (done) {

        var config = {
            name: 'lloyd',
            displayName: 'Lloyd Benson1',
            email: 'lloyd.benson@gmail.com'
        };
        var createAngler = angler.createAngler(config);
        expect(createAngler.id).to.exist();
        expect(createAngler.name).to.equal('lloyd');
        expect(createAngler.displayName).to.equal('Lloyd Benson1');
        expect(createAngler.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('createAngler backer', function (done) {

        var config = {
            name: 'backer',
            displayName: 'Ben Acker',
            email: 'ben.acker@gmail.com'
        };
        var createAngler = angler.createAngler(config);
        expect(createAngler.id).to.exist();
        expect(createAngler.name).to.equal('backer');
        expect(createAngler.displayName).to.equal('Ben Acker');
        expect(createAngler.email).to.equal('ben.acker@gmail.com');
        done();
    });

    it('getAnglerByName lloyd', function (done) {

        var getAngler = angler.getAnglerByName('lloyd');
        expect(getAngler.id).to.exist();
        expect(getAngler.name).to.equal('lloyd');
        expect(getAngler.displayName).to.equal('Lloyd Benson1');
        expect(getAngler.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('getAngler lloyd', function (done) {

        var angler_id = angler.getAnglerByName('lloyd').id;
        var getAngler = angler.getAngler(angler_id);
        expect(getAngler.id).to.exist();
        expect(getAngler.name).to.equal('lloyd');
        expect(getAngler.displayName).to.equal('Lloyd Benson1');
        expect(getAngler.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('updateAngler lloyd', function (done) {

        var getAngler = angler.getAnglerByName('lloyd');
        getAngler.displayName = 'Lloyd Benson';
        var updateAngler = angler.updateAngler(getAngler);
        expect(updateAngler.id).to.exist();
        expect(updateAngler.name).to.equal('lloyd');
        expect(updateAngler.displayName).to.equal('Lloyd Benson');
        expect(updateAngler.email).to.equal('lloyd.benson@gmail.com');
        done();
    });

    it('getAnglers', function (done) {

        var getAnglers = angler.getAnglers();
        expect(getAnglers).to.be.length(2);
        done();
    });

    it('deleteAngler lloyd', function (done) {

        var getAngler = angler.getAnglerByName('lloyd');
        angler.deleteAngler(getAngler.id);
        done();
    });

    it('deleteAngler backer', function (done) {

        var getAngler = angler.getAnglerByName('backer');
        angler.deleteAngler(getAngler.id);
        done();
    });

});
