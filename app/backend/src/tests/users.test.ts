import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import userModel from '../database/models/Users';
import  mockUser  from './Mocks/user';
import Users from '../database/models/Users';
import * as jwt from 'jsonwebtoken';



import { app } from '../app';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste referente a rota /login', () => {
  afterEach(() =>  { sinon.restore() });

  it('Teste se a rota /login é possivel registrar um usuário', async  () => {
    sinon.stub(userModel, 'findOne').resolves(mockUser.user as any);
    sinon.stub(jwt, 'sign').returns(mockUser.mockToken as any);

     const response = await chai.request(app).post('/login').send(mockUser.userLogin);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('token');
  });
  it('Deve retornar uma mensagem de erro caso o usuário não insira seu e-mail', async () => {
    sinon.stub(userModel, 'findOne').resolves(mockUser.userLoginWithoutEmail as any);
    sinon.stub(jwt, 'sign').returns(mockUser.mockToken as any);

    const response = await chai.request(app).post('/login').send(mockUser.userLoginWithoutEmail);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.deep.equal("All fields must be filled");
    expect(response.body).to.be.an('object');

  });

  it('Deve retornar uma mensagem de erro caso o usuário não insira seu password', async () => {
    sinon.stub(userModel, 'findOne').resolves(mockUser.userLoginWithoutPassword as any);
    sinon.stub(jwt, 'sign').returns(mockUser.mockToken as any);

    const response = await chai.request(app).post('/login').send(mockUser.userLoginWithoutPassword);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("All fields must be filled");
    expect(response.body).to.be.an('object');

  });

  it('Deve retornar uma mensagem de erro caso o usuário insira seu e-mail de forma incorreta', async function() {
    sinon.stub(userModel, 'findOne').resolves(mockUser.user as any);

    const response = await chai.request(app).post('/login').send(mockUser.userLoginEmailWrong);
    expect(response.status).to.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.deep.equal("Invalid email or password");
  });

  it('Deve retornar uma mensagem de erro caso o usuário insira seu e-mail de forma incorreta', async function() {
    sinon.stub(userModel, 'findOne').resolves(mockUser.user as any);

    const response = await chai.request(app).post('/login').send(mockUser.userLoginPasswordWrong);
    expect(response.status).to.equal(401);
    expect(response.body).to.be.an('object');
    
    expect(response.body.message).to.deep.equal("Invalid email or password");
  });

});
