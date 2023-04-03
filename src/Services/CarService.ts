import { isValidObjectId } from 'mongoose';
import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CustomAppError from '../errors/CustomAppError';

const CAR_NOT_FOUND = 'Car not found';

class CarService {
  static mapToDomain(car: ICar) {
    return new Car(car);
  }

  static async create(car: ICar) {
    const odm = new CarODM();
    const carDomain = this.mapToDomain(await odm.create(car));
    return carDomain;
  }

  static async findAll() {
    const odm = new CarODM();
    const cars = await odm.findAll();
    return cars.map((car) => this.mapToDomain(car));
  }

  static async findById(id: string) {
    if (!isValidObjectId(id)) {
      throw new CustomAppError('Invalid mongo id', 422);
    }
    const odm = new CarODM();
    const cars = await odm.findById(id);
    if (!cars) throw new CustomAppError(CAR_NOT_FOUND, 404);
    return this.mapToDomain(cars);
  }

  static async updateById(id: string, newCar: Partial<ICar>) {
    if (!isValidObjectId(id)) {
      throw new CustomAppError('Invalid mongo id', 422);
    }
    const odm = new CarODM();
    // const car = await odm.findById(id);
    // if (!car) throw new CustomAppError(CAR_NOT_FOUND, 404);
    const updatedCar = await odm.update(id, { ...newCar });
    if (!updatedCar) throw new CustomAppError(CAR_NOT_FOUND, 404);
    return this.mapToDomain(updatedCar);
  }
}

export default CarService;