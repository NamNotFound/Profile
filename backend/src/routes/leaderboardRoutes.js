import { Router } from 'express';import { leaderboard } from '../controllers/index.js';import { protect } from '../middleware/auth.js';
const r=Router();r.get('/',protect,leaderboard);export default r;
