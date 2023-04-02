import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

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
}

export default CarService;