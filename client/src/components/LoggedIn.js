import React from 'react'
import { Link } from 'react-router-dom';

function LoggedIn({ location, isLoggedIn, setIsLoggedIn }) {
    const logOutHandler = async () => {
        try {
            const response = await fetch("/api/v1/auth/logout")
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(false);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <ul>
            <li className={location.pathname === "/feed" ? "selected" : ""}><Link to="/feed">Feed</Link></li>
            <li className={location.pathname === "/post" ? "selected" : ""}><Link to="/post">Post</Link></li>
            <li className={location.pathname === "/profile" ? "selected" : ""}><Link to="/profile">My Profile</Link></li>
            <li className={location.pathname === "/logout" ? "selected" : ""} onClick={logOutHandler}>Logout</li>
        </ul>
    )
}

export default LoggedIn
