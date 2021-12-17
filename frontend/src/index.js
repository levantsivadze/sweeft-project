import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import contactsReducer from './reducers/contactsReducer'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const contactsStore = createStore(
	contactsReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
	<BrowserRouter>
		<Provider store={contactsStore}>
			<App />
		</Provider>
	</BrowserRouter>,

	document.getElementById('root')
)
