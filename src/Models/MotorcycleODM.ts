import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;

  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.motorcycles || model('motorcycles', this.schema);
  }

  public async create(moto: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...moto });
  }

  public async findById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById(id);
  }

  public async update(id: string, moto: Partial<IMotorcycle>):
  Promise<IMotorcycle | null> {
    return this.model.findByIdAndUpdate(
      { _id: id },
      moto,
      { new: true },
    );
  }

  public async findAll(): Promise<IMotorcycle[]> {
    return this.model.find({});
  }
}

export default MotorcycleODM;
