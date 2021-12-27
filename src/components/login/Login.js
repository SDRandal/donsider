import React from 'react'
// import validator from "validator";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { logUserIn } from '../../features/auth/authSlice';

function Login(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(logUserIn(username, password))
            .then(() => {
                window.location.reload();
            })

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
                    <h1 className='small-margin-bottom flex-center'>Sign in to your account</h1>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='input-div'>
                            <label className='input-label' htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-text-input"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                            ></input>
                        </div>
                        <div className='input-div'>
                            <label className='input-label' htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-text-input xsmall-margin-bottom"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                            ></input>
                            <p className='forgot-password'>Forgot your password?</p>
                        </div>
                        <div className=' input div '>
                            <button className='button button-highlight mid full-width'>Sign In</button>
                            <p className='signup-login-alternate-text'>Not a user? <Link className='signup-login-alternate-link' to={'/signup'} >Sign up</Link></p>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
export default Login