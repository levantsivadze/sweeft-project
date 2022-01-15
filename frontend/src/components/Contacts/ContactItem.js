import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteContact} from '../../actions/contactsActions'
import classes from './ContactItem.module.css'

function ContactItem({contact}) {
	const dispatch = useDispatch()
	let username = ''

	const getUsername = async () => {
		const res = await fetch('http://localhost:3001/api/users', {
			headers: {
				'x-access-token': localStorage.getItem('token')
			}
		})

		const data = await res.json()
		username = data.name
	}

	const makeCall = async (callDate) => {
		const response = await fetch('http://localhost:3001/api/calls', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
			},
			body: JSON.stringify({
				username: username,
				name: contact.name,
				phoneNumber: contact.phoneNumber,
				callDate: callDate
			})
		})

		const data = await response.json()
		console.log(data)
		if (data.status === 'ok') {
			alert('Call was made!')
		}
	}

	const callHandler = (e) => {
		var today = new Date()
		var callDate =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate() +
			'/' +
			today.getHours() +
			':' +
			today.getMinutes()
		getUsername()
		makeCall(callDate)
	}

	const deleteHandler = () => {
		dispatch(deleteContact(contact.id))
	}

	return (
		<li key={contact.id} className={classes.contact}>
			<p>{contact.name}</p>
			<p>{contact.phoneNumber}</p>
			<div className={classes.buttons}>
				<button onClick={deleteHandler}>Delete</button>
				<button>Edit</button>

				<button onClick={callHandler}>Call</button>
			</div>
		</li>
	)
}

export default ContactItem
