import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import CallItem from './CallItem'
import classes from './CallsList.module.css'
import axios from 'axios'

function CallsList() {
	const [callsList, setCallsList] = useState([])

	const getCalls = () => {
		axios
			.get('http://localhost:3001/api/calls')
			.then((response) => {
				console.log(`Data has been received`)
				return response.data
			})
			.then((data) => {
				console.log(data)
				setCallsList(data.calls)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	useEffect(() => {
		getCalls()
	}, [])

	return (
		<div className={classes.calls}>
			{callsList.length === 0 && <p>loading...</p>}
			<ul>
				{callsList.map((callItem) => (
					<CallItem key={callItem._id} call={callItem} />
				))}
			</ul>
		</div>
	)
}

export default CallsList
