import './loadEnv';
import express from 'express';
import cors from 'cors';
import cardDefinitionsRoutes from './routes/cardDefinitions.routes';

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

// ROUTES

app.use('/api', cardDefinitionsRoutes);

export default app;