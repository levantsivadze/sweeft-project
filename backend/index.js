require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Call = require('./models/call.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const app = express()

app.use(cors())
app.use(express.json())

const url = process.env.MONGODB_URI
mongoose.connect(url)

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
		console.log(err)
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
		console.log(error)
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
