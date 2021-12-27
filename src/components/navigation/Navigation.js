import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './Nav.css';
import logo from '../../assets/donsider-logo.png'
import UserMenu from './UserMenu';
import { logUserOut } from '../../features/auth/authSlice';
import './UserMenu.css'


function Navigation(props) {
    const dispatch = useDispatch()

    const [dropdownShowing, setDropdownShowing] = useState(false)

    const toggleDropdown = () => {
        setDropdownShowing(!dropdownShowing)
    }
    const handleLogout = () => {
        setDropdownShowing(false)
        dispatch(logUserOut())
    }

    const dropdownMenu =
        <div className="dropdown-menu">
            <ul>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>

    return (
        <nav>
            <div>
                <Link to={"/"} className="home-link donsider-logo"><img src={logo} alt="Donsider home button" /></Link>
            </div>
            <div>
                <UserMenu toggleFunction={toggleDropdown}></UserMenu>
            </div>
            {dropdownShowing && dropdownMenu}

        </nav>
    )
}

export default Navigation