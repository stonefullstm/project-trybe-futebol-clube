import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { App } from '../app';
import User from '../database/models/UserModel';
import { tokenMock } from './mocks/token.mock';
import { userMock, validUserMock } from './mocks/user.mocks';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();
let chaiHttpResponse: Response;
// const app = require('../app');

describe('Testar rota POST /login', () => {
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
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
      });
      it('É feita uma requisição sem senha', async () => {
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
        (User.findOne as sinon.SinonStub).restore();
        sinon.restore()
      });
  });
});

describe('Testar rota GET /login/validade', () => {
  it('Retorna status 401 - Token not found', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate');
    const { body, status } = chaiHttpResponse;
    expect(body.message).to.equal('Token not found');
    expect(status).to.equal(401);
  });
  it('Retorna status 400 - Token must be a valid token', async () => {  
    const { body, status } = await chai
      .request(app)
      .get('/login/validate')
      .set({ authorization: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx' });

    expect(body.message).to.equal('Token must be a valid token');
    expect(status).to.equal(401);
  });
  it('É possível buscar um usuário com token válido', async () => {
    sinon.stub(User, 'findOne').resolves(validUserMock as User);
    sinon.stub(User, 'findByPk').resolves(userMock as User);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
    const { body: { token } } = chaiHttpResponse;
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({ authorization: token });
    const { body, status } = chaiHttpResponse;
    expect(body).to.deep.equal({ role: 'admin' });
    expect(status).to.equal(200);
  });
});
