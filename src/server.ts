import express from 'express';
import routes from './routes';

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(routes);
app.listen(process.env.APP_PORT);
console.log(`Servidor funcionando na porta: ${process.env.APP_PORT}`);
