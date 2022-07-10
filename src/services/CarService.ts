import Service, { ServiceError } from './GenericService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
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
}

export default CarService;