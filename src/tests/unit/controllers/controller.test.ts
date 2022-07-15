import * as sinon from 'sinon';
import * as chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp = require('chai-http')
import { Response, Request } from 'express';

import CarController from '../../../controllers/CarController';
import { Car } from '../../../interfaces/CarInterface'
import { RequestWithBody, ResponseError } from '../../../controllers/GenericController';
import { createCar, createCarResult, readCars } from '../mocks';
import Sinon = require('sinon');


chai.use(chaiHttp)
const carController = new CarController;

const { expect } = chai;

describe('', () => {
  it('', async () => {
    const req = {} as RequestWithBody<Car>
    const res = {} as Response<Car | ResponseError>
    sinon
      .stub(carController.service, 'create')
      .resolves(createCarResult)
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    req.body = createCar as Car

    const result = await carController.create(req, res)
    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
    expect((res.json as sinon.SinonStub).calledWith(createCarResult)).to.be.true
    sinon.restore()
  });

  it('', async () => {
    const req = {} as RequestWithBody<Car>
    const res = {} as Response<Car[] | ResponseError>
    sinon
      .stub(carController.service, 'read')
      .resolves(readCars)
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    req.body = createCar as Car

    const result = await carController.read(req, res)
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
    expect((res.json as sinon.SinonStub).calledWith(readCars)).to.be.true
    sinon.restore()
  });
})
