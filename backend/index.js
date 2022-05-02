const express = require('express');
require('dotenv').config();
const app = express();
const db = require("./src/app/config/db");
const cors = require('cors');
const userRouter = require("./src/app/routers/UserRouter");
const PostRouter = require("./src/app/routers/PostRouter");
const ConversationRouter = require("./src/app/routers/ConversationRouter");
const MessagerRouter = require("./src/app/routers/MessagerRouter");
const multer = require('multer');
const path = require('path');
const NotificationRouter = require('./src/app/routers/NotificationRouter')


db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/image", express.static(path.join(__dirname, "src/app/public/img")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/app/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})


const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("uploadfile"), (req, res) => {
    try {
        return res.status(200).json("Upload file thành công");
    } catch (error) {
        console.log(error);
    }
})

app.use(cors())
app.use('/api/user', userRouter);
app.use('/api/post', PostRouter);
app.use('/api/conversation', ConversationRouter);
app.use('/api/messager', MessagerRouter);
app.use('/api/notification', NotificationRouter);

const Post = process.env.POST || 8080;
app.listen(Post, () => console.log(`Chạy server thành công với Post ${Post}`));