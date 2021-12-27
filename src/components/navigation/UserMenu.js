import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function UserMenu({toggleFunction}) {

    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)


    

    const profileImage = user ? user.profileImage : null

    const profilePic =
        <div className="profile-picture-container" onClick={toggleFunction}>
            <img className="profile-picture" src={profileImage} alt="Profile" />
        </div>
    const loginLink = user ? profilePic : <Link to={"/login"}>login</Link>
    return (
        <div>
            {loginLink}
        </div>
    )
}

export default UserMenu
