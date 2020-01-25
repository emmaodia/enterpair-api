const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app');

describe('App Index', () => {
    it('app should return api index', () => {
       return chai.request(app)
       .get('/')
       .then((res)=>{
        expect(res).to.have.status(200);
        expect(res).to.be.json; 
       })
    })
})