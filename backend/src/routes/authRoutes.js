import { Router } from 'express';import { login, me, register } from '../controllers/index.js';import { protect } from '../middleware/auth.js';
const r=Router();r.post('/register',register);r.post('/login',login);r.get('/me',protect,me);export default r;
