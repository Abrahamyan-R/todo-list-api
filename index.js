import http from 'http';
import cluster from 'cluster';
import os from 'os';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app.js';
import { ENVIRONMENT_TYPE } from './constants/constants.js';


dotenv.config();

const {
  PORT = 4673,
  DB_CONNECTION_POOL_SIZE = 10,
  DB_CONNECTION_STRING = 'mongodb://localhost/todo',
  NODE_ENV = 'development',
} = process.env;

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: DB_CONNECTION_POOL_SIZE,
});

const conn = mongoose.connection;

conn.once('open', () => {
  console.info('connection established to database');
});

if (NODE_ENV == ENVIRONMENT_TYPE.PRODUCTION) {
  if (cluster.isPrimary) {
    const concurrencyLevel = os.cpus().length;
  
    for (let i = 0; i < concurrencyLevel ; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.info(`worker with process id ${worker.process.pid} died`);
      console.info(`forking new worker...`);
      cluster.fork();
    });
  }
  else {
    const server = http.createServer(app);
  
    server.on('listening', () => {
      console.info(`server instance listening on port ${PORT} (PID: ${process.pid})`);
    });
  
    server.listen(PORT);
  }
}
else {
  const server = http.createServer(app);
  
  server.on('listening', () => {
    console.info(`server instance listening on port ${PORT} (PID: ${process.pid})`);
  });

  server.listen(PORT);
}