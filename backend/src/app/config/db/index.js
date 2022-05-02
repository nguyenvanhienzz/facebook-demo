const mongoose = require('mongoose');

const connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        await mongoose.connect(process.env.URL, connectionParams);
        console.log('Ket noi thanh cong');
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connect };