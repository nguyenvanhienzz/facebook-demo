const router = require('express').Router();
const userController = require('../controllers/UserControllers');

//Register
router.post("/register", userController.Register);
//login
router.post("/login", userController.Login);
//update user
router.put("/:id", userController.UpdateUser);
//delete
router.delete("/:id", userController.deleteUser);
//get
router.get("/", userController.getUser);
// get friends
router.get("/friend/:id", userController.getUserfriends);
//put fllowers
router.put("/:id/follow", userController.putFollow);
//put unfollow
router.put("/:id/unfollow", userController.putUnfollow);

module.exports = router;