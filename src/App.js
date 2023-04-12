import './css/App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Components/Navbar'
import Transactions from './Components/Transactions'
import Footer from './features/Footer'
import Login from './features/Login'
import PortfolioPage from './features/PortfolioPage'
import SignUpPage from './features/signup'

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

	function handleAuthentication(status) {
		setIsLoggedIn(status);
		if (status) {
			localStorage.setItem("isLoggedIn", "true");
		} else {
			localStorage.removeItem("isLoggedIn");
		}
	}
	function handleLogout(status) {
		setIsLoggedIn(status);
		localStorage.removeItem("isLoggedIn");
	}

	return (
		<div className="appContainer">
			<Navbar isLoggedIn={isLoggedIn}  onLogout={handleLogout} />
			<Routes>
				<Route path='/' element={<Login onAuthentication={handleAuthentication} />} />
				<Route path="/login" element={<Login onAuthentication={handleAuthentication} />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path='/transactions' element={<Transactions />} />
			</Routes>
			<Footer/>
		</div>
	);
}
export default App;