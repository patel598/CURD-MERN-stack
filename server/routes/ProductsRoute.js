import express from 'express';
import multer from 'multer';
import path from 'path';

import { createProducts, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/ProdController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = '../crud/src/assets/product';

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/product', authMiddleWare, upload.single('image'), createProducts);
router.get('/get-product/:userObjectId', authMiddleWare, getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', upload.single('image'), updateProduct);
router.delete('/product/:id/:isActive', deleteProduct);

export default router;
