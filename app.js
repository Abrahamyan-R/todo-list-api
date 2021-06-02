import express from 'express';
import cors from 'cors';

import UserRouter from './routers/user.js';
import TaskRouter from './routers/task.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/user', UserRouter);
app.use('/task', TaskRouter);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Requested resource does not exist' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something broke!' });
});

export default app;