const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    notificationText: { type: String },
    makeFriends: { type: Boolean, default: true }

}, { timestamps: true })

module.exports = mongoose.model('notification', notificationSchema);