const userModel = require('../model/UserModel');
const bcrypt = require("bcrypt");
const UserModel = require('../model/UserModel');
//register
const Register = async (req, res) => {
    try {
        const users = await userModel.findOne({ email: req.body.email })
        if (users) {
            return res.status(401).json({ message: "Email đã tồn tại!Vui lòng đăng kí bằng email khác." })
        }
        const salt = await bcrypt.genSalt(Number(process.env.PASS));
        const passwords = await bcrypt.hash(req.body.password, salt);
        const user = await new userModel({ ...req.body, password: passwords }).save();
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
}
//login
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await userModel.findOne({ email });
        const pass = await bcrypt.compare(password, users.password);
        if (!users) {
            return res.status(401).json({ message: "Email không đúng vui lòng đăng nhập lại." })
        }
        if (!pass) {
            return res.status(401).json({ message: "Passwork không đúng vui lòng đăng nhập lại." })
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
}
//updater
const UpdateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(Number(process.env.PSS));
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                res.status(500).json(error)
            }
        }
        try {
            const user = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Tài khoản đã được cập nhật");
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(402).json({ message: "Bạn chỉ có thể cập nhật tài khoản của mình" })
    }
}
//delete
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).json('Xoá thành công');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(402).json('Bạn chỉ xóa được tài khoản của mình');
    }
}
//get user
const getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username
    try {
        const user = username
            ? await userModel.findOne({ username: username })
            : await userModel.findById(userId);
        const { password, createdAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(400).json('Không tìn thấy người dùng này');
    }
}
//get friends 
const getUserfriends = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const friends = await Promise.all(
            user.follwings.map(friendid => {
                return UserModel.findById(friendid);
            }))
        res.status(200).json(friends);
    } catch (error) {
        res.status(400).json(error);
    }
}
//follow a user
const putFollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await userModel.findById(req.params.id)
            const currentUser = await userModel.findById(req.body.userId);
            if (!user.follwers.includes(req.body.userId)) {
                await user.updateOne({ $push: { follwers: req.body.userId } })
                await currentUser.updateOne({ $push: { follwings: req.params.id } })
                res.status(201).json("Follow thành công")
            } else {
                res.status(402).json("Bạn đã follow người dùng này")
            }

        } catch (error) {
            res.status(500).json("Người này đã theo dõi bạn ");
        }
    }
    else {
        res.status(401).json("Bạn không thể tự follow mình");
    }
}

const putUnfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await userModel.findById(req.params.id)
            const currentUser = await userModel.findById(req.body.userId);
            if (user.follwers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { follwers: req.body.userId } })
                await currentUser.updateOne({ $pull: { follwings: req.params.id } })
                res.status(201).json("unFollow thành công")
            } else {
                res.status(402).json("Bạn đã unfollow người dùng này")
            }

        } catch (error) {
            res.status(500).json("Người này đã theo dõi bạn ");
        }
    }
    else {
        res.status(401).json("Bạn không thể tự unfollow mình");
    }
}

module.exports = {
    Register, Login, UpdateUser,
    deleteUser, getUser, putFollow,
    putUnfollow, getUserfriends
}