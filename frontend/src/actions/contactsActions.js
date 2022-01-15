export const addContact = (contact) => {
	const action = {
		type: 'ADD',
		payload: contact
	}
	return action
}

export const deleteContact = (id) => {
	const action = {
		type: 'DELETE',
		id
	}
	return action
}

export const editContact = (contact) => {
	const action = {
		type: 'EDIT',
		payload: contact
	}
}
