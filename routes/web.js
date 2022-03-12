import express from 'express';
import UserController from '../controllers/userController.js';
const router = express.Router();

router.get('/profiles', UserController.getAllDoc)

export default router