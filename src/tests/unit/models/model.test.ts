import * as sinon from 'sinon';
import * as chai from 'chai';
import mongoose from 'mongoose';

import CarModel from '../../../models/CarModel';
import { Car } from '../../../interfaces/CarInterface'
import { readCars, readCarsOne } from '../mocks';

const carModel = new CarModel;

const { expect } = chai;

const createCar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const createCarResult = {
  _id: "4edd40c86762e0fb12000003",
  "__v": 0,
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

describe('', () => {
  it('', async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(createCarResult as Car)

    const result = await carModel.create(createCar)
    expect(result).to.be.equal(createCarResult)
  });

  it('', async () => {
    sinon
      .stub(carModel, 'read')
      .resolves(readCars as Car[]);

    const result = await carModel.read()
    expect(result).to.be.equal(readCars)
  });

  it('', async () => {
    sinon
      .stub(carModel, 'readOne')
      .resolves(readCarsOne as Car);

    const result = await carModel.readOne('4edd40c86762e0fb12000003')
    expect(result).to.be.equal(readCarsOne)
  });
})