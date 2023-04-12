import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Components/Navbar'
import Transactions from './Components/Transactions'
import Footer from './features/Footer'
import Login from './features/Login'
import PortfolioPage from './features/PortfolioPage'
import SignUpPage from './features/signup'

const App = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);

function handleAuthentication(status) {
    setIsLoggedIn(status);
}
function handleLogout(status) {
    setIsLoggedIn(status);
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