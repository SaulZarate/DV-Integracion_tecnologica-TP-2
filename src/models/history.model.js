const { default: mongoose } = require("mongoose")
const schemaHistory = require("./schemas/history.schema")

const History = mongoose.model('history', schemaHistory)

module.exports = History