import { Router } from 'express';
import auth from "./middleware/auth";
import HelloController from './controllers/HelloController';
import UsersController from './controllers/UsersController';
import RepositoriesController from './controllers/RepositoriesController';
import SessionsController from './controllers/SessionsController';

const routes = new Router();

//controller publico
routes.post('/sessions', SessionsController.create);
routes.get('/hello', HelloController.index);
//middlware 'guardião' //
routes.use(auth);
//controllers privados

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

routes.get('/users/:user_id/repositories' , RepositoriesController.index);
routes.post('/users/:user_id/repositories' , RepositoriesController.create);
routes.delete('/users/:user_id/repositories/user_id' , RepositoriesController.destroy);

export default routes;
