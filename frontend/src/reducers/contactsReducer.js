import contactsData from '../contacts'

const initState = [...contactsData]

const addContact = (state = initState, action) => {
	return [
		...state,
		{
			id: Math.floor(Math.random() * 1000),
			name: action.payload.name,
			phoneNumber: action.payload.phoneNumber
		}
	]
}

const deleteContactById = (state = initState, id) => {
	const updatedContacts = state.filter((contact) => contact.id !== id)
	return updatedContacts
}

const contactsReducer = (state = initState, action) => {
	let contacts = state
	switch (action.type) {
		case 'ADD': {
			contacts = addContact(state, action)
			return contacts
		}
		case 'DELETE':
			contacts = deleteContactById(state, action.id)
			return contacts
		case 'EDIT':
			break
		default:
			return state
	}
}

export default contactsReducer
