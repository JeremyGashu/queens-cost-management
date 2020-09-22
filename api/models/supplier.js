const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    supplierId : {
        type : String,
        require : true
    }
})

const Supplier = module.exports = mongoose.model('Supplier', supplierSchema)