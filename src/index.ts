import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello World 2'));

app.listen(3333);
console.log('Servidor funcionando');
