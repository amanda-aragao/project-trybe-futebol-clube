import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesModelDB from '../database/models/Matches';
import mockMathes from './Mocks/matches';


import { app } from '../app';
chai.use(chaiHttp);

const { expect } = chai;

describe('Teste referente a rota /matches', () => {
  afterEach(() => { sinon.restore() });

  it('Teste se a rota /matches retorna todas as partidas', async () => {
    const findAllStub = sinon.stub(MatchesModelDB, 'findAll');

    findAllStub.resolves(mockMathes.matches as any);


    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(mockMathes.matches);
  });


  it('Deve ser possivel filtrar somente as partidas em andamento ', async () => {
    mockMathes.matches.filter((match) => match.inProgress === true);
    sinon.stub(MatchesModelDB, 'findAll').resolves(mockMathes.matches as any);
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(mockMathes.matchesInProgress);
  });

  it('Deve ser possivel filtrar somente as partidas finalizadas ', async () => {
    mockMathes.matches.filter((match) => match.inProgress === false);
    sinon.stub(MatchesModelDB, 'findAll').resolves(mockMathes.matches as any);
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(mockMathes.matchesFinished);
  });

});