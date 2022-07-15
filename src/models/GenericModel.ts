import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  async create(data: T): Promise<T> {
    return this.model.create({ ...data });
  }

  async read(): Promise<T[]> {
    return this.model.find();
  }

  async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  async update(id: string, data: T): Promise<T | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { data });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: id });
  }
}

export default GenericModel;