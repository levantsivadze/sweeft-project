import React from 'react'
import {useSelector} from 'react-redux'
import ContactItem from './ContactItem'
import classes from './ContactsList.module.css'

function ContactsList({filter}) {
	const contacts = useSelector((state) => state)

	const filteredContacts = !filter
		? contacts
		: contacts.filter((contact) => {
				const phoneNumberStr = contact.phoneNumber + ''
				return (
					contact.name.toLowerCase().includes(filter.toLowerCase()) ||
					phoneNumberStr.includes(filter)
				)
		  })

	return (
		<div className={classes.contacts}>
			<ul>
				{filteredContacts.length === 0 ? <p>No contacts found</p> : ''}
				{filteredContacts.map((contact) => (
					<ContactItem key={contact.id} contact={contact} />
				))}
			</ul>
		</div>
	)
}

export default ContactsList
