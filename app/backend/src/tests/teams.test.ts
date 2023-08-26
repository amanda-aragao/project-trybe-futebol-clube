import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamsModel from '../database/models/Teams';
import  mockTeams   from './Mocks/teams';

import { app } from '../app';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  afterEach(function() { sinon.restore() });
  it('Teste se a rota /teams retorna todos os times', async () => {
    const findAllStub = sinon.stub(TeamsModel, 'findAll');
    findAllStub.resolves(mockTeams.allTeams as any); 
    const response = await chai.request(app).get('/teams');

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(mockTeams.allTeams);
    expect(response.body).to.be.an('array');
  });

  it('Teste se a rota /teams:id retorna somente o time referente ao id', async () => {
    const findId = sinon.stub(TeamsModel, 'findByPk');
    const teamsID15 = mockTeams.teamsID15 as any; 
    findId.resolves(teamsID15); 
    const response = await chai.request(app).get('/teams/15');

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.equal(mockTeams.teamsID15);
    expect(response.body).to.be.an('object');
  });

});
