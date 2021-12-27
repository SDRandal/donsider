import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';

function Signup(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(registerUser(username, password))
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }


    if (user) {
        return <Redirect to="/plans" />;

    } else {
        return (
            <div className="page-container">
                <div className='form-container'>
                    <h1 className='small-margin-bottom flex-center'>Signup</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='input-div'>
                            <label className='input-label' htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-text-input"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}></input>
                        </div>

                        <div className='input-div'>
                            <label className='input-label' htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-text-input xsmall-margin-bottom"
                                name="password"
                                value={password}
                                onChange={onChangePassword}></input>

                        </div>
                        <div className='input-div'>
                            <button className="button button-highlight mid full-width">Sign up</button>
                            <p className='signup-login-alternate-text'>Already have an account? <Link className='signup-login-alternate-link' to={'/login'} >Sign in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Signup