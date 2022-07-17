import * as sinon from 'sinon';
import * as chai from 'chai';
import mongoose from 'mongoose';

import CarModel, { CarDocument, carModel as mongoModel } from '../../../models/CarModel';
import { Car } from '../../../interfaces/CarInterface'
import { readCars, readCarsOne } from '../mocks';

const carModel = new CarModel();

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

describe('Model', () => {
  it('create', async () => {
    sinon
      .stub(mongoModel, 'create')
      .resolves(createCarResult as Car)

    const result = await carModel.create(createCar)
    expect(result).to.be.equal(createCarResult)
    sinon.restore()
  });

  it('read', async () => {
    sinon
      .stub(mongoModel, 'find')
      .resolves(readCars as (CarDocument & { _id: any; })[]);

    const result = await carModel.read()
    expect(result).to.be.equal(readCars)
    sinon.restore()
  });

  it('readOne', async () => {
    sinon
      .stub(mongoModel, 'findOne')
      .resolves(readCarsOne as (CarDocument & { _id: any; }));

    const result = await carModel.readOne('4edd40c86762e0fb12000003')
    expect(result).to.be.equal(readCarsOne)
  });

  it('update', async () => {
    sinon
      .stub(mongoModel, 'findByIdAndUpdate')
      .resolves(createCar as (CarDocument & { _id: any; }) | null | undefined);

    const result = await carModel.update('4edd40c86762e0fb12000003', createCar)
    expect(result).to.be.equal(createCar)
    sinon.restore()
  });

  it('delete', async () => {
    sinon
      .stub(mongoModel, 'findOneAndDelete')
      .resolves(createCarResult as CarDocument & { _id: any; });

    const result = await carModel.delete('4edd40c86762e0fb12000003')
    expect(result).to.be.equal(createCarResult)
    sinon.restore()
  });
})