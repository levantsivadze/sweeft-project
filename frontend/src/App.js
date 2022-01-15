import {Routes, Route} from 'react-router-dom'
import LoginForm from './components/Login/LoginForm'
import RegisterForm from './components/Registration/RegisterForm'
import ContactsPage from './components/Contacts/ContactsPage'
import CallsPage from './components/Calls/CallsPage'

function App() {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<RegisterForm />} />
				<Route path='login' element={<LoginForm />} />
				<Route path='contacts' element={<ContactsPage />} />
				<Route path='calls' element={<CallsPage />} />
			</Routes>
		</div>
	)
}

export default App
