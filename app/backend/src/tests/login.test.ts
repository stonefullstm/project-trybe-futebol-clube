import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { App } from '../app';
import User from '../database/models/UserModel';
import { tokenMock } from './mocks/token.mock';
import { validUserMock } from './mocks/user.mocks';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();
// const app = require('../app');

describe('Testar rota POST /login', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;  
  describe('Quando os dados do body são válidos', () => {
  
    it('Retorna status 200 - sucesso', async () => {
      sinon.stub(User, 'findOne').resolves(validUserMock as User);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwt, 'sign').resolves(tokenMock);

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

      const { status, body } = chaiHttpResponse;

       expect(status).to.be.equal(200);
      expect(body.token).not.to.be.undefined;
    });
  });
    describe('Quando os dados do body não são válidos', () => {
  
      it('É feita uma requisição sem email', async () => {
        // sinon.stub(User, 'findOne').resolves(validUserMock as User);
        // sinon.stub(bcrypt, 'compareSync').returns(true);
        // sinon.stub(jwt, 'sign').resolves(tokenMock);
  
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
      });
      it('É feita uma requisição sem senha', async () => {
        // sinon.stub(User, 'findOne').resolves(validUserMock as User);
        // sinon.stub(bcrypt, 'compareSync').returns(true);
        // sinon.stub(jwt, 'sign').resolves(tokenMock);
  
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'secret_admin' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        (User.findOne as sinon.SinonStub).restore();
        sinon.restore()
      });
      it('Requisição com email incorreto', async () => {
        sinon.stub(User, 'findOne').resolves();
      
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: 'admi@admin.com', password: 'secret_admin' });
          
        expect(chaiHttpResponse.status).to.equal(401);
        expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
      });
  });
});
