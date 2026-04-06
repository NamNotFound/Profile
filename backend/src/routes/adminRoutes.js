import { Router } from 'express';import { adminStats, adminUsers } from '../controllers/index.js';import { adminOnly, protect } from '../middleware/auth.js';
const r=Router();r.get('/stats',protect,adminOnly,adminStats);r.get('/users',protect,adminOnly,adminUsers);export default r;
