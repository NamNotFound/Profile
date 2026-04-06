import { Router } from 'express';import { tutor } from '../controllers/index.js';import { protect } from '../middleware/auth.js';
const r=Router();r.post('/tutor',protect,tutor);export default r;
