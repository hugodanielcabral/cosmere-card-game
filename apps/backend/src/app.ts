import './loadEnv';
import express from 'express';
import cors from 'cors';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

export default app;