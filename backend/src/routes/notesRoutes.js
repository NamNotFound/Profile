import { Router } from 'express';import { listNotes, saveNote } from '../controllers/index.js';import { protect } from '../middleware/auth.js';
const r=Router();r.get('/',protect,listNotes);r.post('/',protect,saveNote);r.put('/:id',protect,saveNote);export default r;
