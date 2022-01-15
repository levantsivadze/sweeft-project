import React from 'react'
import {useNavigate} from 'react-router-dom'
import CallsList from './CallsList'

function CallsPage() {
	const navigate = useNavigate()

  
	const backButtonHandler = () => {
		navigate('/contacts')
	}
	return (
		<div>
			<CallsList />
			<button onClick={backButtonHandler}>Back</button>
		</div>
	)
}

export default CallsPage
