import express from 'express';
import GameController from '../controllers/gameController.js';
import UserController from '../controllers/userController.js';
const router = express.Router();

router.get('/profiles', UserController.getAllDoc);
router.get('/games', GameController.getAllDoc);
router.get('/game/:gameId', GameController.getSpecificGame);

export default router
