const mongoose = require('mongoose')



const entrySchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	entries: {
        type : [Object]
        // default : []
    },
    comments : [{type:mongoose.Schema.Types.ObjectId, ref : 'Comment'}],
	supplier : {type : String, default : 'Other'},
	addedOn: {
		type: mongoose.Schema.Types.Date,
		default: Date.now(),
    },
    userChecked : {
        type:Boolean,
        default : false
    },
    marketingManagerChecked : {
        type : Boolean,
        default : false
    },
    generalManagerChecked : {
        type : Boolean,
        default : false
    },
    imageName : {
        type : String,
        default : 'queens_image.jpg'
    }
})

const Entry = module.exports = mongoose.model('Entry', entrySchema)
