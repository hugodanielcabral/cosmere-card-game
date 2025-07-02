import './loadEnv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cardDefinitionsRoutes from './routes/cardDefinitions.routes';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Socket IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
});
io.on('connection', (socket) => {
  socket.join('room123');
  socket.on('chat message', (object:{ body: string, from:string }, callback) => {
    io.to('room123').emit('chat message', object);
    callback({
      status: 'pong'
    });
  });
});

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

export default server;
