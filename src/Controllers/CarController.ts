import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  static async create(req: Request, res: Response, _next: NextFunction) {
    const car = await CarService.create(req.body);
    res.status(201).json(car);
  }
}

export default CarController;
