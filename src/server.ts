import GenericRouter from './routers/Router';
import App from './app';
import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import MotoController from './controllers/MotoController';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();
const carController = new CarController();
const motoController = new MotoController();
const carRouter = new GenericRouter<Car>();
const motoRouter = new GenericRouter<Motorcycle>();

carRouter.addRoute(carController);
motoRouter.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRouter.router);

export default server;
