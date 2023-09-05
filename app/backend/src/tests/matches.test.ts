import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as JWT from 'jsonwebtoken';
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

  it('Deve criar uma nova partida com dados válidos', async () => {
    const mockNewMatch = {
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    
    }
    const authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzUwOTQ1OX0.TeiKGg-BhntNDAMd2jZz2cM8j5gSvw7CDy5ntf5XaWo'

    sinon.stub(MatchesModelDB, 'create').resolves(mockNewMatch as any);
    sinon.stub( JWT, 'verify').resolves({email: 'admin@admin.com'} as any);
    const response = await chai.request(app).post('/matches').set("Authorization", authorizationToken)
    .send(mockNewMatch);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.deep.equal(mockNewMatch);

  });

});
