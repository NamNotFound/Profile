import { Router } from 'express';import { createRoadmapNode, getRoadmap, markRoadmapComplete } from '../controllers/index.js';import { adminOnly, protect } from '../middleware/auth.js';
const r=Router();r.get('/',protect,getRoadmap);r.post('/',protect,adminOnly,createRoadmapNode);r.post('/:id/complete',protect,markRoadmapComplete);export default r;
