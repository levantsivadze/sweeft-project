import React from 'react'
import useInput from '../../hooks/use-input'
import Input from '../UI/Input'
import {useNavigate} from 'react-router-dom'
import classes from '../Registration/RegisterForm.module.css'

function LoginForm() {
	const navigate = useNavigate()
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

	let formIsValid = false
	if (usernameIsValid && passwordIsValid) {
		formIsValid = true
	}

	const fetchHttp = async () => {
		const response = await fetch('http://localhost:3001/api/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username,
				password
			})
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login was successful')
			navigate('/contacts')
		} else {
			alert('Please check your username and password')
		}
	}

	const formLoginHandler = (e) => {
		e.preventDefault()

		usernameBlurHandler(true)

		if (!usernameIsValid && !passwordIsValid) {
			return
		}

		fetchHttp()

		resetUsername()
		resetPassword()
	}

	const usernameClasses = usernameHasError
		? `${classes['form-control']} invalid`
		: `${classes['form-control']}`

	const passwordClasses = passwordHasError
		? `${classes['form-control']} invalid`
		: `${classes['form-control']}`

	return (
		<React.Fragment>
			<h1>Login</h1>
			<form onSubmit={formLoginHandler}>
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
				</div>
				<div className={classes['form-actions']}>
					<button type='submit' disabled={!formIsValid}>
						Login
					</button>
				</div>
			</form>
		</React.Fragment>
	)
}

export default LoginForm
