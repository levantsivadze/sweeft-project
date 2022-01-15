import React from 'react'
import useInput from '../../hooks/use-input'
import Input from '../UI/Input'
import classes from './RegisterForm.module.css'

import {useNavigate} from 'react-router-dom'

function RegisterForm() {
	const {
		value: username,
		isValid: usernameIsValid,
		error: usernameHasError,
		reset: resetUsername,
		inputChangeHandler: usernameChangeHandler,
		inputBlurHandler: usernameBlurHandler
	} = useInput((input) => input.trim() !== '')

	const {
		value: password,
		isValid: passwordIsValid,
		error: passwordHasError,
		reset: resetPassword,
		inputChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler
	} = useInput((input) => input.trim().length >= 6)

	const {
		value: confirmPassword,
		isValid: confirmPasswordIsValid,
		error: confirmPasswordHasError,
		reset: resetConfirmPassword,
		inputChangeHandler: confirmPasswordChangeHandler,
		inputBlurHandler: confirmPasswordBlurHandler
	} = useInput((input) => input === password)

	const navigate = useNavigate()

	let formIsValid = false
	if (usernameIsValid && passwordIsValid && confirmPasswordIsValid) {
		formIsValid = true
	}

	const fetchHttp = async () => {
		const response = await fetch('http://localhost:3001/api/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username,
				password
			})
		})

		const data = await response.json()
		console.log(data)
		if (data.status === 'ok') {
			navigate('/login')
		} else {
			alert('Can not connect to server!')
			return
		}
	}

	const formSubmitHandler = (e) => {
		e.preventDefault()

		usernameBlurHandler(true)

		if (!usernameIsValid && !passwordIsValid && !confirmPasswordIsValid) {
			return
		}

		fetchHttp()

		resetUsername()
		resetPassword()
		resetConfirmPassword()
	}

	const usernameClasses = usernameHasError
		? `${classes['form-control']} invalid`
		: `${classes['form-control']}`

	const passwordClasses = passwordHasError
		? `${classes['form-control']} invalid`
		: `${classes['form-control']}`

	const confirmPasswordClasses = confirmPasswordHasError
		? `${classes['form-control']} invalid`
		: `${classes['form-control']}`

	return (
		<React.Fragment>
			<h1>Registration</h1>
			<form onSubmit={formSubmitHandler}>
				<div className={classes['control-group']}>
					<div className={usernameClasses}>
						<label htmlFor='username'>Username: </label>
						<Input
							type='text'
							id='username'
							value={username}
							onBlur={usernameBlurHandler}
							onChange={usernameChangeHandler}
						/>
						{usernameHasError && (
							<p className={classes['error-text']}>
								Please enter a valid username
							</p>
						)}
					</div>
					<div className={passwordClasses}>
						<label htmlFor='password'>Password: </label>
						<Input
							type='password'
							id='password'
							value={password}
							onBlur={passwordBlurHandler}
							onChange={passwordChangeHandler}
						/>
						{passwordHasError && (
							<p className={classes['error-text']}>
								Password should be at least 6 characters long
							</p>
						)}
					</div>
					<div className={confirmPasswordClasses}>
						<label htmlFor='confirmPassword'> Confirm Password: </label>
						<Input
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onBlur={confirmPasswordBlurHandler}
							onChange={confirmPasswordChangeHandler}
						/>
						{confirmPasswordHasError && (
							<p className={classes['error-text']}>Passwords do not match</p>
						)}
					</div>
				</div>
				<div className={classes['form-actions']}>
					<button type='submit' disabled={!formIsValid}>
						Submit
					</button>
				</div>
			</form>
		</React.Fragment>
	)
}
export default RegisterForm
