import { Router } from 'express';import { createRoom, joinRoom, listRooms } from '../controllers/index.js';import { protect } from '../middleware/auth.js';
const r=Router();r.post('/',protect,createRoom);r.get('/',protect,listRooms);r.post('/join/:code',protect,joinRoom);export default r;
