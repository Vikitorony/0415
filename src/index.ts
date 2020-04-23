// const express = require('express'); // JavaScript import
import * as express from 'express';
import { Application, Request, Response } from 'express'; // TypeScript import
import { router } from './app/routers'; // === './app/routers/index'

const app: Application = express();
const port = process.env.API_PORT || 3030;

const rootHandler = (req: Request, res: Response) => {
  console.log(req.params, req.query);
  res.json({ status: 'yuppi ok', id: req.params.id });
};

app.use(express.json());
app.get('/', rootHandler);
app.use(router);

app.listen(port, () => { console.log(`I'm listening on ${port}`) });