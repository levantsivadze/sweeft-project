import React from 'react'
import classes from './CallItem.module.css'
import axios from 'axios'

function CallItem({call}) {
	const deleteCall = () => {
		axios
			.delete(`http://localhost:3001/api/calls/${call._id}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					alert('Call was successfully deleted')
					window.location.reload()
				} else Promise.reject()
			})
			.catch((err) => alert(`Something went wrong`))
	}
	const deleteHandler = (e) => {
		deleteCall()
	}
	return (
		<li key={call.id} className={classes.call}>
			<p>{call.username}</p>
			<p>{call.name}</p>
			<p>{call.phoneNumber}</p>
			<p>{call.callDate}</p>
			<div className={classes.buttons}>
				<button onClick={deleteHandler}>Delete</button>
			</div>
		</li>
	)
}

export default CallItem
