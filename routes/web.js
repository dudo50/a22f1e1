import express from 'express';
import GameController from '../controllers/gameController.js';
import UserController from '../controllers/userController.js';
import ReviewController from '../controllers/reviewController.js'
const router = express.Router();

router.get('/profiles', UserController.getAllDoc);
router.get('/games', GameController.getAllDoc);
router.get('/game/:gameId', GameController.getSpecificGame);
router.get('/game/search/:searchText&:page&:perPage', GameController.getGamesByName);
router.get('/register/:username&:password&:email', UserController.handleRegister);
router.get('/login/:username&:password', UserController.handleLogin);
router.get('/signout/:username&:password', UserController.handleSignout);
router.get('/games/:gameId/&:userId', ReviewController.getUserGameReview);

export default router
