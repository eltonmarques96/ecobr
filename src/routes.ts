import express from 'express';
import knex from './database/connection';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

require('dotenv').config();

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;
