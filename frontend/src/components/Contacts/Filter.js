import React from 'react'
import classes from './Filter.module.css'

function Filter(props) {
	return (
		<form className={classes['form-group']}>
			<input
				type='text'
				placeholder='Search...'
				value={props.filter}
				onChange={props.filterHandler}
			/>
		</form>
	)
}

export default Filter
