const router = require("express").Router();
const PostController = require("../controllers/PostControllers");
const PostModel = require("../model/PostModel");

//create post
router.post("/", PostController.createPost);
//update post
router.put("/:id", PostController.updatePost);
//delete post
router.delete("/:id", PostController.deletePost);
//update like
router.put("/:id/like", PostController.likePost);
//update hahas
router.put("/:id/haha", PostController.hahaPost);
//update buon
router.put("/:id/buon", PostController.buonPost);
//update tim
router.put("/:id/tim", PostController.timPost);
//update haha
router.put("/:id/thuong", PostController.thuongPost);
//get a post
router.get("/:id", PostController.getPost);
//get timeline
router.get("/timeline/:userId", PostController.timelinePost);
//get all
router.get("/profile/:username", PostController.getAll);
//getAll
router.get("/", PostController.getAllWatch);
//get
router.get("/images/:userId", PostController.getImages);

module.exports = router;