import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  static async create(req: Request, res: Response, _next: NextFunction) {
    const car = await CarService.create(req.body);
    res.status(201).json(car);
  }

  static async findAll(req: Request, res: Response, _next: NextFunction) {
    const cars = await CarService.findAll();
    res.status(200).json(cars);
  }

  static async findById(req: Request, res: Response, _next: NextFunction) {
    const car = await CarService.findById(req.params.id);
    res.status(200).json(car);
  }

  static async updateById(req: Request, res: Response, _next: NextFunction) {
    const car = await CarService.updateById(req.params.id, req.body);
    res.status(200).json(car);
  }
}

export default CarController;
