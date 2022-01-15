import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import jwt from 'jsonwebtoken'
import ContactForm from './ContactForm'
import ContactsList from './ContactsList'
import Filter from './Filter'

function ContactsPage() {
	const [filter, setFilter] = useState('')

	const navigate = useNavigate()
	const contacts = useSelector((state) => state)

	useEffect(() => {
		const token = localStorage.getItem('token')
		const user = jwt.decode(token)
		if (!user || !token) {
			localStorage.removeItem('token')
			navigate('/login')
		}
	}, [])

	const logoutHandler = (e) => {
		localStorage.removeItem('token')
		navigate('/login')
	}

	const callsHistoryHandler = () => {
		navigate('/calls')
	}
	return (
		<div>
			<ContactForm contacts={contacts} />
			<Filter
				filter={filter}
				filterHandler={(e) => setFilter(e.target.value)}
			/>
			<ContactsList contacts={contacts} filter={filter} />
			<button onClick={logoutHandler}>Logout</button>
			<button onClick={callsHistoryHandler}>Calls History</button>
		</div>
	)
}

export default ContactsPage
