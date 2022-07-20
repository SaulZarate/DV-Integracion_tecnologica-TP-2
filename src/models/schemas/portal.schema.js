const { default: mongoose } = require("mongoose");
const schemaJob = require("./job.schema");

const schemaPortal = mongoose.Schema({
    "portal": String,
    "total": Number,
    "empleos": [schemaJob]
})

module.exports = schemaPortal