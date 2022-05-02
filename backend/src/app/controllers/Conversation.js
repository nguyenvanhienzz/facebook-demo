const ConversationModel = require('../model/ConversationModel');
const CreateConversation = async (req, res) => {
    try {
        const post = await new ConversationModel({ members: [req.body.senderId, req.body.receiverId] }).save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
}
const getConversation = async (req, res) => {
    try {
        const conversation = await ConversationModel.find({ members: { $in: [req.params.userId] } });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports = { CreateConversation, getConversation };
