const mongoose = require('mongoose');

const messangerSchema = new mongoose.Schema({
    coversationId: { type: String },
    sender: { type: String },
    text: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('messanger', messangerSchema);