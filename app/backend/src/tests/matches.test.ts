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
  it('Deve retornar status 401 e mensagem "Token must be a valid token" quando o token for inválido para a rota /matches/5/finish', async () => {
    const token = 'token_invalido'; 
    
    const response = await chai.request(app)
      .patch('/matches/5/finish')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.deep.equal('Token must be a valid token');
});

it('Deve retornar status 200 e mensagem "Finished" /matches/5/finish', async () => {
  sinon.stub( JWT, 'verify').resolves({email: 'admin@admin.com'} as any);

  const response = await chai.request(app)
    .patch('/matches/5/finish')
    .set('Authorization', mockMathes.authorizationToken);
  
  expect(response.status).to.be.equal(200);
  expect(response.body.message).to.be.deep.equal('Finished' );
});

it('Deve retornar status 401 e mensagem "Token must be a valid token" quando o token for inválido', async () => {
  
  const response = await chai.request(app)
    .patch('/matches/5/finish')
    .set('oi', 'oi');
  
  expect(response.status).to.be.equal(401);
  expect(response.body.message).to.be.deep.equal('Token not found');
});

  it('Deve retornar status 401 quando nenhum token for fornecido', async () => {
    const matchId = 1; 

    const response = await chai.request(app)
      .patch(`/matches/${matchId}`)
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    
    expect(response.status).to.be.equal(401);
  });

  it('Deve ser possível alterar o resultado de uma partida com um token válido', async () => {
    const matchId = 1; 
    sinon.stub( JWT, 'verify').resolves({email: 'admin@admin.com'} as any);

    const response = await chai.request(app)
      .patch(`/matches/${matchId}`)
      .set('Authorization', mockMathes.authorizationToken)
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.deep.equal({message: 'updated'});
    });


});
