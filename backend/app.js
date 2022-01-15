const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('./utils/config')
const logger = require('./utils/logger')

const User = require('./models/user.model')
const Call = require('./models/call.model')

const app = express()

//connecting to MongoDB
mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())

//register user
app.post('/api/register', async (req, res) => {
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
app.post('/api/login', async (req, res) => {
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
app.get('/api/users', async (req, res) => {
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

//make call from signed in user
app.post('/api/calls', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret111')
		const username = decoded.username
		const user = await User.findOne({username: username})

		if (user) {
			await Call.create({
				username,
				name: req.body.name,
				phoneNumber: req.body.phoneNumber,
				callDate: req.body.callDate
			})
			res.json({status: 'ok'})
		} else {
			return res.json({status: 'error', user: false})
		}
	} catch (error) {
		console.log(error)
		res.json({status: 'error', error: error.message})
	}
})

//show all calls
app.get('/api/calls', async (req, res) => {
	try {
		const calls = await Call.find({})
		console.log(calls)
		return res.json({status: 'ok', calls: calls})
	} catch (error) {
		logger.error(error)
		return res.json({status: 'error', error: err.message})
	}
})

//delete a call
app.delete('/api/calls/:id', async (req, res, next) => {
	const _id = req.params.id
	console.log(_id)
	try {
		const call = await Call.findByIdAndDelete({_id: _id})

		if (!call) return res.sendStatus(404)
		return res.sendStatus(200)
	} catch (err) {
		console.log(err)
		return res.statusCode(400)
	}
})

module.exports = app
