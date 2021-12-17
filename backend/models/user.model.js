const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		username: {type: String, required: true, unique: true},
		password: {type: String, required: true}
	},
	{collection: 'users-data'}
)

const model = mongoose.model('UsersData', User)

module.exports = model
