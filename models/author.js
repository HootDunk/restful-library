const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
// first param in model is basically table name, then author schema is the attributes
module.exports = mongoose.model('Author', authorSchema)//exporting this so now we can use it to create new authors elsewhere in our app