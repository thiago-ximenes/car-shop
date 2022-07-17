import Service, { ServiceError } from './GenericService';
import {
  Motorcycle, MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotoModel from '../models/MotoModel';

export const motoModel = new MotoModel();

class MotoService extends Service<Motorcycle> {
  constructor(model = motoModel) {
    super(model);
  }

  create = async (
    data: Motorcycle,
  ): Promise<Motorcycle | null | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(data);

    if (!parsed.success) {
      return {
        error: parsed.error,
      };
    }
    return this.model.create(data);
  };

  read = async (): Promise<Motorcycle[]> => this.model.read();
}

export default MotoService;