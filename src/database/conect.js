const { default: mongoose } = require("mongoose");
const { username, password, host, options } = require("./config");

const connectDb = async () => {
    return await mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${options}`)
}

module.exports = connectDb 