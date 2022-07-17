import * as sinon from 'sinon';
import * as chai from 'chai';
import mongoose from 'mongoose';

import CarService, { carModel } from '../../../services/CarService';
import { Car } from '../../../interfaces/CarInterface'
import { readCars, readCarsOne } from '../mocks';
import CarModel from '../../../models/CarModel';

const carService = new CarService();

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

describe('Service', () => {
  it('create', async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(createCarResult as Car)

    const result = await carService.create(createCar)
    expect(result).to.be.equal(createCarResult)
    sinon.restore()
  });
  
  it('read', async () => {
    sinon
      .stub(carModel, 'read')
      .resolves(readCars as Car[])

    const result = await carService.read()
    expect(result).to.be.equal(readCars)
    sinon.restore()
  });

  it('readOne', async () => {
    sinon
      .stub(carModel, 'readOne')
      .resolves(readCarsOne as Car)

    const result = await carService.readOne('4edd40c86762e0fb12000003')
    expect(result).to.be.equal(readCarsOne)
    sinon.restore()
  });
  
  it('delete', async () => {
    sinon
      .stub(carModel, 'delete')
      .resolves(readCarsOne as Car)

    const result = await carService.delete('4edd40c86762e0fb12000003')
    expect(result).to.be.equal(readCarsOne)
    sinon.restore()
  });

  it('update', async () => {
    sinon
      .stub(carModel, 'update')
      .resolves(readCarsOne as Car)

    const result = await carService.update('4edd40c86762e0fb12000003', readCarsOne)
    expect(result).to.be.equal(readCarsOne)
    sinon.restore()
  });
})