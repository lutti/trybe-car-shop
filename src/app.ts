import 'express-async-errors';
import express from 'express';
import CarRouter from './routers/CarRouter';
import MotorcycleRouter from './routers/MotorcycleRouter';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

const app = express();
app.use(express.json());

app.use('/cars', CarRouter);
app.use('/motorcycles', MotorcycleRouter);

app.use(ErrorMiddleware);
export default app;
