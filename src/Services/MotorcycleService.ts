import { isValidObjectId } from 'mongoose';
import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import CustomAppError from '../errors/CustomAppError';

const MOTO_NOT_FOUND = 'Motorcycle not found';

class MotorcycleService {
  static mapToDomain(moto: IMotorcycle) {
    return new Motorcycle(moto);
  }

  static async create(moto: IMotorcycle) {
    const odm = new MotorcycleODM();
    const motoDomain = this.mapToDomain(await odm.create(moto));
    return motoDomain;
  }

  static async findAll() {
    const odm = new MotorcycleODM();
    const motos = await odm.findAll();
    return motos.map((moto) => this.mapToDomain(moto));
  }

  static async findById(id: string) {
    if (!isValidObjectId(id)) {
      throw new CustomAppError('Invalid mongo id', 422);
    }
    const odm = new MotorcycleODM();
    const moto = await odm.findById(id);
    if (!moto) throw new CustomAppError(MOTO_NOT_FOUND, 404);
    return this.mapToDomain(moto);
  }

  static async updateById(id: string, newMotorcycle: Partial<IMotorcycle>) {
    if (!isValidObjectId(id)) {
      throw new CustomAppError('Invalid mongo id', 422);
    }
    const odm = new MotorcycleODM();
    // const car = await odm.findById(id);
    // if (!car) throw new CustomAppError(MOTO_NOT_FOUND, 404);
    const updatedMotorcycle = await odm.update(id, { ...newMotorcycle });
    if (!updatedMotorcycle) throw new CustomAppError(MOTO_NOT_FOUND, 404);
    return this.mapToDomain(updatedMotorcycle);
  }
}

export default MotorcycleService;