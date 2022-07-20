const { default: mongoose } = require("mongoose");

const schemaJob = new mongoose.Schema({ 
    title: 'string', 
    link: 'string',
    ubicacion: 'string',
    fecha: 'string'
})

module.exports = schemaJob