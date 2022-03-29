import express from 'express';
import GameController from '../controllers/gameController.js';
import UserController from '../controllers/userController.js';
import ReviewController from '../controllers/reviewController.js'

const router = express.Router();

router.get('/games', GameController.getAllDoc);
router.get('/game/:gameId', GameController.getSpecificGame);
router.get('/game/search/:searchText&:page&:perPage', GameController.getGamesByName);
router.get('/game/add/:name&:picture&:developer&:released&:description', GameController.createGame)
router.get('/game/tags/:game_id&:tag', GameController.updateTag)
router.get('/game/link/:game_id&:link', GameController.updateLink)

router.get('/profiles', UserController.getAllDoc);
router.get('/register/:username&:password&:email', UserController.handleRegister);
router.get('/login/:username&:password', UserController.handleLogin);
router.get('/signout/:username&:password', UserController.handleSignout);
router.get('/profile/get/:userId', UserController.getById);
router.get('/profile/update/:userId&:oldPassword&:username&:password&:email&:profilePicture', UserController.updateData);
router.get('/videoconference/profile/:username&:password', UserController.getUserDetails);
router.get('/profile/:userId&:password/:photo', UserController.updatePhoto)

router.get('/game/:gameId/post/:userId&:password/:stars&:text', ReviewController.createReview);
router.get('/game/:gameId/delete/:userId&:password', ReviewController.deleteReview);
router.get('/game/:gameId&:userId', ReviewController.getUserGameReview);
router.get('/game/:gameId/edit/:userId&:password/:stars&:text', ReviewController.reviseReview);


export default router
