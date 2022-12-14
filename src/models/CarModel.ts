import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';

export interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: Boolean,
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
}, { versionKey: false });

export const carModel = createModel<CarDocument>('Car', carSchema);

class CarModel extends GenericModel<Car> {
  constructor(model = carModel) {
    super(model);
  }
}

export default CarModel;