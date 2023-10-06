import express, { Application, Request, Response } from 'express';
import { auth_router } from './routes/auth_router';
import { post_router } from './routes/post';

const env = require('dotenv');
const cors = require('cors');

env.config();
const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const routes = [auth_router, post_router];

routes.map((_) => {
  app.use('/api', _);
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ data: `Running on Port ${PORT}` });
});

app.listen(PORT, () => console.log(`running on port ${PORT}`));
