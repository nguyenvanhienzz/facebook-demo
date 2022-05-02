const PostModel = require('../model/PostModel');
const UserModel = require('../model/UserModel');

//create post
const createPost = async (req, res) => {
    try {
        const post = await new PostModel(req.body).save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json("lỗi không tạo được bài post");
    }
}
// update post
const updatePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.userId === req.body.userId) {
            const updatepost = await PostModel.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json(updatepost);
        } else {
            res.status(400).json("Bạn chỉ có thể cập nhật bài viết của mình");
        }
    } catch (error) {
        res.status(400).json(error);

    }

}
//delete post
const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        console.log(post)
        if (post.userId === req.body.userId) {
            await PostModel.findOneAndDelete(req.params.id);
            res.status(200).json("Xóa bài Post thành công");
        } else if (post.userId !== req.body.userId) {
            res.status(400).json("Bạn chỉ có thể xóa bài post của mình");
        }
    } catch (error) {
        res.status(400).json("Không tồn tại bài post này")
    }

}
//like a post

const likePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            if (!post.hahas.includes(req.body.userId) &&
                !post.buon.includes(req.body.userId) &&
                !post.tim.includes(req.body.userId) &&
                !post.thuong.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("Liked bài viết thành công");
            } else {
                await post.updateOne({
                    $pull: {
                        hahas: req.body.userId,
                        buon: req.body.userId,
                        tim: req.body.userId,
                        thuong: req.body.userId
                    }
                });
                await post.updateOne({ $push: { likes: req.body.userId } });
            }

        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('Disliked bài viết thành công');
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
//haha
const hahaPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.hahas.includes(req.body.userId)) {
            if (!post.likes.includes(req.body.userId) &&
                !post.buon.includes(req.body.userId) &&
                !post.tim.includes(req.body.userId) &&
                !post.thuong.includes(req.body.userId)) {
                await post.updateOne({ $push: { hahas: req.body.userId } });
                res.status(200).json("Liked bài viết thành công");
            } else {
                await post.updateOne({
                    $pull: {
                        likes: req.body.userId,
                        buon: req.body.userId,
                        tim: req.body.userId,
                        thuong: req.body.userId
                    }
                });
                await post.updateOne({ $push: { hahas: req.body.userId } });
            }
        } else {
            await post.updateOne({ $pull: { hahas: req.body.userId } });
            res.status(200).json('Disliked bài viết thành công');
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
//put a buon
const buonPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.buon.includes(req.body.userId)) {
            if (!post.likes.includes(req.body.userId) &&
                !post.hahas.includes(req.body.userId) &&
                !post.tim.includes(req.body.userId) &&
                !post.thuong.includes(req.body.userId)) {
                await post.updateOne({ $push: { buon: req.body.userId } });
                res.status(200).json("Liked bài viết thành công");
            } else {
                await post.updateOne({
                    $pull: {
                        likes: req.body.userId,
                        hahas: req.body.userId,
                        tim: req.body.userId,
                        thuong: req.body.userId
                    }
                });
                await post.updateOne({ $push: { buon: req.body.userId } });
            }
        } else {
            await post.updateOne({ $pull: { buon: req.body.userId } });
            res.status(200).json('Disliked bài viết thành công');
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
//put a tim
const timPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.tim.includes(req.body.userId)) {
            if (!post.likes.includes(req.body.userId) &&
                !post.buon.includes(req.body.userId) &&
                !post.hahas.includes(req.body.userId) &&
                !post.thuong.includes(req.body.userId)) {
                await post.updateOne({ $push: { tim: req.body.userId } });
                res.status(200).json("Liked bài viết thành công");
            } else {
                await post.updateOne({
                    $pull: {
                        likes: req.body.userId,
                        hahas: req.body.userId,
                        buon: req.body.userId,
                        thuong: req.body.userId
                    }
                });
                await post.updateOne({ $push: { tim: req.body.userId } });
            }
        } else {
            await post.updateOne({ $pull: { tim: req.body.userId } });
            res.status(200).json('Disliked bài viết thành công');
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
//put a thuong
const thuongPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post.thuong.includes(req.body.userId)) {
            if (!post.likes.includes(req.body.userId) &&
                !post.buon.includes(req.body.userId) &&
                !post.hahas.includes(req.body.userId) &&
                !post.tim.includes(req.body.userId)) {
                await post.updateOne({ $push: { thuong: req.body.userId } });
                res.status(200).json("Liked bài viết thành công");
            } else {
                await post.updateOne({
                    $pull: {
                        likes: req.body.userId,
                        hahas: req.body.userId,
                        tim: req.body.userId,
                        buon: req.body.userId
                    }
                });
                await post.updateOne({ $push: { thuong: req.body.userId } });
            }
        } else {
            await post.updateOne({ $pull: { thuong: req.body.userId } });
            res.status(200).json('Disliked bài viết thành công');
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
//get a post
const getPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json(error);

    }
}
//timeline
const timelinePost = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.params.userId);
        const userPosts = await PostModel.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.follwers.map((friendId) => {
                return PostModel.find({ userId: friendId });
            })
        )
        res.json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error);
    }
}
//get user's all posts
const getAll = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username });
        const posts = await PostModel.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}
//
const getAllWatch = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}
//get all images 
const getImages = async (req, res) => {
    try {
        const posts = await PostModel.find({ userId: req.params.userId })
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createPost, updatePost,
    deletePost, likePost, hahaPost, getPost,
    timelinePost, getAll, buonPost, timPost,
    thuongPost, getImages, getAllWatch
};
