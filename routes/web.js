const express = require ('express');
const GameController = require ('../controllers/gameController.js');
const UserController = require ('../controllers/userController.js');
const ReviewController = require ('../controllers/reviewController.js')
var multer = require("multer")

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './assets/profilePic/');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

 var upload = multer({ storage: storage }).single("demo_image");
const router = express.Router();

router.get('/games', GameController.getAllDoc); //TESTED FINE //USED IN FRONT END
router.get('/game/:gameId', GameController.getSpecificGame); //TESTED FINE //USED IN FRONT END
router.get('/game/search/:searchText', GameController.getGamesByName); //TESTED FINE //USED IN FRONT END
router.post('/game/add', GameController.createGame) //TESTED FINE
router.put('/game/tags/:game_id&:tag', GameController.updateTag) //TESTED FINE
router.put('/game/link/:game_id&:link', GameController.updateLink) //TESTED FINE

router.get('/profiles', UserController.getAllDoc);  //TESTED FINE
router.post('/register', UserController.handleRegister); //TESTED FINE // USED IN FRONT END
router.put('/login/:username&:password', UserController.handleLogin); //TESTED FINE // USED IN FRONT END
router.put('/signout/:username&:password', UserController.handleSignout); //TESTED FINE //USED IN FRONT END
router.get('/profile/get/:userId', UserController.getById); //TESTED FINE //USED IN FRONT END
router.put('/profile/update/:userId&:oldPassword&:username&:password&:email', UserController.updateData); //TESTED FINE //USED IN FRONT END
router.get('/videoconference/profile/:username&:password', UserController.getUserDetails); //TESTED FINE


router.post('/game/post', ReviewController.createReview); //TESTED FINE //USED IN FRONT END
router.delete('/game/:gameId/delete/:userId', ReviewController.deleteReview); //TESTED FINE //USED IN FRONT END
router.get('/game/:gameId/:userId', ReviewController.getUserGameReview); //TESTED FINE //USED IN FRONT END
router.put('/game/:gameId/edit/:userId/:stars&:text', ReviewController.reviseReview); //TESTED FINE //USED IN FRONT END
router.get('/game/reviews/:gameId', ReviewController.getSpecificGameReviews); //TESTED FINE //USED IN FRONT END

router.route("/upload/picture/:userId&:password").post(upload,  UserController.updatePhoto) //TESTED FINE

module.exports = router;

//firebase
//heroku