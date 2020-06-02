import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => response.json({ message: 'COlé rapziado do EDM Salvaodr, tudo bom?' }));

export default routes;
