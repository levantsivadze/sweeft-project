const mongoose = require('mongoose')

const Call = new mongoose.Schema(
	{
		username: {type: String, required: true},
		name: {type: String, required: true},
		phoneNumber: {type: Number, required: true},
		callDate: {type: String, required: true}
	},
	{collection: 'calls-data'}
)

const model = mongoose.model('CallsData', Call)

module.exports = model
