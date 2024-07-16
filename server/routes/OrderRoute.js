import express from 'express';

import { submitOrder } from '../controllers/OrderContorller.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';



const router = express.Router();


router.post('/submit-order', authMiddleWare, submitOrder);

export default router;
