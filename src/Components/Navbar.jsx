import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
console.log(isLoggedIn)
  useEffect(() => {
    updateActiveTab()
  }, [location, isLoggedIn])

  const updateActiveTab = () => {
    document.querySelectorAll(".navLink").forEach(elem => {
      elem.classList.remove("activeLink")
      elem.id === location.pathname && elem.classList.add("activeLink")
    })
  }

  return (
    <div className='navbarContainer'>
      <div className='logoContainer'>
        <img src="https://whizbizkids.com/wp-content/uploads/2015/04/usaa-logo-white-292x300.png" alt="USAA" className='usaa-logo'/>
      </div>
      <div className='titleContainer'>
        <h2 className="headerTitle">MockStock</h2>
      </div>

      <div className='linksContainer'>
        {isLoggedIn ? (
          <>
            <Link className='navLink' id="/portfolio" to="/portfolio">Portfolio</Link>
            <Link className='navLink' id="/Transactions" to="/Transactions">Transactions</Link>
            <div className="navLink" id="/logout" onClick={() => {
            onLogout();
            localStorage.clear();
            navigate("/"); }}
            style={{ cursor: "pointer" }} > Logout </div>

          </>
        ) : (
          <>
          <Link className='navLink' id="/login" to="/login">Login</Link>
          <Link className='navLink' id="/signup" to="/signup">Signup</Link>
          </>
        )}
      </div>

    </div>
  )
}

export default Navbar;
