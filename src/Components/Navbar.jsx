import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import usaaLogo2 from '../images/usaa-logo.png';

const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        updateActiveTab()
    }, [location])

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
                <Link className='navLink' id="/login" to="/login">Login</Link>
                <Link className='navLink' id="/portfolio" to="/portfolio">Portfolio</Link>
                <Link className='navLink' id="/about" to="/about">About</Link>
            </div>

        </div>
    )
}

export default Navbar