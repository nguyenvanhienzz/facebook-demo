const NotificationModel = require('../model/NotificationModel');

const postNotification = async (req, res) => {
    try {
        const getnoti = await NotificationModel.findOne({ receiverId: req.body.receiverId })
        if (getnoti) {
            return res.status(301).json("Loi");
        }
        const post = await new NotificationModel(req.body).save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
}
const getNotification = async (req, res) => {
    try {
        const noti = await NotificationModel.findOne({ receiverId: req.params.receiverId });
        res.status(200).json(noti);
    } catch (error) {

        res.status(401).json(error);
    }
}
const setNotification = async (req, res) => {
    try {
        const setnoti = await NotificationModel.findOne({ receiverId: req.params.receiverId, makeFriends: true })
        if (setnoti) {
            const noti = await NotificationModel.updateOne({ $set: { makeFriends: req.body.makeFriends, notificationText: req.body.notificationText } });
            res.status(201).json(noti);
        } else {
            const noti = await NotificationModel.updateOne({ $set: { makeFriends: req.body.makeFriends, notificationText: req.body.notificationText } });
            res.status(202).json(noti);
        }
    } catch (error) {
        res.status(401).json(error);
    }
}
module.exports = { postNotification, getNotification, setNotification };