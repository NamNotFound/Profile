import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { registerSockets } from './socket/index.js';

dotenv.config();
await connectDB();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_ORIGIN || '*' } });
registerSockets(io);

server.listen(process.env.PORT || 5000, () => console.log('Server running'));
