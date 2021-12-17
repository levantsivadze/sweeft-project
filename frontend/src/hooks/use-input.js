import {useState} from 'react'

function useInput(validateInput) {
	const [inputValue, setInputValue] = useState('')
	const [isTouched, setIsTouched] = useState(false)

	const inputIsValid = validateInput(inputValue)
	const hasError = !inputIsValid && isTouched

	const inputChangeHandler = (e) => {
		setInputValue(e.target.value)
	}

	const inputBlurHandler = (e) => {
		setIsTouched(true)
	}

	const reset = () => {
		setInputValue('')
		setIsTouched(false)
	}

	return {
		value: inputValue,
		isValid: inputIsValid,
		error: hasError,
		reset,
		inputChangeHandler,
		inputBlurHandler
	}
}

export default useInput
