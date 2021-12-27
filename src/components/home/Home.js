import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';


function Home(props) {
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    if (!user) {
        return (
            <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>

            </div>
        )

    } else {

        return <Redirect to="/login" />;
    }
}
export default Home