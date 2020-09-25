const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	entries: {
        type : Array
        // default : []
    },
    comments : [{type:mongoose.Schema.Types.ObjectId, ref : 'Comment'}],
	supplierId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
	},
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
    }
})

const Entry = module.exports = mongoose.model('Entry', entrySchema)
