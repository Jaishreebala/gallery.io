import React, { useRef, useState } from 'react'
import Error from '../components/Error';
import { Link, Redirect } from 'react-router-dom'
import logoNoBg from '../images/home-logo.svg';

function Register({ isLoggedIn, setIsLoggedIn }) {
    const [errors, setErrors] = useState("");
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputFirstName = useRef();
    const inputLastName = useRef();
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    firstName: inputFirstName.current.value,
                    lastName: inputLastName.current.value,
                    email: inputEmail.current.value,
                    password: inputPassword.current.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();
            if (data.success) {
                setErrors("");
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
                setErrors(data.error);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="login">
            {isLoggedIn ? <Redirect to="/feed" /> : ""}
            <img src={logoNoBg} alt="Main Logo" />
            <form className="login-form">
                <h1>Create Your Gallery.io Account</h1>
                <Error error={errors} />
                <div className="searchInput">
                    <input ref={inputFirstName} type="text" name="firstName" required />
                    <label className="label-name"> <span className="content-name">
                        First Name
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputLastName} type="text" name="lastName" required />
                    <label className="label-name"> <span className="content-name">
                        Last Name
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputEmail} type="text" name="email" required />
                    <label className="label-name"> <span className="content-name">
                        Email
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputPassword} type="password" name="password" required />
                    <label className="label-name"> <span className="content-name">
                        Password
                    </span>
                    </label>
                </div>
                <button onClick={loginHandler} className="button marginTop">Register</button>
                <div className="links borderTop">Already Have An Accout? <b>
                    <Link to="/login">Log In</Link>
                </b></div>
            </form>
        </div>
    )
}

export default Register
