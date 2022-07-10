import GenericRouter from './routers/Router';
import App from './app';
import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';

const server = new App();
const carController = new CarController();
const router = new GenericRouter<Car>();

router.addRoute(carController);

server.addRouter(router.router);

export default server;
