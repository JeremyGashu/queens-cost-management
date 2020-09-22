const mongoose = require('mongoose')
const types = require('../utils/types')

const authSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    authType : {
        type : String,
        default : types.USER
    }
})

const Auth = module.exports = mongoose.model('Auth', authSchema)