import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import GenericModel from './GenericModel';

export interface MotoDocument extends Motorcycle, Document { }

const motoSchema = new Schema<MotoDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: Boolean,
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true },
}, { versionKey: false });

export const motoModel = createModel<MotoDocument>('Motorcycle', motoSchema);

class MotoModel extends GenericModel<Motorcycle> {
  constructor(model = motoModel) {
    super(model);
  }
}

export default MotoModel;