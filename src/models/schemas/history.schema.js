const { default: mongoose } = require("mongoose");
const schemaPortal = require("./portal.schema");

const schemaHistory = new mongoose.Schema({ 
    keywords: String,
    portales: [schemaPortal]
},{
    timestamps: true,
})

module.exports = schemaHistory