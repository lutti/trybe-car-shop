import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const car = await CarService.create(req.body);
      res.status(201).json(car);  
    } catch (error) {
      next(error); 
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.findAll();
      res.status(200).json(cars); 
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = await CarService.findById(req.params.id);
      res.status(200).json(car); 
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = await CarService.updateById(req.params.id, req.body);
      res.status(200).json(car);  
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;
