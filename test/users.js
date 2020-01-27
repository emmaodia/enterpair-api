const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require("chai-as-promised");
const should = chai.should();


const app = require('../app');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Users', () => {
    it('should return a list of users', (done) => { 
        chai.request(app)
            .get('/api/v1/user/home')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.json;
                //res.body.length.should.be.eql(0);
            done();
            });
            // .then(res => {
            //     //const body = res.body;
            //     // expect(res).to.eventually.have.status(200);
            //     //expect(body).to.eventually.have.json; 
            //     console.log(res.body);
            //     done();
            // })
            // .catch(err => {
            //     expect(err).to.eventually.have.status(500);
            //     expect(err).to.eventually.be.json;
            //     done(err);
            // });
    });

    it('should return return ONE user', (done) => { 
        chai.request(app)
            .get('/api/v1/user/:userId')
            .then(res => {
                //const body = res.body;
                // expect(res).to.eventually.have.status(200);
                //expect(body).to.eventually.have.json; 
                //console.log(res);
                done();
            })
            .catch(err => {
                expect(err).to.eventually.have.status(500);
                expect(err).to.eventually.be.json;
                done(err);
            });
    });
});
