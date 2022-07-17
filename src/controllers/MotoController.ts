import { Response, Request } from 'express';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotoService from '../services/MotoService';
import Controller,
{ RequestWithBody, ResponseError } from './GenericController';

class MotoController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotoService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const moto = await this.service.create(body);

      if (!moto) return res.status(400).json({ error: this.errors.internal });
      if ('error' in moto) {
        return res.status(400).json(moto);
      }

      return res.status(201).json(moto);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  read = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    const moto = await this.service.read();

    if (!moto) return res.status(400).json({ error: this.errors.internal });
    if ('error' in moto) {
      return res.status(400).json(moto);
    }

    return res.status(200).json(moto);
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: this.errors.requiredId });

    if (id.length !== 24) {
      return res.status(400).json({ error: this.errors.idLength });
    }

    const moto = await this.service.readOne(id);

    if (!moto) return res.status(404).json({ error: this.errors.notFound });
    if ('error' in moto) {
      return res.status(400).json(moto);
    }

    return res.status(200).json(moto);
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<ResponseError | Motorcycle>,
  ): Promise<Response<ResponseError | Motorcycle>> => {
    const { body, params: { id } } = req;

    if (!id) return res.status(400).json({ error: this.errors.requiredId });
    if (Object.keys(body)
      .length === 0
    ) return res.status(400).json({ error: this.errors.badRequest });

    if (id.length !== 24) {
      return res.status(400).json({ error: this.errors.idLength });
    }

    const moto = await this.service.update(id, body);

    if (!moto) return res.status(404).json({ error: this.errors.notFound });
    return res.status(200).json(moto);
  };

  delete = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<ResponseError | Motorcycle>,
  ): Promise<Response<ResponseError | Motorcycle>> => {
    const { params: { id } } = req;

    if (id.length !== 24) {
      return res.status(400).json({ error: this.errors.idLength });
    }

    const moto = await this.service.delete(id);

    if (!moto) return res.status(404).json({ error: this.errors.notFound });
    if ('error' in moto) {
      return res.status(400).json(moto);
    }

    return res.status(204).json(moto);
  };
}

export default MotoController;
