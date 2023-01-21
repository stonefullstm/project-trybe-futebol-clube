import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const app = require('../app');

describe('Testar rota POST /login', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;  
  describe('Quando os dados do body são válidos', () => {
  
    it('Retorna status 200 - sucesso', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

      const { user, token } = chaiHttpResponse.body;

      loginToken = token;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(token).not.to.be.undefined;
      expect(user.username).to.be.equal('Admin');    
    });
  
  });
});
