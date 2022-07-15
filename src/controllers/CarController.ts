import { Response } from 'express';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';
import Controller,
{ RequestWithBody, ResponseError } from './GenericController';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const car = await this.service.create(body);

      if (!car) return res.status(400).json({ error: this.errors.internal });
      if ('error' in car) {
        return res.status(400).json(car);
      }

      return res.status(201).json(car);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  read = async (
    req: RequestWithBody<Car>,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    const cars = await this.service.read();

    if (!cars) return res.status(400).json({ error: this.errors.internal });
    if ('error' in cars) {
      return res.status(400).json(cars);
    }

    return res.status(200).json(cars);
  };
}

export default CarController;
