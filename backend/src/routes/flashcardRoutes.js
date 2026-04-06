import { Router } from 'express';import { createDeck, listDecks, reviewCard } from '../controllers/index.js';import { protect } from '../middleware/auth.js';
const r=Router();r.get('/',protect,listDecks);r.post('/',protect,createDeck);r.post('/:deckId/review/:cardId',protect,reviewCard);export default r;
