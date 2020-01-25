const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Main', () => {
    it('should return hello', (done) => { 
        chai.request(app)
            .get('/')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json; 
                assert.deepEqual(res.body, {msg: "Hello!"});
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});