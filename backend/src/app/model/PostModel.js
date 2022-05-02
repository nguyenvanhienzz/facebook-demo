const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    desc: { type: String, max: 500 },
    img: { type: String, default: "" },
    video: { type: String, default: "" },
    likes: { type: Array, default: [] },
    hahas: { type: Array, default: [] },
    buon: { type: Array, default: [] },
    tim: { type: Array, default: [] },
    thuong: { type: Array, default: [] }
},
    { timestamps: true }
)
module.exports = mongoose.model("Post", PostSchema);
