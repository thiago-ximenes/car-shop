import Service, { ServiceError } from './GenericService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

export const carModel = new CarModel();

class CarService extends Service<Car> {
  constructor(model = carModel) {
    super(model);
  }

  create = async (data: Car): Promise<Car | null | ServiceError> => {
    const parsed = CarSchema.safeParse(data);

    if (!parsed.success) {
      return {
        error: parsed.error,
      };
    }
    return this.model.create(data);
  };

  read = async (): Promise<Car[]> => this.model.read();
}

export default CarService;