import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { App } from '../app';
import sequelize from '../database/models';
import Match from '../database/models/MatchModel';
import User from '../database/models/UserModel';
import { createdMatchMock, homeClassificationMock, matchesMock } from './mocks/matches.mock';
import { validUserMock } from './mocks/user.mocks';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();
const UPDATE_RETURN = 1;
let chaiHttpResponse: Response;

describe('Testar rota GET /matches', () => {
  it('Retorna status 200 - sucesso', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[]);

    chaiHttpResponse = await chai
    .request(app)
    .get('/matches')

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });
  it('Rota GET /matches?inProgress retorna status 200 - sucesso', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matches')
    .query({ inProgress: true });

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesMock);
    (Match.findAll as sinon.SinonStub).restore();
    sinon.restore()

  });

});
describe('Testar rota POST /matches', () => {
  it('Retorna status 201 - sucesso', async () => {
    sinon.stub(User, 'findOne').resolves(validUserMock as User);
    sinon.stub(Match, 'create').resolves(createdMatchMock as unknown as Match);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
    const { body: { token } } = chaiHttpResponse;

    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set({ authorization: token })
    .send({ homeTeamId: 16, awayTeamId: 8,
      homeTeamGoals: 2, awayTeamGoals: 2 });

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(201);
    expect(body).to.deep.equal(createdMatchMock);
    (Match.create as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
    sinon.restore()
  });

});

describe('Testar rota PATCH /matches', () => {
  it('Rota PATCH /matches/:id retorna status 200 - sucesso', async () => {
    sinon.stub(Match, 'update').resolves([UPDATE_RETURN]);

    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1')
    .send({ homeTeamGoals: 3, awayTeamGoals: 1 })

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
  });
  it('Rota PATCH /matches/:id/finish retorna status 200 - sucesso', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/1/finish')

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    (Match.update as sinon.SinonStub).restore();
    sinon.restore()
  });
});

describe('Testar rota GET /leaderboard', () => {
  it('Rota /leaderborad/home retorna status 200 - sucesso', async () => {
    sinon.stub(sequelize, 'query').resolves([homeClassificationMock, true]);

    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')
 
    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
  });
  it('Rota /leaderboard/away retorna status 200 - sucesso', async () => {

    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/away')
 
    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
  });
  it('Rota /leaderboard retorna status 200 - sucesso', async () => {

    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard')
 
    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
  });
});
