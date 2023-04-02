import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.cars || model('cars', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }

  public async update(id: string, car: Partial<ICar>):
  Promise<ICar | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      car,
      { new: true },
    );
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find({});
  }
}

export default CarODM;
