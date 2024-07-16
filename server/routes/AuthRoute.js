import express from 'express';
import { getUserList, loginUser, manageUser, refreshToken, registerSuperAdmin, registerUser } from '../controllers/AuthController.js';
import multer from 'multer';
import path from 'path';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = '../crud/src/assets/user';

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post('/register-super-admin', registerSuperAdmin)
router.post('/register', upload.single('image'), registerUser)
router.post('/login', loginUser)
router.get('/user-list', authMiddleWare, getUserList)
router.post('/user-status', manageUser)
router.post('/refresh-token', refreshToken)

export default router