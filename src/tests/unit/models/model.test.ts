import * as sinon from 'sinon';
import * as chai from 'chai';
import mongoose from 'mongoose';

import CarModel from '../../../models/CarModel';
import { Car } from '../../../interfaces/CarInterface'

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
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

describe('', () => {
  it('', () => {
    sinon
      .stub(carModel, 'create')
      .resolves({
        _id: "4edd40c86762e0fb12000003",
        model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 2,
        doorsQty: 2
      } as Car)
    
    const result = carModel.create(createCar)
    expect(result).to.be.equal(createCarResult)
  });
})