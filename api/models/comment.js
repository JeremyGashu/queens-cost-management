const mongoose = require('mongoose')
const types = require('../utils/types')

const commentSchema = new mongoose.Schema({
    _id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
    },
    from : {
        type : String,
        default : types.USER
    },
})

const Comment = module.exports = mongoose.model('Comment', commentSchema)