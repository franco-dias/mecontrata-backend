import express from 'express';
import 'dotenv/config';
import { resolve } from 'path';
import http from 'http';
import cors from 'cors';

import './database';
import './mongoose';
import setupWebSocket from './websocket';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    this.server = http.Server(this.server);
    setupWebSocket(this.server);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
