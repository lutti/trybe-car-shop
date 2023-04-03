import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  static async create(req: Request, res: Response, _next: NextFunction) {
    const moto = await MotorcycleService.create(req.body);
    res.status(201).json(moto);
  }

  static async findAll(req: Request, res: Response, _next: NextFunction) {
    const motos = await MotorcycleService.findAll();
    res.status(200).json(motos);
  }

  static async findById(req: Request, res: Response, _next: NextFunction) {
    const moto = await MotorcycleService.findById(req.params.id);
    res.status(200).json(moto);
  }

  static async updateById(req: Request, res: Response, _next: NextFunction) {
    const moto = await MotorcycleService.updateById(req.params.id, req.body);
    res.status(200).json(moto);
  }
}

export default MotorcycleController;
