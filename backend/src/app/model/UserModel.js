const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, min: 3, max: 20, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, required: true },
    profilePicture: { type: String, default: "" },
    coverPocture: { type: String, default: "" },
    follwers: { type: Array, default: [] },
    follwings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    school: { type: String, default: "" },
    from: { type: String, default: "" },
    liveat: { type: String, default: "" },
    desc: { type: String, max: 100 }
},
    { timestamps: true },
)
module.exports = mongoose.model("Users", UserSchema);