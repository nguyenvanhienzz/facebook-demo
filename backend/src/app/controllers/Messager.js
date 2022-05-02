const MessagerSchema = require('../model/MessangerModel');

const postMessager = async (req, res) => {
    try {
        const mess = await new MessagerSchema(req.body).save();
        res.status(200).json(mess);
    } catch (error) {
        res.status(400).json(error);

    }
}
const getMessager = async (req, res) => {
    try {
        const mess = await MessagerSchema.find({ coversationId: req.params.coversationId });
        res.status(200).json(mess);
    } catch (error) {
        res.status(400).json(error);

    }
}
module.exports = { postMessager, getMessager };