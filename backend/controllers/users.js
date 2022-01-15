const usersRouter = require('express').Router()
const User = require('../models/user.model')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//register user
usersRouter.post('/api/register', async (req, res) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			password: hash
		})
		res.json({status: 'ok'})
	} catch (err) {
		logger.error(err)
		res.json({status: 'error', error: err.message})
	}
})

//create token for logged in user
usersRouter.post('/api/login', async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username
		})
		if (user) {
			const token = jwt.sign({username: user.username}, 'secret111')
			const validPass = await bcrypt.compare(req.body.password, user.password)
			if (validPass) {
				return res.json({status: 'ok', user: token})
			}
		} else {
			return res.json({status: 'error', user: false})
		}
	} catch (err) {
		logger.error(err)
		return res.json({status: 'error', error: err.message})
	}
})

// get username by checking token validity
usersRouter.get('/api/users', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret111')
		const username = decoded.username
		const user = await User.findOne({username: username})

		return res.json({status: 'ok', user: user.username})
	} catch (error) {
		logger.error(err)
		res.json({status: 'error', error: 'invalid token'})
	}
})

module.exports = usersRouter
