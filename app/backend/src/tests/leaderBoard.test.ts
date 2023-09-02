import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import leaderBoard from './Mocks/leaderBoard';
import MatchesModelDB from '../database/models/Matches';

import { app } from "../app";
chai.use(chaiHttp);

const { expect } = chai;
describe('Teste referente a rota /leaderBoard/home', () => {
  afterEach(() => { sinon.restore() });

  it('Teste se a rota /leaderBoard/home retorna todos os detalhes do placar', async () => {
     sinon.stub(MatchesModelDB, 'findAll').resolves(leaderBoard as any);


     const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');

  });

});
