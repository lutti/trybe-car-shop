import { Schema, model, Model, models } from 'mongoose';

abstract class CarODM<T> {
  readonly model: Model<T>;
  private schema: Schema;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model<T>(modelName, this.schema);
  }

  public async create(car: T): Promise<T> {
    return this.model.create(car);
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      return null;
    }
  }

  public async update(id: string, car: Partial<T>) {
    try {
      const updatedCar = await this.model.findByIdAndUpdate({ _id: id }, car, { new: true });
      return updatedCar;
    } catch (error) {
      return null;
    }
  }  
}

export default CarODM;