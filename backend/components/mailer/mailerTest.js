var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../app');
var should = chai.should;
var expect = chai.expect;
chai.use(chaiHttp);

describe('Mailer Test', function () {
    var model = require('./mailerModel');
    var params = {
        service: 'gmail',
        sender: 'kylo@rent.at',
        receiver: 'eragonwien@gmail.com',
        subject: 'The dark side',
        text: 'Welcome to the dark side at ' + new Date().toString()
    }
    it('should send a mail', function (done) {
        this.timeout(5000);
        model.prepareEmail(params, function (error, result) {
            expect(error).to.be.null;
            done(); 
        });
    });
    it('should send a mail per POST on /mailer', function (done) {
        this.timeout(5000);        
        chai.request(app)
            .post('/mailer')
            .send(params)
            .end(function (error, result) {
                expect(error).to.be.null;
                done(); 
            });
    });
});