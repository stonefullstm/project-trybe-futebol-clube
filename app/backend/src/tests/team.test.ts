// import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { App } from '../app';
import Team from '../database/models/TeamModel';
import { teamsMock } from './mocks/team.mocks';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();
let chaiHttpResponse: Response;
// const app = require('../app');

describe('Testar rota GET /teams', () => {
 
  it('Retorna status 200 - sucesso', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as unknown as Team[]);

    chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });
});

describe('Testar rota GET /teams/:id', () => {
 
  it('Retorna status 200 - sucesso', async () => {
    sinon.stub(Team, 'findByPk').resolves(teamsMock[0] as Team);

    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1')

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teamsMock[0]);
  });
});
