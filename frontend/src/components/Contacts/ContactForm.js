import React from 'react'
import useInput from '../../hooks/use-input'
import {useDispatch} from 'react-redux'
import {addContact} from '../../actions/contactsActions'
import classes from './ContactForm.module.css'

function ContactForm({contacts}) {
	const {
		value: name,
		isValid: nameIsValid,
		error: nameHasError,
		reset: resetName,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler
	} = useInput((input) => input.trim() !== '')

	const {
		value: phoneNumber,
		isValid: phoneNumberIsValid,
		error: phoneNumberHasError,
		reset: resetPhoneNumber,
		inputChangeHandler: phoneNumberChangeHandler,
		inputBlurHandler: phoneNumberBlurHandler
	} = useInput((input) => input.match(/^\d{9}$/))

	const dispatch = useDispatch()

	const contactToSave = {
		name: name,
		phoneNumber: parseInt(phoneNumber)
	}

	const contactExists = contacts.find(
		(contact) => contact.phoneNumber === contactToSave.phoneNumber
	)

	const addUserHandler = (e) => {
		e.preventDefault()

		nameBlurHandler(true)
		if (!nameIsValid && !phoneNumberIsValid) {
			return
		}

		if (contactExists) {
			alert('Contact with such phone number already exists')
		} else {
			dispatch(addContact(contactToSave))
		}
		resetName()
		resetPhoneNumber()
	}

	return (
		<form onSubmit={addUserHandler}>
			<div className={classes['control-group']}>
				<div className={classes['form-control']}>
					<label htmlFor=''>Name: </label>
					<input
						type='text'
						id='number'
						value={name}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
					/>
					{nameHasError && (
						<p className={classes['error-text']}>
							Name value should not be empty
						</p>
					)}
				</div>
				<div className={classes['form-control']}>
					<label htmlFor='phoneNumber'>Phone Number: </label>
					<input
						type='text'
						id='phoneNumber'
						value={phoneNumber}
						onChange={phoneNumberChangeHandler}
						onBlur={phoneNumberBlurHandler}
					/>
					{phoneNumberHasError && (
						<p className={classes['error-text']}>
							Phone number should be 9 digits long
						</p>
					)}
				</div>
				<div className={classes['form-actions']}>
					<button type='submit'>Add Contact</button>
				</div>
			</div>
		</form>
	)
}

export default ContactForm
